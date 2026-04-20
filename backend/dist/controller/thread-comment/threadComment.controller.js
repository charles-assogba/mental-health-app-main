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
import { threadCommentUpdateValidation, threadCommentValidation, } from "./threadComment.validation.js";
import { validateRequestBody, handleControllerError, parseNumericId, } from "../../utils/crud.utils.js";
import { Prisma } from "@prisma/client";
const commonThreadCommentInclude = Prisma.validator()({
    owner: { select: { id: true, username: true, name: true } },
    thread: { select: { id: true, title: true } },
    _count: {
        select: { thread_comment_replies: true },
    },
});
/**
 * Checks if a thread comment exists and is owned by the specified user.
 * Sends a 404 response if tidak ditemukan or not owned.
 * Returns the comment if found and owned, null otherwise.
 */
const findCommentAndVerifyOwnership = (res, commentId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield prisma.threadComment.findFirst({
        where: { id: commentId, owner_id: userId },
    });
    if (!comment) {
        res.status(404).json(msgTemplate("Comment tidak ditemukan or you don't have permission to modify it."));
        return null;
    }
    return comment;
});
const threadCommentController = {
    /**
     * @description Create a new thread comment
     * @route POST /api/threads/:threadId/comments (Example route)
     */
    createThreadComment: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!validateRequestBody(req, res, threadCommentValidation)) {
            return;
        }
        const userId = req.user.id;
        const data = req.body;
        if (!data.thread_id) {
            res.status(400).json(msgTemplate("Missing required field: thread_id"));
            return;
        }
        try {
            const threadExists = yield prisma.thread.findUnique({
                where: { id: data.thread_id },
            });
            if (!threadExists) {
                res.status(404).json(msgTemplate("Parent thread tidak ditemukan."));
                return;
            }
            const threadComment = yield prisma.threadComment.create({
                data: Object.assign(Object.assign({}, data), { owner_id: userId }),
                include: commonThreadCommentInclude,
            });
            res.status(201).json(msgTemplate("Comment berhasil dibuat.", threadComment));
        }
        catch (error) {
            handleControllerError(res, error, "Gagal membuat comment.");
        }
    }),
    /**
     * @description Read comments for a specific thread (or all comments)
     * @route GET /api/threads/:threadId/comments (Example route) or /api/comments
     */
    readThreadComment: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;
        const threadIdParam = req.params.threadId || req.query.threadId;
        const threadId = threadIdParam
            ? parseInt(threadIdParam, 10)
            : undefined;
        const whereClause = {};
        if (threadId !== undefined && !isNaN(threadId)) {
            whereClause.thread_id = threadId;
        }
        else if (threadIdParam) {
            res.status(400).json(msgTemplate("Invalid Thread ID provided for filtering."));
            return;
        }
        try {
            const comments = yield prisma.threadComment.findMany({
                where: whereClause,
                skip: skip,
                take: limit,
                orderBy: { created_at: "asc" },
                include: commonThreadCommentInclude,
            });
            const totalComments = yield prisma.threadComment.count({
                where: whereClause,
            });
            res.json(msgTemplate("Comments berhasil diambil.", {
                comments,
                pagination: {
                    currentPage: page,
                    totalPages: Math.ceil(totalComments / limit),
                    totalComments,
                    limit,
                },
            }));
        }
        catch (error) {
            handleControllerError(res, error, "Gagal mengambil comments.");
        }
    }),
    /**
     * @description Read a single thread comment by its ID
     * @route GET /api/comments/:id
     */
    readThreadCommentById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const commentId = parseNumericId(req, res);
        if (commentId === null)
            return;
        try {
            const threadComment = yield prisma.threadComment.findUnique({
                where: { id: commentId },
                include: commonThreadCommentInclude,
            });
            if (!threadComment) {
                res.status(404).json(msgTemplate("Comment tidak ditemukan."));
                return;
            }
            res.json(msgTemplate("Comment berhasil diambil.", threadComment));
        }
        catch (error) {
            handleControllerError(res, error, "Gagal mengambil comment.");
        }
    }),
    /**
     * @description Update an existing thread comment owned by the user
     * @route PUT /api/comments/:id (or PATCH)
     */
    updateThreadComment: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const commentId = parseNumericId(req, res);
        if (commentId === null)
            return;
        if (!validateRequestBody(req, res, threadCommentUpdateValidation)) {
            return;
        }
        const userId = req.user.id;
        const dataToUpdate = Object.assign({}, req.body);
        delete dataToUpdate.id;
        delete dataToUpdate.owner_id;
        delete dataToUpdate.thread_id;
        try {
            const ownedComment = yield findCommentAndVerifyOwnership(res, commentId, userId);
            if (!ownedComment)
                return;
            const updatedComment = yield prisma.threadComment.update({
                where: {
                    id: commentId,
                },
                data: dataToUpdate,
                include: commonThreadCommentInclude,
            });
            res.json(msgTemplate("Comment berhasil diupdate.", updatedComment));
        }
        catch (error) {
            handleControllerError(res, error, "Gagal mengupdate comment.");
        }
    }),
    /**
     * @description Delete a thread comment owned by the user
     * @route DELETE /api/comments/:id
     */
    deleteThreadComment: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const commentId = parseNumericId(req, res);
        if (commentId === null)
            return;
        const userId = req.user.id;
        try {
            const ownedComment = yield findCommentAndVerifyOwnership(res, commentId, userId);
            if (!ownedComment)
                return;
            yield prisma.threadComment.delete({
                where: {
                    id: commentId,
                },
            });
            res.json(msgTemplate("Comment berhasil dihapus.", { id: commentId }));
        }
        catch (error) {
            handleControllerError(res, error, "Gagal menghapus comment.");
        }
    }),
};
export default threadCommentController;
