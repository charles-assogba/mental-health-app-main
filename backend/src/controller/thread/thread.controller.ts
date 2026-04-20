import { msgTemplate } from "@/config/msgTemplate.js";
import { prisma } from "@/config/prismaClient.js";
import { Request, Response } from "express";
import { threadValidation } from "./thread.validation.js";
import { RequestWithUser } from "@/middleware/authMiddleware.type";
import {
    validateRequestBody,
    handleControllerError,
    parseNumericId,
    commonUserOmit,
} from "@/utils/crud.utils.js";
import { Prisma } from "@prisma/client";

/**
 * Checks if a thread exists and is owned by the specified user.
 * Sends a 404 response if tidak ditemukan or not owned.
 * Returns the thread if found and owned, null otherwise.
 */
const findThreadAndVerifyOwnership = async (
    res: Response,
    threadId: number,
    userId: number,
) => {
    const thread = await prisma.thread.findFirst({
        where: { id: threadId, owner_id: userId },
    });

    if (!thread) {
        res.status(404).json(
            msgTemplate(
                "Data tidak ditemukan atau anda tidak memiliki hak akses.",
            ),
        );
        return null;
    }
    return thread;
};

const commonThreadInclude = Prisma.validator<Prisma.ThreadInclude>()({
    owner: {
        omit: commonUserOmit,
    },
    thread_comments: {
        orderBy: { created_at: "asc" },
        include: {
            owner: {
                omit: commonUserOmit,
            },
            thread_comment_replies: {
                orderBy: { created_at: "asc" },
                include: {
                    owner: {
                        omit: commonUserOmit,
                    },
                },
            },
        },
    },
});

const threadController = {
    /**
     * @description Create a new thread
     * @route POST /api/threads
     */
    createThread: async (req: RequestWithUser, res: Response) => {
        if (!validateRequestBody(req, res, threadValidation)) {
            return;
        }

        const userId = req.user!.id;
        const data = req.body;

        try {
            const thread = await prisma.thread.create({
                data: { ...data, owner_id: userId },
                include: {
                    owner: { select: { id: true, username: true, name: true } },
                },
            });
            res.status(201).json(
                msgTemplate("Thread berhasil dibuat.", thread),
            );
        } catch (error) {
            handleControllerError(res, error, "Gagal membuat thread.");
        }
    },

    /**
     * @description Read multiple threads with pagination (basic)
     * @route GET /api/threads
     */
    readThread: async (req: Request, res: Response) => {
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 5;
        const skip = (page - 1) * limit;

        try {
            const threads = await prisma.thread.findMany({
                skip: skip,
                take: limit,
                orderBy: { created_at: "desc" },
                include: commonThreadInclude,
            });

            const totalThreads = await prisma.thread.count();

            res.json(
                msgTemplate("Threads berhasil diambil.", {
                    threads,
                    pagination: {
                        currentPage: page,
                        totalPages: Math.ceil(totalThreads / limit),
                        totalThreads,
                        limit,
                    },
                }),
            );
        } catch (error) {
            handleControllerError(res, error, "Gagal mengambil threads.");
        }
    },

    /**
     * @description Read a single thread by its ID
     * @route GET /api/threads/:id
     */
    readThreadById: async (req: Request, res: Response) => {
        const threadId = parseNumericId(req, res);
        if (threadId === null) return;

        try {
            const thread = await prisma.thread.findUnique({
                where: { id: threadId },
                include: commonThreadInclude,
            });

            if (!thread) {
                res.status(404).json(msgTemplate("Thread tidak ditemukan."));
                return;
            }

            res.json(msgTemplate("Thread berhasil diambil.", thread));
        } catch (error) {
            handleControllerError(res, error, "Gagal mengambil thread.");
        }
    },

    /**
     * @description Update an existing thread owned by the user
     * @route PUT /api/threads/:id  (or PATCH for partial updates)
     */
    updateThread: async (req: RequestWithUser, res: Response) => {
        const threadId = parseNumericId(req, res);
        if (threadId === null) return;

        if (!validateRequestBody(req, res, threadValidation)) {
            return;
        }

        const userId = req.user!.id;
        const dataToUpdate = req.body;

        delete dataToUpdate.id;
        delete dataToUpdate.owner_id;

        try {
            const ownedThread = await findThreadAndVerifyOwnership(
                res,
                threadId,
                userId,
            );
            if (!ownedThread) return;

            const updatedThread = await prisma.thread.update({
                where: {
                    id: threadId,
                },
                data: dataToUpdate,
                include: {
                    owner: { select: { id: true, username: true, name: true } },
                },
            });

            res.json(msgTemplate("Thread berhasil diupdate.", updatedThread));
        } catch (error) {
            handleControllerError(res, error, "Gagal mengupdate thread.");
        }
    },

    /**
     * @description Delete a thread owned by the user
     * @route DELETE /api/threads/:id
     */
    deleteThread: async (req: RequestWithUser, res: Response) => {
        const threadId = parseNumericId(req, res);
        if (threadId === null) return;

        const userId = req.user!.id;

        try {
            const ownedThread = await findThreadAndVerifyOwnership(
                res,
                threadId,
                userId,
            );
            if (!ownedThread) return;

            await prisma.thread.delete({
                where: {
                    id: threadId,
                },
            });

            res.json(msgTemplate("Thread berhasil dihapus.", { id: threadId }));
        } catch (error) {
            handleControllerError(res, error, "Gagal menghapus thread.");
        }
    },
};

export default threadController;
