var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { msgTemplate } from "../../config/msgTemplate.js";
import { geminiAiValidation } from "./geminiAi.validation.js";
import { genAI } from "../../config/geminiAi.js";
import { validateRequestBody } from "../../utils/crud.utils.js";
const geminiAiUseCase = {
    sendChat: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!validateRequestBody(req, res, geminiAiValidation)) {
            return;
        }
        const data = req.body;
        const content = [];
        data.content.map((item) => content.push(item));
        const response = yield genAI.models.generateContent({
            model: "gemini-2.0-flash-001",
            contents: [...content],
        });
        res.json(msgTemplate("Percakapan berhasil diambil", {
            response: response.text,
        }));
    }),
};
export default geminiAiUseCase;
