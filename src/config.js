import dotenv from "dotenv";
dotenv.config();

export const { PORT, GMAIL_USER, GMAIL_PASSWORD, JWT_SECRET_KEY } = process.env;
