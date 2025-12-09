// src/controllers/todo.controller.js
import {
  getAllTodos,
  getTodoById,
  createTodo as createTodoModel,
  updateTodo as updateTodoModel,
  deleteTodo as deleteTodoModel,
} from "../models/todo.model.js";

export async function listTodos(req, res, next) {
  try {
    const todos = await getAllTodos();
    res.json(todos);
  } catch (err) {
    next(err);
  }
}

export async function getTodo(req, res, next) {
  try {
    const { id } = req.params;
    const todo = await getTodoById(id);

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(todo);
  } catch (err) {
    next(err);
  }
}

export async function createTodo(req, res, next) {
  try {
    const { title, description } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ error: "Title is required" });
    }

    const todo = await createTodoModel({
      title: title.trim(),
      description: description?.trim() || null,
    });

    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
}

export async function updateTodo(req, res, next) {
  try {
    const { id } = req.params;
    const existing = await getTodoById(id);

    if (!existing) {
      return res.status(404).json({ error: "Todo not found" });
    }

    const {
      title = existing.title,
      description = existing.description,
      completed = existing.completed,
    } = req.body;

    const updated = await updateTodoModel(id, {
      title,
      description,
      completed,
    });

    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function removeTodo(req, res, next) {
  try {
    const { id } = req.params;

    const ok = await deleteTodoModel(id);

    if (!ok) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
