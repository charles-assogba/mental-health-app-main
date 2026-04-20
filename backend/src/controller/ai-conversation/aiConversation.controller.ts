import { msgTemplate } from "@/config/msgTemplate.js";
import { prisma } from "@/config/prismaClient.js";
import { Response } from "express";
import {
    aiConversationUpdateValidation,
    aiConversationValidation,
} from "./aiConversation.validation.js";
import { RequestWithUser } from "@/middleware/authMiddleware.type";
import {
    validateRequestBody,
    handleControllerError,
    parseNumericId,
} from "@/utils/crud.utils.js";
import { Prisma } from "@prisma/client";

const commonAiConversationInclude =
    Prisma.validator<Prisma.AiConversationInclude>()({
        owner: { select: { id: true, username: true, name: true } },

        ai_chat: {
            orderBy: { created_at: "asc" },
            select: { id: true, role: true, body: true, created_at: true },
        },
        _count: {
            select: { ai_chat: true },
        },
    });

export const findAiConversationAndVerifyOwnership = async (
    res: Response,
    conversationId: number,
    userId: number,
) => {
    const conversation = await prisma.aiConversation.findFirst({
        where: { id: conversationId, owner_id: userId },
    });

    if (!conversation) {
        res.status(404).json(
            msgTemplate(
                "Percakapan AI tidak ditemukan atau anda tidak memiliki hak akses.",
            ),
        );
        return;
    }

    return conversation;
};

const aiConversationController = {
    /**
     * @description Create a new Percakapan AI
     * @route POST /api/ai-conversations
     */
    createAiConversation: async (req: RequestWithUser, res: Response) => {
        if (!validateRequestBody(req, res, aiConversationValidation)) {
            return;
        }

        const userId = req.user!.id;

        const data = req.body;

        try {
            const newConversation = await prisma.aiConversation.create({
                data: { ...data, owner_id: userId },
                include: commonAiConversationInclude,
            });

            res.status(201).json(
                msgTemplate("Percakapan AI berhasil dibuat.", newConversation),
            );
        } catch (error) {
            handleControllerError(res, error, "Gagal membuat Percakapan AI.");
        }
    },

    /**
     * @description Read Percakapan AIs owned by the user
     * @route GET /api/ai-conversations
     */
    readAiConversations: async (req: RequestWithUser, res: Response) => {
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 10;
        const skip = (page - 1) * limit;
        const userId = req.user!.id;

        try {
            const conversations = await prisma.aiConversation.findMany({
                where: {
                    owner_id: userId,
                },
                skip: skip,
                take: limit,
                orderBy: { created_at: "desc" },

                include: { _count: { select: { ai_chat: true } } },
            });

            const totalConversations = await prisma.aiConversation.count({
                where: { owner_id: userId },
            });

            res.json(
                msgTemplate("Percakapan AIs berhasil diambil.", {
                    conversations: conversations,
                    pagination: {
                        currentPage: page,
                        totalPages: Math.ceil(totalConversations / limit),
                        totalConversations,
                        limit,
                    },
                }),
            );
            return;
        } catch (error) {
            handleControllerError(
                res,
                error,
                "Gagal mengambil Percakapan AIs.",
            );
        }
    },

    /**
     * @description Read a single Percakapan AI by its ID, ensuring ownership.
     * @route GET /api/ai-conversations/:id
     */
    readAiConversationById: async (req: RequestWithUser, res: Response) => {
        const conversationId = parseNumericId(req, res);
        console.log(conversationId);
        if (conversationId === null) return;

        const userId = req.user!.id;

        try {
            const conversation = await findAiConversationAndVerifyOwnership(
                res,
                conversationId,
                userId,
            );
            if (!conversation) return;

            const fullConversation = await prisma.aiConversation.findUnique({
                where: { id: conversationId },
                include: commonAiConversationInclude,
            });

            if (!fullConversation) {
                res.status(404).json(
                    msgTemplate(
                        "Percakapan AI tidak ditemukan after ownership check.",
                    ),
                );
                return;
            }

            res.json(
                msgTemplate(
                    "Percakapan AI berhasil diambil.",
                    fullConversation,
                ),
            );
        } catch (error) {
            handleControllerError(res, error, "Gagal mengambil Percakapan AI.");
        }
    },

    /**
     * @description Update an existing Percakapan AI owned by the user (e.g., rename title)
     * @route PUT /api/ai-conversations/:id (or PATCH)
     */
    updateAiConversation: async (req: RequestWithUser, res: Response) => {
        const conversationId = parseNumericId(req, res);
        if (conversationId === null) return;

        if (!validateRequestBody(req, res, aiConversationUpdateValidation)) {
            return;
        }

        const userId = req.user!.id;
        const dataToUpdate = { ...req.body };

        delete dataToUpdate.id;
        delete dataToUpdate.owner_id;

        try {
            const ownedConversation =
                await findAiConversationAndVerifyOwnership(
                    res,
                    conversationId,
                    userId,
                );
            if (!ownedConversation) return;

            const updatedConversation = await prisma.aiConversation.update({
                where: {
                    id: conversationId,
                },
                data: dataToUpdate,
                include: { owner: { select: { id: true, username: true } } },
            });

            res.json(
                msgTemplate(
                    "Percakapan AI berhasil diupdate.",
                    updatedConversation,
                ),
            );
        } catch (error) {
            handleControllerError(
                res,
                error,
                "Gagal mengupdate Percakapan AI.",
            );
        }
    },

    /**
     * @description Delete an Percakapan AI owned by the user
     * @route DELETE /api/ai-conversations/:id
     */
    deleteAiConversation: async (req: RequestWithUser, res: Response) => {
        const conversationId = parseNumericId(req, res);
        if (conversationId === null) return;

        const userId = req.user!.id;

        try {
            const ownedConversation =
                await findAiConversationAndVerifyOwnership(
                    res,
                    conversationId,
                    userId,
                );
            if (!ownedConversation) return;

            await prisma.aiConversation.delete({
                where: {
                    id: conversationId,
                },
            });

            res.json(
                msgTemplate("Percakapan AI berhasil dihapus.", {
                    id: conversationId,
                }),
            );
        } catch (error) {
            handleControllerError(res, error, "Gagal menghapus Percakapan AI.");
        }
    },
};

export default aiConversationController;
