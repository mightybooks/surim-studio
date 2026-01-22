// src/lib/mail/sendShippingMail.ts

import * as nodemailer from "nodemailer";

export async function sendShippingMail({
  to,
  productName,
  trackingNumber,
}: {
  to: string;
  productName: string;
  trackingNumber: string;
}) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to,
    subject: `[수림 스튜디오] 배송이 시작되었습니다`,
    html: `
      <p>주문하신 <strong>${productName}</strong> 상품이 발송되었습니다.</p>
      <p>송장번호: <strong>${trackingNumber}</strong></p>
      <p>감사합니다.</p>
    `,
  });
}
