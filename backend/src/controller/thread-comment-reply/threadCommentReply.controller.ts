import { msgTemplate } from "@/config/msgTemplate.js";
import { prisma } from "@/config/prismaClient.js";
import { Request, Response } from "express";
import {
    threadCommentReplyUpdateValidation,
    threadCommentReplyValidation,
} from "./threadCommentReply.validation.js";
import { RequestWithUser } from "@/middleware/authMiddleware.type";
import {
    validateRequestBody,
    handleControllerError,
    parseNumericId,
} from "@/utils/crud.utils.js";
import { Prisma } from "@prisma/client";

const commonThreadCommentReplyInclude =
    Prisma.validator<Prisma.ThreadCommentReplyInclude>()({
        owner: { select: { id: true, username: true, name: true } },
        comment: { select: { id: true, thread_id: true } },
    });

/**
 * Checks if a thread comment reply exists and is owned by the specified user.
 * Sends a 404 response if tidak ditemukan or not owned.
 * Returns the reply if found and owned, null otherwise.
 */
const findReplyAndVerifyOwnership = async (
    res: Response,
    replyId: number,
    userId: number,
) => {
    const reply = await prisma.threadCommentReply.findFirst({
        where: { id: replyId, owner_id: userId },
    });

    if (!reply) {
        res.status(404).json(
            msgTemplate(
                "Reply tidak ditemukan or you don't have permission to modify it.",
            ),
        );
        return null;
    }
    return reply;
};

const threadCommentReplyController = {
    /**
     * @description Create a new thread comment reply
     * @route POST /api/comments/:commentId/replies (Example route)
     */
    createThreadCommentReply: async (req: RequestWithUser, res: Response) => {
        if (!validateRequestBody(req, res, threadCommentReplyValidation)) {
            return;
        }

        const userId = req.user!.id;
        const data = req.body;

        if (!data.comment_id) {
            res.status(400).json(
                msgTemplate("Missing required field: comment_id"),
            );
            return;
        }

        try {
            const commentExists = await prisma.threadComment.findUnique({
                where: { id: data.comment_id },
            });
            if (!commentExists) {
                res.status(404).json(
                    msgTemplate("Parent comment tidak ditemukan."),
                );
                return;
            }

            const reply = await prisma.threadCommentReply.create({
                data: { ...data, owner_id: userId },
                include: commonThreadCommentReplyInclude,
            });

            res.status(201).json(msgTemplate("Reply berhasil dibuat.", reply));
        } catch (error) {
            handleControllerError(res, error, "Gagal membuat reply.");
        }
    },

    /**
     * @description Read replies for a specific comment (or all replies)
     * @route GET /api/comments/:commentId/replies (Example route) or /api/replies
     */
    readThreadCommentReply: async (req: Request, res: Response) => {
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 10;
        const skip = (page - 1) * limit;

        const commentIdParam = req.params.commentId || req.query.commentId;
        const commentId = commentIdParam
            ? parseInt(commentIdParam as string, 10)
            : undefined;

        const whereClause: Prisma.ThreadCommentReplyWhereInput = {};
        if (commentId !== undefined && !isNaN(commentId)) {
            whereClause.comment_id = commentId;
        } else if (commentIdParam) {
            res.status(400).json(
                msgTemplate("Invalid Comment ID provided for filtering."),
            );
            return;
        }

        try {
            const replies = await prisma.threadCommentReply.findMany({
                where: whereClause,
                skip: skip,
                take: limit,
                orderBy: { created_at: "asc" },
                include: commonThreadCommentReplyInclude,
            });

            const totalReplies = await prisma.threadCommentReply.count({
                where: whereClause,
            });

            res.json(
                msgTemplate("Replies berhasil diambil.", {
                    replies,
                    pagination: {
                        currentPage: page,
                        totalPages: Math.ceil(totalReplies / limit),
                        totalReplies,
                        limit,
                    },
                }),
            );
        } catch (error) {
            handleControllerError(res, error, "Gagal mengambil replies.");
        }
    },

    /**
     * @description Read a single thread comment reply by its ID
     * @route GET /api/replies/:id
     */
    readThreadCommentReplyById: async (req: Request, res: Response) => {
        const replyId = parseNumericId(req, res);
        if (replyId === null) return;

        try {
            const reply = await prisma.threadCommentReply.findUnique({
                where: { id: replyId },
                include: commonThreadCommentReplyInclude,
            });

            if (!reply) {
                res.status(404).json(msgTemplate("Reply tidak ditemukan."));
                return;
            }

            res.json(msgTemplate("Reply berhasil diambil.", reply));
        } catch (error) {
            handleControllerError(res, error, "Gagal mengambil reply.");
        }
    },

    /**
     * @description Update an existing thread comment reply owned by the user
     * @route PUT /api/replies/:id (or PATCH)
     */
    updateThreadCommentReply: async (req: RequestWithUser, res: Response) => {
        const replyId = parseNumericId(req, res);
        if (replyId === null) return;

        if (
            !validateRequestBody(req, res, threadCommentReplyUpdateValidation)
        ) {
            return;
        }

        const userId = req.user!.id;
        const dataToUpdate = { ...req.body };

        delete dataToUpdate.id;
        delete dataToUpdate.owner_id;
        delete dataToUpdate.comment_id;
        delete dataToUpdate.thread_id;

        try {
            const ownedReply = await findReplyAndVerifyOwnership(
                res,
                replyId,
                userId,
            );
            if (!ownedReply) return;

            const updatedReply = await prisma.threadCommentReply.update({
                where: {
                    id: replyId,
                },
                data: dataToUpdate,
                include: commonThreadCommentReplyInclude,
            });

            res.json(msgTemplate("Reply berhasil diupdate.", updatedReply));
        } catch (error) {
            handleControllerError(res, error, "Gagal mengupdate reply.");
        }
    },

    /**
     * @description Delete a thread comment reply owned by the user
     * @route DELETE /api/replies/:id
     */
    deleteThreadCommentReply: async (req: RequestWithUser, res: Response) => {
        const replyId = parseNumericId(req, res);
        if (replyId === null) return;

        const userId = req.user!.id;

        try {
            const ownedReply = await findReplyAndVerifyOwnership(
                res,
                replyId,
                userId,
            );
            if (!ownedReply) return;

            await prisma.threadCommentReply.delete({
                where: {
                    id: replyId,
                },
            });

            res.json(msgTemplate("Reply berhasil dihapus.", { id: replyId }));
        } catch (error) {
            handleControllerError(res, error, "Gagal menghapus reply.");
        }
    },
};

export default threadCommentReplyController;
