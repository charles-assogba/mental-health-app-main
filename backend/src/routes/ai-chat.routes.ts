import aiChatUseCase from "@/controller/ai-chat/aiChat.controller.js";
import authenticateToken from "@/middleware/authMiddleware.js";
import { Router } from "express";

const router = Router();

const { createAiChat, readAiChatsByConversation, readAiChatById } =
    aiChatUseCase;

router.post("/conversation/:id", authenticateToken, createAiChat);
router.get("/conversation/:id", authenticateToken, readAiChatsByConversation);
router.get("/chat/:id", authenticateToken, readAiChatById);

export default router;
