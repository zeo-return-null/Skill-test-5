import { sendMail } from "../utils/mail.js";
import { readFromDb, writeToDb } from "../utils/database.js";

export const getAllMails = async () => {
  const db = await readFromDb();

  if (!db.hasOwnProperty("mails")) {
    db.mails = [];
  }

  return db.mails;
};

export const createMail = async (email) => {
  const sentMail = await sendMail(email);
  const db = await readFromDb();

  if (!db.hasOwnProperty("mails")) {
    db.mails = [];
  }

  db.mails = [...db.mails, sentMail];

  await writeToDb(db);
  return sentMail;
};
