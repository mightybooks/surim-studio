// src/app/api/contest/submit/route.ts
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const ALLOWED_EXTENSIONS = ["hwp", "hwpx", "pdf", "doc"];

export async function POST(req: Request) {
  try {
    const supabase = await supabaseServer();

    // 1. 로그인 사용자 확인
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (!user || authError) {
      return NextResponse.json(
        { error: "인증되지 않은 사용자입니다." },
        { status: 401 }
      );
    }

    // 2. multipart form-data 파싱
    const formData = await req.formData();

    const workTitle = formData.get("workTitle")?.toString().trim();
    const penName = formData.get("penName")?.toString().trim();
    const file = formData.get("file") as File | null;

    if (!workTitle || !penName || !file) {
      return NextResponse.json(
        { error: "필수 항목이 누락되었습니다." },
        { status: 400 }
      );
    }

    // 3. 파일 확장자 검증
    const fileName = file.name;
    const extension = fileName.split(".").pop()?.toLowerCase();

    if (!extension || !ALLOWED_EXTENSIONS.includes(extension)) {
      return NextResponse.json(
        { error: "허용되지 않은 파일 형식입니다." },
        { status: 400 }
      );
    }

    // 4. 메일 전송 (실물 접수)
    const buffer = Buffer.from(await file.arrayBuffer());

    const mailResult = await resend.emails.send({
      from: "Sulim Studio <no-reply@surimstudio.com>",
      to: ["surimstudio@gmail.com"],
      subject: `[문수림배 제3회 문예경연대회 응모] ${workTitle} / ${penName}`,
      text: `
문수림배 제3회 문예경연대회 투고 메일입니다.

작품명: ${workTitle}
필명: ${penName}
보낸 사람 이메일: ${user.email}

※ 본 메일에는 첨부 파일로 원고가 포함되어 있습니다.
`,
      attachments: [
        {
          filename: fileName,
          content: buffer,
        },
      ],
    });

    if (mailResult.error) {
      throw new Error("메일 전송 실패");
    }

    // 5. DB에 영수증 기록
    const { error: insertError } = await supabase
      .from("contest_submissions")
      .insert({
        user_id: user.id,
        contest_year: 2026,
        work_title: workTitle,
        pen_name: penName,
        status: "submitted",
      });

    if (insertError) {
      throw new Error("DB 기록 실패");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "투고 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
