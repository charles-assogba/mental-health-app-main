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
import { aiConversationUpdateValidation, aiConversationValidation, } from "./aiConversation.validation.js";
import { validateRequestBody, handleControllerError, parseNumericId, } from "../../utils/crud.utils.js";
import { Prisma } from "@prisma/client";
const commonAiConversationInclude = Prisma.validator()({
    owner: { select: { id: true, username: true, name: true } },
    ai_chat: {
        orderBy: { created_at: "asc" },
        select: { id: true, role: true, body: true, created_at: true },
    },
    _count: {
        select: { ai_chat: true },
    },
});
export const findAiConversationAndVerifyOwnership = (res, conversationId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const conversation = yield prisma.aiConversation.findFirst({
        where: { id: conversationId, owner_id: userId },
    });
    if (!conversation) {
        res.status(404).json(msgTemplate("Percakapan AI tidak ditemukan atau anda tidak memiliki hak akses."));
        return;
    }
    return conversation;
});
const aiConversationController = {
    /**
     * @description Create a new Percakapan AI
     * @route POST /api/ai-conversations
     */
    createAiConversation: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!validateRequestBody(req, res, aiConversationValidation)) {
            return;
        }
        const userId = req.user.id;
        const data = req.body;
        try {
            const newConversation = yield prisma.aiConversation.create({
                data: Object.assign(Object.assign({}, data), { owner_id: userId }),
                include: commonAiConversationInclude,
            });
            res.status(201).json(msgTemplate("Percakapan AI berhasil dibuat.", newConversation));
        }
        catch (error) {
            handleControllerError(res, error, "Gagal membuat Percakapan AI.");
        }
    }),
    /**
     * @description Read Percakapan AIs owned by the user
     * @route GET /api/ai-conversations
     */
    readAiConversations: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;
        const userId = req.user.id;
        try {
            const conversations = yield prisma.aiConversation.findMany({
                where: {
                    owner_id: userId,
                },
                skip: skip,
                take: limit,
                orderBy: { created_at: "desc" },
                include: { _count: { select: { ai_chat: true } } },
            });
            const totalConversations = yield prisma.aiConversation.count({
                where: { owner_id: userId },
            });
            res.json(msgTemplate("Percakapan AIs berhasil diambil.", {
                conversations: conversations,
                pagination: {
                    currentPage: page,
                    totalPages: Math.ceil(totalConversations / limit),
                    totalConversations,
                    limit,
                },
            }));
            return;
        }
        catch (error) {
            handleControllerError(res, error, "Gagal mengambil Percakapan AIs.");
        }
    }),
    /**
     * @description Read a single Percakapan AI by its ID, ensuring ownership.
     * @route GET /api/ai-conversations/:id
     */
    readAiConversationById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const conversationId = parseNumericId(req, res);
        console.log(conversationId);
        if (conversationId === null)
            return;
        const userId = req.user.id;
        try {
            const conversation = yield findAiConversationAndVerifyOwnership(res, conversationId, userId);
            if (!conversation)
                return;
            const fullConversation = yield prisma.aiConversation.findUnique({
                where: { id: conversationId },
                include: commonAiConversationInclude,
            });
            if (!fullConversation) {
                res.status(404).json(msgTemplate("Percakapan AI tidak ditemukan after ownership check."));
                return;
            }
            res.json(msgTemplate("Percakapan AI berhasil diambil.", fullConversation));
        }
        catch (error) {
            handleControllerError(res, error, "Gagal mengambil Percakapan AI.");
        }
    }),
    /**
     * @description Update an existing Percakapan AI owned by the user (e.g., rename title)
     * @route PUT /api/ai-conversations/:id (or PATCH)
     */
    updateAiConversation: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const conversationId = parseNumericId(req, res);
        if (conversationId === null)
            return;
        if (!validateRequestBody(req, res, aiConversationUpdateValidation)) {
            return;
        }
        const userId = req.user.id;
        const dataToUpdate = Object.assign({}, req.body);
        delete dataToUpdate.id;
        delete dataToUpdate.owner_id;
        try {
            const ownedConversation = yield findAiConversationAndVerifyOwnership(res, conversationId, userId);
            if (!ownedConversation)
                return;
            const updatedConversation = yield prisma.aiConversation.update({
                where: {
                    id: conversationId,
                },
                data: dataToUpdate,
                include: { owner: { select: { id: true, username: true } } },
            });
            res.json(msgTemplate("Percakapan AI berhasil diupdate.", updatedConversation));
        }
        catch (error) {
            handleControllerError(res, error, "Gagal mengupdate Percakapan AI.");
        }
    }),
    /**
     * @description Delete an Percakapan AI owned by the user
     * @route DELETE /api/ai-conversations/:id
     */
    deleteAiConversation: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const conversationId = parseNumericId(req, res);
        if (conversationId === null)
            return;
        const userId = req.user.id;
        try {
            const ownedConversation = yield findAiConversationAndVerifyOwnership(res, conversationId, userId);
            if (!ownedConversation)
                return;
            yield prisma.aiConversation.delete({
                where: {
                    id: conversationId,
                },
            });
            res.json(msgTemplate("Percakapan AI berhasil dihapus.", {
                id: conversationId,
            }));
        }
        catch (error) {
            handleControllerError(res, error, "Gagal menghapus Percakapan AI.");
        }
    }),
};
export default aiConversationController;
