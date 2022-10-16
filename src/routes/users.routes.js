import { Router } from "express";
import { getAllUsers, getUserById, getUserByEmail, createUser, updateUser, deleteUser } from "../controllers/users.controller.js";

const router = Router();

router
  .get("/", getAllUsers)
  .get("/:userId", getUserById)
  .get("/:email/mail", getUserByEmail)
  .post("/", createUser)
  .put("/:userId", updateUser)
  .delete("/:userId", deleteUser)

export default router;