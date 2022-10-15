import { Router } from "express";
import { getAllUsers, getUser, createUser, updateUser, deleteUser } from "../controllers/users.controller.js";

const router = Router();

router
  .get("/", getAllUsers)
  .get("/:userId", getUser)
  .post("/", createUser)
  .put("/:userId", updateUser)
  .delete("/:userId", deleteUser)

export default router;