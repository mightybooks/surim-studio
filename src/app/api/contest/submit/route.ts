import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseServer } from "@/lib/supabase/server";
import { getExtension, MAX_CONTEST_FILE_SIZE, safeOriginalFileName, validateContestFile, validateContestSignature } from "@/lib/fileValidation";
import { consumeRateLimit } from "@/lib/rateLimit";
import { serviceRoleClient } from "@/lib/securityServer";

const resend = new Resend(process.env.RESEND_API_KEY);
const ALLOWED_EXTENSIONS = ["hwp", "hwpx", "pdf", "doc"] as const;

export async function POST(req: Request) {
  const supabase = await supabaseServer();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  if (!user.email_confirmed_at || !user.email) return NextResponse.json({ error: "EMAIL_NOT_VERIFIED" }, { status: 403 });

  const rate = await consumeRateLimit("contest-2026", user.id, 3, 15 * 60);
  if (!rate.configured) return NextResponse.json({ error: "RATE_LIMIT_UNAVAILABLE" }, { status: 503 });
  if (!rate.allowed) return NextResponse.json({ error: "TOO_MANY_REQUESTS" }, { status: 429 });
  if (Number(req.headers.get("content-length") ?? 0) > MAX_CONTEST_FILE_SIZE + 128 * 1024) {
    return NextResponse.json({ error: "PAYLOAD_TOO_LARGE" }, { status: 413 });
  }

  try {
    const formData = await req.formData();
    const workTitle = String(formData.get("workTitle") ?? "").replace(/[\u0000-\u001f\u007f]/g, " ").trim();
    const penName = String(formData.get("penName") ?? "").replace(/[\u0000-\u001f\u007f]/g, " ").trim();
    const file = formData.get("file");
    if (!workTitle || workTitle.length > 100 || !penName || penName.length > 50 || !(file instanceof File)) {
      return NextResponse.json({ error: "INVALID_INPUT" }, { status: 400 });
    }

    const validationError = validateContestFile(file, ALLOWED_EXTENSIONS);
    if (validationError === "FILE_TOO_LARGE") return NextResponse.json({ error: validationError }, { status: 413 });
    if (validationError) return NextResponse.json({ error: validationError }, { status: 400 });

    const extension = getExtension(file.name);
    const safeFileName = safeOriginalFileName(file.name);
    const buffer = Buffer.from(await file.arrayBuffer());
    if (!validateContestSignature(extension, buffer)) {
      return NextResponse.json({ error: "INVALID_FILE_SIGNATURE" }, { status: 400 });
    }

    const mailResult = await resend.emails.send({
      from: "Sulim Studio <no-reply@surimstudio.com>",
      to: ["surimstudio@gmail.com"],
      subject: `[문수림배 문예경연대회 응모] ${workTitle} / ${penName}`,
      text: `작품명: ${workTitle}\n필명: ${penName}\n보낸 사람 이메일: ${user.email}`,
      attachments: [{ filename: safeFileName, content: buffer }],
    });
    if (mailResult.error) return NextResponse.json({ error: "EMAIL_SEND_FAILED" }, { status: 502 });

    const { error: insertError } = await serviceRoleClient().from("contest_submissions").insert({
      user_id: user.id,
      contest_year: 2026,
      work_title: workTitle,
      pen_name: penName,
      status: "submitted",
    });
    if (insertError) {
      console.error("contest submission insert failed", { code: insertError.code });
      return NextResponse.json({ error: "SUBMISSION_SAVE_FAILED" }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "SUBMISSION_FAILED" }, { status: 500 });
  }
}
