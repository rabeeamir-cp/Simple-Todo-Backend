// src/db/migrate.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import pool from "../config/db.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigration() {
  const filePath = path.join(
    __dirname,
    "migrations",
    "001_create_todos_table.sql"
  );
  const sql = fs.readFileSync(filePath, "utf8");

  console.log("Running migration: 001_create_todos_table.sql");

  try {
    await pool.query(sql);
    console.log("✅ Migration completed.");
  } catch (err) {
    console.error("❌ Migration failed:", err);
  } finally {
    await pool.end();
  }
}

runMigration();
