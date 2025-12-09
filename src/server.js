// src/server.js
import dotenv from "dotenv";

// Load env from .env, fall back to .env.example
const result = dotenv.config();
if (result.error) {
  dotenv.config({ path: ".env.example" });
  console.log(".env not found, loaded .env.example instead");
}

import app from "./app.js";

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
