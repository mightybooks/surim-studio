import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerifyEmail(
  to: string,
  verifyUrl: string
) {
  const { error } = await resend.emails.send({
    from: process.env.MAIL_FROM!,
    to,
    subject: "[Surim Studio] 이메일 인증",
    text: `아래 링크를 클릭하면 연락용 이메일 인증이 완료됩니다.
(30분 내 유효)

${verifyUrl}

본인이 요청하지 않았다면 이 메일을 무시해 주세요.`,
  });

  if (error) {
    console.error("RESEND ERROR:", error);
    throw new Error(error.message || "EMAIL_SEND_FAILED");
  }
}
