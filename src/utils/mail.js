import nodemailer from "nodemailer";
import { GMAIL_USER, GMAIL_PASSWORD } from "../config.js";

const user = await nodemailer.createTestAccount();

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: user.user,
    pass: user.pass,
  },
});

const transporterGmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASSWORD,
  },
});

export const sendMail = async (mail) => {
  const sentMail = await transporterGmail.sendMail(mail);

  console.log(`Message sent:${sentMail.messageId}`);
  console.log(`Preview URL:${nodemailer.getTestMessageUrl(sentMail)}`);

  return sentMail;
};
