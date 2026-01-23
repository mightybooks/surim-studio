// src/lib/mail/sendShippingMail.ts

import * as nodemailer from "nodemailer";
import { SHIPPING_MAIL } from "./templates/shipping";

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

   const mail = SHIPPING_MAIL.shipped({ productName, trackingNumber });

   await transporter.sendMail({
    from: `"수림 스튜디오" <${process.env.SMTP_USER}>`,
    to,
    subject: mail.subject,
    html: mail.html,
  });
}
