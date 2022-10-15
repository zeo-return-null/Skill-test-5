import { Router } from "express";
import { getAllMails, createMail } from "../controllers/mail.controller.js";


const router = Router();

router
  .get("/", getAllMails)
  .post("/", createMail);
  
export default router;
