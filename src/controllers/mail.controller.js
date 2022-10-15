import * as mail from "../services/mail.services.js";

export const getAllMails = async (req, res) => {
  const mails = await mail.getAllMails();

  res
    .status(200)
    .json({ mails });
}

export const createMail = async (req, res) => {
  const { from, to, subject, text, html } = req.body;

  if(!from || !to || !subject || !text || !html) {
    return res
      .status(400)
      .send("Fields missing, please fill all before sending");
  };

  const email = {
    from, to, subject, text, html
  };
  
  await mail.createMail(email);
  res
    .status(201)
    .json({ status: "Mail sent successfully", mail: email});
};
