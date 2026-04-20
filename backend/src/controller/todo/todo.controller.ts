import { msgTemplate } from "@/config/msgTemplate.js";
import { prisma } from "@/config/prismaClient.js";
import { Response } from "express";
import { todoValidation, updateTodoValidation } from "./todo.validation.js";
import { RequestWithUser } from "@/middleware/authMiddleware.type";
import {
    validateRequestBody,
    handleControllerError,
    parseNumericId,
} from "@/utils/crud.utils.js";

/**
 * Checks if a todo exists and is owned by the specified user.
 * Sends a 404 response if tidak ditemukan or not owned.
 * Returns the todo if found and owned, null otherwise.
 */
const findTodoAndVerifyOwnership = async (
    res: Response,
    todoId: number,
    userId: number,
) => {
    const todo = await prisma.todos.findFirst({
        where: { id: todoId, owner_id: userId },
    });

    if (!todo) {
        res.status(404).json(
            msgTemplate(
                "Data tidak ditemukan atau anda tidak memiliki hak akses.",
            ),
        );
        return null;
    }
    return todo;
};

const todoController = {
    /**
     * @description Create a new todo
     * @route POST /api/todos
     */
    createTodo: async (req: RequestWithUser, res: Response) => {
        if (!validateRequestBody(req, res, todoValidation)) {
            return;
        }

        const userId = req.user!.id;
        const data = req.body;

        try {
            const todo = await prisma.todos.create({
                data: { ...data, owner_id: userId },
            });
            res.status(201).json(msgTemplate("Todo berhasil dibuat.", todo));
        } catch (error) {
            handleControllerError(res, error, "Gagal membuat todo.");
        }
    },

    updateTodo: async (req: RequestWithUser, res: Response) => {
        const todoId = parseNumericId(req, res);
        if (todoId === null) return;

        if (!validateRequestBody(req, res, updateTodoValidation)) {
            return;
        }

        const userId = req.user!.id;
        const dataToUpdate = req.body;

        delete dataToUpdate.id;
        delete dataToUpdate.title;
        delete dataToUpdate.owner_id;

        try {
            const ownedTodo = await findTodoAndVerifyOwnership(
                res,
                todoId,
                userId,
            );
            if (!ownedTodo) return;

            const updatedTodo = await prisma.todos.update({
                where: {
                    id: todoId,
                },
                data: dataToUpdate,
            });

            res.json(msgTemplate("Todo berhasil diupdate.", updatedTodo));
        } catch (error) {
            handleControllerError(res, error, "Gagal mengupdate todo.");
        }
    },

    /**
     * @description Read multiple todos with pagination (basic)
     * @route GET /api/todos
     */
    readTodo: async (req: RequestWithUser, res: Response) => {
        const userId = req.user!.id;

        try {
            const todos = await prisma.todos.findMany({
                orderBy: { created_at: "desc" },
                where: {
                    owner_id: userId,
                },
            });

            res.json(
                msgTemplate("Todos berhasil diambil.", {
                    todos,
                }),
            );
        } catch (error) {
            handleControllerError(res, error, "Gagal mengambil todos.");
        }
    },

    /**
     * @description Delete a todo owned by the user
     * @route DELETE /api/todos/:id
     */
    deleteTodo: async (req: RequestWithUser, res: Response) => {
        const todoId = parseNumericId(req, res);
        if (todoId === null) return;

        const userId = req.user!.id;

        try {
            const ownedTodo = await findTodoAndVerifyOwnership(
                res,
                todoId,
                userId,
            );
            if (!ownedTodo) return;

            await prisma.todos.delete({
                where: {
                    id: todoId,
                },
            });

            res.json(msgTemplate("Todo berhasil dihapus.", { id: todoId }));
        } catch (error) {
            handleControllerError(res, error, "Gagal menghapus todo.");
        }
    },
};

export default todoController;
