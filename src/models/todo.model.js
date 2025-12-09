// src/models/todo.model.js
import pool from "../config/db.js";

export async function getAllTodos() {
  const result = await pool.query("SELECT * FROM todos ORDER BY id ASC");
  return result.rows;
}

export async function getTodoById(id) {
  const result = await pool.query("SELECT * FROM todos WHERE id = $1", [id]);
  return result.rows[0] || null;
}

export async function createTodo({ title, description }) {
  const result = await pool.query(
    `INSERT INTO todos (title, description)
     VALUES ($1, $2)
     RETURNING *`,
    [title, description ?? null]
  );
  return result.rows[0];
}

export async function updateTodo(id, { title, description, completed }) {
  const result = await pool.query(
    `UPDATE todos
     SET title = $2,
         description = $3,
         completed = $4,
         updated_at = NOW()
     WHERE id = $1
     RETURNING *`,
    [id, title, description ?? null, completed]
  );
  return result.rows[0] || null;
}

export async function deleteTodo(id) {
  const result = await pool.query("DELETE FROM todos WHERE id = $1", [id]);
  return result.rowCount > 0;
}
