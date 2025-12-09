// src/config/db.js
import dotenv from "dotenv";
import pkg from "pg";

// Load env from .env, fall back to .env.example
const result = dotenv.config();
if (result.error) {
  dotenv.config({ path: ".env.example" });
  console.log(".env not found, loaded .env.example instead");
}

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("error", (err) => {
  console.error("Unexpected PG pool error:", err);
});

export default pool;
