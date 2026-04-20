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
import { threadCommentReplyUpdateValidation, threadCommentReplyValidation, } from "./threadCommentReply.validation.js";
import { validateRequestBody, handleControllerError, parseNumericId, } from "../../utils/crud.utils.js";
import { Prisma } from "@prisma/client";
const commonThreadCommentReplyInclude = Prisma.validator()({
    owner: { select: { id: true, username: true, name: true } },
    comment: { select: { id: true, thread_id: true } },
});
/**
 * Checks if a thread comment reply exists and is owned by the specified user.
 * Sends a 404 response if tidak ditemukan or not owned.
 * Returns the reply if found and owned, null otherwise.
 */
const findReplyAndVerifyOwnership = (res, replyId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const reply = yield prisma.threadCommentReply.findFirst({
        where: { id: replyId, owner_id: userId },
    });
    if (!reply) {
        res.status(404).json(msgTemplate("Reply tidak ditemukan or you don't have permission to modify it."));
        return null;
    }
    return reply;
});
const threadCommentReplyController = {
    /**
     * @description Create a new thread comment reply
     * @route POST /api/comments/:commentId/replies (Example route)
     */
    createThreadCommentReply: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!validateRequestBody(req, res, threadCommentReplyValidation)) {
            return;
        }
        const userId = req.user.id;
        const data = req.body;
        if (!data.comment_id) {
            res.status(400).json(msgTemplate("Missing required field: comment_id"));
            return;
        }
        try {
            const commentExists = yield prisma.threadComment.findUnique({
                where: { id: data.comment_id },
            });
            if (!commentExists) {
                res.status(404).json(msgTemplate("Parent comment tidak ditemukan."));
                return;
            }
            const reply = yield prisma.threadCommentReply.create({
                data: Object.assign(Object.assign({}, data), { owner_id: userId }),
                include: commonThreadCommentReplyInclude,
            });
            res.status(201).json(msgTemplate("Reply berhasil dibuat.", reply));
        }
        catch (error) {
            handleControllerError(res, error, "Gagal membuat reply.");
        }
    }),
    /**
     * @description Read replies for a specific comment (or all replies)
     * @route GET /api/comments/:commentId/replies (Example route) or /api/replies
     */
    readThreadCommentReply: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;
        const commentIdParam = req.params.commentId || req.query.commentId;
        const commentId = commentIdParam
            ? parseInt(commentIdParam, 10)
            : undefined;
        const whereClause = {};
        if (commentId !== undefined && !isNaN(commentId)) {
            whereClause.comment_id = commentId;
        }
        else if (commentIdParam) {
            res.status(400).json(msgTemplate("Invalid Comment ID provided for filtering."));
            return;
        }
        try {
            const replies = yield prisma.threadCommentReply.findMany({
                where: whereClause,
                skip: skip,
                take: limit,
                orderBy: { created_at: "asc" },
                include: commonThreadCommentReplyInclude,
            });
            const totalReplies = yield prisma.threadCommentReply.count({
                where: whereClause,
            });
            res.json(msgTemplate("Replies berhasil diambil.", {
                replies,
                pagination: {
                    currentPage: page,
                    totalPages: Math.ceil(totalReplies / limit),
                    totalReplies,
                    limit,
                },
            }));
        }
        catch (error) {
            handleControllerError(res, error, "Gagal mengambil replies.");
        }
    }),
    /**
     * @description Read a single thread comment reply by its ID
     * @route GET /api/replies/:id
     */
    readThreadCommentReplyById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const replyId = parseNumericId(req, res);
        if (replyId === null)
            return;
        try {
            const reply = yield prisma.threadCommentReply.findUnique({
                where: { id: replyId },
                include: commonThreadCommentReplyInclude,
            });
            if (!reply) {
                res.status(404).json(msgTemplate("Reply tidak ditemukan."));
                return;
            }
            res.json(msgTemplate("Reply berhasil diambil.", reply));
        }
        catch (error) {
            handleControllerError(res, error, "Gagal mengambil reply.");
        }
    }),
    /**
     * @description Update an existing thread comment reply owned by the user
     * @route PUT /api/replies/:id (or PATCH)
     */
    updateThreadCommentReply: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const replyId = parseNumericId(req, res);
        if (replyId === null)
            return;
        if (!validateRequestBody(req, res, threadCommentReplyUpdateValidation)) {
            return;
        }
        const userId = req.user.id;
        const dataToUpdate = Object.assign({}, req.body);
        delete dataToUpdate.id;
        delete dataToUpdate.owner_id;
        delete dataToUpdate.comment_id;
        delete dataToUpdate.thread_id;
        try {
            const ownedReply = yield findReplyAndVerifyOwnership(res, replyId, userId);
            if (!ownedReply)
                return;
            const updatedReply = yield prisma.threadCommentReply.update({
                where: {
                    id: replyId,
                },
                data: dataToUpdate,
                include: commonThreadCommentReplyInclude,
            });
            res.json(msgTemplate("Reply berhasil diupdate.", updatedReply));
        }
        catch (error) {
            handleControllerError(res, error, "Gagal mengupdate reply.");
        }
    }),
    /**
     * @description Delete a thread comment reply owned by the user
     * @route DELETE /api/replies/:id
     */
    deleteThreadCommentReply: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const replyId = parseNumericId(req, res);
        if (replyId === null)
            return;
        const userId = req.user.id;
        try {
            const ownedReply = yield findReplyAndVerifyOwnership(res, replyId, userId);
            if (!ownedReply)
                return;
            yield prisma.threadCommentReply.delete({
                where: {
                    id: replyId,
                },
            });
            res.json(msgTemplate("Reply berhasil dihapus.", { id: replyId }));
        }
        catch (error) {
            handleControllerError(res, error, "Gagal menghapus reply.");
        }
    }),
};
export default threadCommentReplyController;
