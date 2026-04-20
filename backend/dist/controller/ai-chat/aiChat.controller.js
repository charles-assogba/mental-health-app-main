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
import { prisma } from "../../config/prismaClient.js";
import { aiChatValidation } from "./aiChat.validation.js";
import { validateRequestBody, handleControllerError, parseNumericId, } from "../../utils/crud.utils.js";
import { AiChatRole } from "@prisma/client";
import { findAiConversationAndVerifyOwnership } from "../ai-conversation/aiConversation.controller.js";
const aiChatController = {
    /**
     * @description Create a new Pesan AI within a conversation
     * @route POST /api/ai-conversations/:conversationId/chats
     * @access Private (Requires authenticated user who owns the conversation)
     */
    createAiChat: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const conversationId = parseNumericId(req, res);
        if (conversationId === null) {
            res.status(400).json(msgTemplate("ID Percakapan dibutuhkan di rute parameter (e.g., /ai-conversations/:id/chats)."));
            return;
        }
        const userId = req.user.id;
        const dataToValidate = Object.assign(Object.assign({}, req.body), { ai_conversation_id: conversationId });
        if (!validateRequestBody(req, res, aiChatValidation)) {
            return;
        }
        const ownedConversation = yield findAiConversationAndVerifyOwnership(res, conversationId, userId);
        if (!ownedConversation) {
            return;
        }
        const { body } = dataToValidate;
        const role = req.body.role === AiChatRole.AI ? AiChatRole.AI : AiChatRole.USER;
        try {
            const newAiChat = yield prisma.aiChat.create({
                data: {
                    body: body,
                    role: role,
                    ai_conversation_id: conversationId,
                },
                select: {
                    id: true,
                    role: true,
                    body: true,
                    created_at: true,
                    ai_conversation_id: true,
                },
            });
            res.status(201).json(msgTemplate("Pesan AI berhasil dibuat.", newAiChat));
        }
        catch (error) {
            handleControllerError(res, error, "Gagal membuat Pesan AI.");
        }
    }),
    /**
     * @description Read all Pesan AIs for a specific conversation
     * @route GET /api/ai-conversations/:conversationId/chats
     * @access Private (Requires authenticated user who owns the conversation)
     */
    readAiChatsByConversation: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const conversationId = parseNumericId(req, res);
        if (conversationId === null) {
            return;
        }
        const userId = req.user.id;
        const ownedConversation = yield findAiConversationAndVerifyOwnership(res, conversationId, userId);
        if (!ownedConversation) {
            return;
        }
        try {
            const chats = yield prisma.aiChat.findMany({
                where: {
                    ai_conversation_id: conversationId,
                },
                orderBy: {
                    created_at: "asc",
                },
                select: {
                    id: true,
                    role: true,
                    body: true,
                    created_at: true,
                    ai_conversation_id: true,
                },
            });
            res.json(msgTemplate("Pesan AIs berhasil diambil.", {
                chats: chats,
            }));
        }
        catch (error) {
            handleControllerError(res, error, "Gagal mengambil Pesan AIs.");
        }
    }),
    /**
     * @description Read a single Pesan AI by its ID
     * @route GET /api/ai-chats/:id
     * @access Private (Requires user to own the parent conversation)
     */
    readAiChatById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const chatId = parseNumericId(req, res);
        if (chatId === null)
            return;
        const userId = req.user.id;
        try {
            const chat = yield prisma.aiChat.findUnique({
                where: { id: chatId },
                select: {
                    id: true,
                    role: true,
                    body: true,
                    created_at: true,
                    ai_conversation_id: true,
                },
            });
            if (!chat) {
                res.status(404).json(msgTemplate("Pesan AI tidak ditemukan."));
                return;
            }
            const ownedConversation = yield findAiConversationAndVerifyOwnership(res, chat.ai_conversation_id, userId);
            if (!ownedConversation) {
                return;
            }
            res.json(msgTemplate("Pesan AI berhasil diambil.", chat));
        }
        catch (error) {
            handleControllerError(res, error, "Gagal mengambil Pesan AI.");
        }
    }),
};
export default aiChatController;
