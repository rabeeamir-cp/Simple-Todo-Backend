// src/app.js
import express from "express";
import cors from "cors";
import morgan from "morgan";
import todoRoutes from "./routes/todo.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ message: "Todo MVC API is running" });
});

app.use("/api/todos", todoRoutes);

// Basic error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal server error" });
});

export default app;
