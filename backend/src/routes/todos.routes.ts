import todosUseCase from "@/controller/todo/todo.controller.js";
import authenticateToken from "@/middleware/authMiddleware.js";
import { Router } from "express";

const router = Router();

const { createTodo, readTodo, deleteTodo, updateTodo } = todosUseCase;

router.post("/", authenticateToken, createTodo);
router.get("/", authenticateToken, readTodo);
router.delete("/:id", authenticateToken, deleteTodo);
router.put("/:id", authenticateToken, updateTodo);

export default router;
