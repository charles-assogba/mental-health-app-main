import geminiAiUseCase from "../controller/gemini-ai/geminiAi.controller.js";
import { Router } from "express";
const router = Router();
const { sendChat } = geminiAiUseCase;
router.post("/chat", sendChat);
export default router;
