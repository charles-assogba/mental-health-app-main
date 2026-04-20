import threadUseCase from "@/controller/thread/thread.controller.js";
import authenticateToken from "@/middleware/authMiddleware.js";
import { Router } from "express";

const router = Router();

const { createThread, readThread, readThreadById, updateThread, deleteThread } =
    threadUseCase;

router.post("/", authenticateToken, createThread);
router.get("/", readThread);
router.get("/:id", readThreadById);
router.put("/:id", authenticateToken, updateThread);
router.delete("/:id", authenticateToken, deleteThread);

export default router;
