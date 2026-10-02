// ============================================================
// YutuHub API Server (Entry Point)
// ============================================================
// Lightweight Express server that serves the REST API.
// Runs on PORT (default 3001) alongside the Next.js frontend
// (port 3000).
//
// Architecture target:
//   Next.js Web (3000) → REST API (3001) → MySQL
//
// Usage:
//   npm run server:dev   # build + run
//   npm run server:start # run compiled output
// ============================================================

import express from "express";
import cors from "cors";
import apiRouter from "./routes";
import { requestLogger } from "./middleware/requestLogger";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler";
import { closePool } from "./utils/database";

const app = express();
const PORT = Number(process.env.PORT) || 3001;
const NODE_ENV = process.env.NODE_ENV ?? "development";

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN ?? "*" }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Request logging (skip in test)
if (NODE_ENV !== "test") {
  app.use(requestLogger);
}

// API routes — all under /api/
app.use("/api", apiRouter);

// 404 handler (must come after routes)
app.use(notFoundHandler);

// Global error handler (must be last)
app.use(errorHandler);

// Start server
const server = app.listen(PORT, () => {
  console.log(`[YutuHub API] Server running on port ${PORT} (${NODE_ENV})`);
});

// Graceful shutdown
const shutdown = async (): Promise<void> => {
  console.log("\n[YutuHub API] Shutting down...");
  server.close(() => {
    console.log("[YutuHub API] Server closed");
    process.exit(0);
  });

  await closePool();
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

export default app;
