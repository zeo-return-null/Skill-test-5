import * as mail from "../models/mail.model.js";

export const getAllMails = async () => {
  const mails = await mail.getAllMails();
  return mails;
};

export const createMail = async (email) => {
  const createMail = await mail.createMail(email);
  return createMail;
};
