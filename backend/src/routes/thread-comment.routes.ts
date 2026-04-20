import threadCommentUseCase from "@/controller/thread-comment/threadComment.controller.js";
import authenticateToken from "@/middleware/authMiddleware.js";
import { Router } from "express";

const router = Router();

const {
    createThreadComment,
    readThreadComment,
    readThreadCommentById,
    updateThreadComment,
    deleteThreadComment,
} = threadCommentUseCase;

router.post("/", authenticateToken, createThreadComment);
router.get("/", readThreadComment);
router.get("/:id", readThreadCommentById);
router.put("/:id", authenticateToken, updateThreadComment);
router.delete("/:id", authenticateToken, deleteThreadComment);

export default router;
