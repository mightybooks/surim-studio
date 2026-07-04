import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseServer } from "@/lib/supabase/server";

const BUCKET_NAME = "contest-submissions";
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const SIGNED_URL_EXPIRES_IN = 60 * 60 * 24 * 7;
const ALLOWED_CATEGORIES = ["novel", "poetry", "essay"] as const;
const ALLOWED_EXTENSIONS = ["hwp", "hwpx", "doc", "docx", "pdf", "txt"];
const BLOCKED_ARCHIVE_EXTENSIONS = ["zip", "7z", "rar"];
const CATEGORY_LABELS: Record<(typeof ALLOWED_CATEGORIES)[number], string> = {
  novel: "단편소설",
  poetry: "시",
  essay: "수필",
};

const resend = new Resend(process.env.RESEND_API_KEY);

function sanitizeFileName(fileName: string) {
  const normalized = fileName.normalize("NFKC");
  const extension = normalized.split(".").pop()?.toLowerCase() ?? "";
  const baseName = normalized
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-zA-Z0-9가-힣._-]+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 80);

  return `${baseName || "manuscript"}.${extension}`;
}

function getExtension(fileName: string) {
  return fileName.split(".").pop()?.toLowerCase() ?? "";
}

function getText(formData: FormData, key: string) {
  return formData.get(key)?.toString().trim() ?? "";
}

function isAllowedCategory(value: string): value is (typeof ALLOWED_CATEGORIES)[number] {
  return ALLOWED_CATEGORIES.includes(value as (typeof ALLOWED_CATEGORIES)[number]);
}

function formatFileSize(size: number) {
  return `${(size / 1024 / 1024).toFixed(2)}MB`;
}

function jsonError(error: string, status = 400) {
  return NextResponse.json({ error }, { status });
}

export async function POST(req: Request) {
  const supabase = supabaseServer();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return jsonError("로그인 후 접수할 수 있습니다.", 401);
  }

  if (!user.email) {
    return jsonError("로그인 계정의 이메일을 확인할 수 없습니다.", 400);
  }

  if (!user.email_confirmed_at) {
    return jsonError("이메일 인증을 완료한 뒤 접수할 수 있습니다.", 403);
  }

  const formData = await req.formData();
  const category = getText(formData, "category");
  const penName = getText(formData, "penName");
  const referenceLink = getText(formData, "referenceLink");
  const workTitle = getText(formData, "title");
  const file = formData.get("file");
  const consentOriginal = formData.get("consentOriginal") === "on";
  const consentNoInfringement = formData.get("consentCopyright") === "on";
  const consentPublication = formData.get("consentPublication") === "on";

  if (!isAllowedCategory(category)) {
    return jsonError("응모 부문을 다시 선택해 주세요.");
  }

  if (penName.length < 2 || penName.length > 50) {
    return jsonError("필명 또는 SNS 닉네임은 2~50자로 입력해 주세요.");
  }

  if (referenceLink.length > 300) {
    return jsonError("참고 링크는 300자 이하로 입력해 주세요.");
  }

  if (!workTitle || workTitle.length > 100) {
    return jsonError("대표 작품 제목은 100자 이하로 입력해 주세요.");
  }

  if (!(file instanceof File) || file.size === 0) {
    return jsonError("원고 파일을 선택해 주세요.");
  }

  const extension = getExtension(file.name);

  if (BLOCKED_ARCHIVE_EXTENSIONS.includes(extension)) {
    return jsonError("zip 등의 압축파일은 접수하지 않습니다.");
  }

  if (!ALLOWED_EXTENSIONS.includes(extension)) {
    return jsonError(
      "허용하지 않는 파일 형식입니다. hwp, hwpx, doc, docx, pdf, txt 파일만 접수할 수 있습니다.",
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    return jsonError(
      "파일 용량이 5MB를 초과했습니다. 이미지를 제거하고 원고 본문 중심으로 정리한 뒤 다시 제출해 주세요.",
    );
  }

  if (!consentOriginal || !consentNoInfringement || !consentPublication) {
    return jsonError("필수 확인 사항에 모두 동의해야 접수할 수 있습니다.");
  }

  const submittedAt = new Date();
  const submissionId = crypto.randomUUID();
  const safeFileName = sanitizeFileName(file.name);
  const storagePath = `2027/${user.id}/${submissionId}/${safeFileName}`;
  const adminEmail = process.env.CONTEST_ADMIN_EMAIL || "surimstudio@gmail.com";
  const mailFrom = process.env.MAIL_FROM || "Sulim Studio <no-reply@surimstudio.com>";

  const fileBuffer = Buffer.from(await file.arrayBuffer());
  const { error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(storagePath, fileBuffer, {
      contentType: file.type || "application/octet-stream",
      upsert: false,
    });

  if (uploadError) {
    console.error("contest file upload failed", {
      error: uploadError,
      userId: user.id,
      storagePath,
    });
    return jsonError("원고 파일을 업로드하지 못했습니다. 잠시 후 다시 시도해 주세요.", 500);
  }

  const { data: submission, error: insertError } = await supabase
    .from("contest_submissions")
    .insert({
      id: submissionId,
      contest_year: 2027,
      user_id: user.id,
      user_email: user.email,
      category,
      work_title: workTitle,
      pen_name: penName,
      reference_link: referenceLink || null,
      file_bucket: BUCKET_NAME,
      file_path: storagePath,
      original_file_name: file.name,
      file_size_bytes: file.size,
      file_mime_type: file.type || null,
      consent_original: consentOriginal,
      consent_no_infringement: consentNoInfringement,
      consent_publication: consentPublication,
      status: "submitted",
      submitted_at: submittedAt.toISOString(),
    })
    .select("id")
    .single();

  if (insertError || !submission?.id) {
    console.error("contest submission insert failed", {
      error: insertError,
      userId: user.id,
      storagePath,
      submissionId,
    });
    return jsonError("접수 정보를 저장하지 못했습니다. 관리자에게 문의해 주세요.", 500);
  }

  const { data: signedUrlData, error: signedUrlError } = await supabase.storage
    .from(BUCKET_NAME)
    .createSignedUrl(storagePath, SIGNED_URL_EXPIRES_IN, {
      download: file.name,
    });

  const signedUrl = signedUrlError ? null : signedUrlData?.signedUrl ?? null;

  if (signedUrlError) {
    console.error("contest signed url failed", {
      error: signedUrlError,
      storagePath,
      submissionId,
    });
  }

  const subject = `[제4회 문수림배 접수] ${CATEGORY_LABELS[category]} / ${penName} / ${workTitle}`;
  const mailText = `제4회 문수림배 문예경연대회 접수

[접수 정보]
접수 시각: ${submittedAt.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}
접수 ID: ${submissionId}
로그인 이메일: ${user.email}
필명/SNS 닉네임: ${penName}
참고 링크: ${referenceLink || "-"}
응모 부문: ${CATEGORY_LABELS[category]} (${category})
대표 작품 제목: ${workTitle}
contest_year: 2027

[원고 파일]
원본 파일명: ${file.name}
파일 크기: ${formatFileSize(file.size)} (${file.size} bytes)
파일 MIME 타입: ${file.type || "-"}
Storage bucket: ${BUCKET_NAME}
Storage path: ${storagePath}
다운로드 링크: ${signedUrl || "signed URL 생성 실패. Storage path로 확인해 주세요."}

[확인 사항]
- 본인 창작물 확인: ${consentOriginal ? "예" : "아니오"}
- 권리 침해 시 심사 제외 및 수상 취소 확인: ${consentNoInfringement ? "예" : "아니오"}
- 수상작 수림지 게재 가능 확인: ${consentPublication ? "예" : "아니오"}
`;

  try {
    const mailResult = await resend.emails.send({
      from: mailFrom,
      to: [adminEmail],
      subject,
      text: mailText,
    });

    if (mailResult.error) {
      throw new Error(mailResult.error.message);
    }
  } catch (error) {
    console.error("contest admin mail failed", {
      error,
      submissionId,
      storagePath,
    });
  }

  return NextResponse.json({ success: true, submissionId });
}