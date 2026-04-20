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
import { todoValidation, updateTodoValidation } from "./todo.validation.js";
import { validateRequestBody, handleControllerError, parseNumericId, } from "../../utils/crud.utils.js";
/**
 * Checks if a todo exists and is owned by the specified user.
 * Sends a 404 response if tidak ditemukan or not owned.
 * Returns the todo if found and owned, null otherwise.
 */
const findTodoAndVerifyOwnership = (res, todoId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = yield prisma.todos.findFirst({
        where: { id: todoId, owner_id: userId },
    });
    if (!todo) {
        res.status(404).json(msgTemplate("Data tidak ditemukan atau anda tidak memiliki hak akses."));
        return null;
    }
    return todo;
});
const todoController = {
    /**
     * @description Create a new todo
     * @route POST /api/todos
     */
    createTodo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!validateRequestBody(req, res, todoValidation)) {
            return;
        }
        const userId = req.user.id;
        const data = req.body;
        try {
            const todo = yield prisma.todos.create({
                data: Object.assign(Object.assign({}, data), { owner_id: userId }),
            });
            res.status(201).json(msgTemplate("Todo berhasil dibuat.", todo));
        }
        catch (error) {
            handleControllerError(res, error, "Gagal membuat todo.");
        }
    }),
    updateTodo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const todoId = parseNumericId(req, res);
        if (todoId === null)
            return;
        if (!validateRequestBody(req, res, updateTodoValidation)) {
            return;
        }
        const userId = req.user.id;
        const dataToUpdate = req.body;
        delete dataToUpdate.id;
        delete dataToUpdate.title;
        delete dataToUpdate.owner_id;
        try {
            const ownedTodo = yield findTodoAndVerifyOwnership(res, todoId, userId);
            if (!ownedTodo)
                return;
            const updatedTodo = yield prisma.todos.update({
                where: {
                    id: todoId,
                },
                data: dataToUpdate,
            });
            res.json(msgTemplate("Todo berhasil diupdate.", updatedTodo));
        }
        catch (error) {
            handleControllerError(res, error, "Gagal mengupdate todo.");
        }
    }),
    /**
     * @description Read multiple todos with pagination (basic)
     * @route GET /api/todos
     */
    readTodo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.user.id;
        try {
            const todos = yield prisma.todos.findMany({
                orderBy: { created_at: "desc" },
                where: {
                    owner_id: userId,
                },
            });
            res.json(msgTemplate("Todos berhasil diambil.", {
                todos,
            }));
        }
        catch (error) {
            handleControllerError(res, error, "Gagal mengambil todos.");
        }
    }),
    /**
     * @description Delete a todo owned by the user
     * @route DELETE /api/todos/:id
     */
    deleteTodo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const todoId = parseNumericId(req, res);
        if (todoId === null)
            return;
        const userId = req.user.id;
        try {
            const ownedTodo = yield findTodoAndVerifyOwnership(res, todoId, userId);
            if (!ownedTodo)
                return;
            yield prisma.todos.delete({
                where: {
                    id: todoId,
                },
            });
            res.json(msgTemplate("Todo berhasil dihapus.", { id: todoId }));
        }
        catch (error) {
            handleControllerError(res, error, "Gagal menghapus todo.");
        }
    }),
};
export default todoController;
