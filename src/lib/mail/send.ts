// src/lib/mail/send.ts

import { Resend } from "resend";
import { AUTH_MAIL } from "./templates/auth";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerifyEmail(
  to: string,
  verifyUrl: string
) {
    const mail = AUTH_MAIL.verify(verifyUrl);

    const { error } = await resend.emails.send({
      from: process.env.MAIL_FROM!,
      to,
      subject: mail.subject,
      text: mail.text,
    });

  if (error) {
    console.error("RESEND ERROR:", error);
    throw new Error(error.message || "EMAIL_SEND_FAILED");
  }
}