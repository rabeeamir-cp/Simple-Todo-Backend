// src/routes/todo.routes.js
import { Router } from "express";
import {
  listTodos,
  getTodo,
  createTodo,
  updateTodo,
  removeTodo,
} from "../controllers/todo.controller.js";

const router = Router();

// GET /api/todos
router.get("/", listTodos);

// GET /api/todos/:id
router.get("/:id", getTodo);

// POST /api/todos
router.post("/", createTodo);

// PUT /api/todos/:id
router.put("/:id", updateTodo);

// DELETE /api/todos/:id
router.delete("/:id", removeTodo);

export default router;
