import { msgTemplate } from "@/config/msgTemplate.js";
// import { prisma } from "@/config/prismaClient.js";
import { Request, Response } from "express";
import { geminiAiValidation } from "./geminiAi.validation.js";
import { genAI } from "@/config/geminiAi.js";
import { ContentListUnion, PartUnion } from "@google/genai";
import { validateRequestBody } from "@/utils/crud.utils.js";

const geminiAiUseCase = {
    sendChat: async (req: Request, res: Response) => {
        if (!validateRequestBody(req, res, geminiAiValidation)) {
            return;
        }

        const data = req.body;

        const content: ContentListUnion = [];

        data.content.map((item: PartUnion) => content.push(item));

        const response = await genAI.models.generateContent({
            model: "gemini-2.0-flash-001",
            contents: [...content],
        });

        res.json(
            msgTemplate("Percakapan berhasil diambil", {
                response: response.text,
            }),
        );
    },
};

export default geminiAiUseCase;
