import { Router } from "express";
import { login, register } from "../controllers/login.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

const router = Router();

router
  .post("/login", login)
  .post("/register", register)
  .get("/profile", verifyJWT, (req, res) => {
    const user = req.user;
    const { password, ...userWithoutPassword } = user;
    res.status(200).json(userWithoutPassword);
  });

export default router;
