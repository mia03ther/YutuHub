// ============================================================
// YutuHub API Server (Entry Point)
// ============================================================
// Lightweight Express server that serves the REST API.
// Runs on PORT (default 3001) alongside the Next.js frontend
// (port 3000).
//
// Architecture:
//   Next.js Web (3000) → REST API (3001) → SQLite (Prisma)
//
// Usage:
//   npm run server:build   # compile TypeScript to ./dist
//   npm run server:start   # run compiled output
// ============================================================

import express from "express";
import cors from "cors";
import apiRouter from "./routes";
import { requestLogger } from "./middleware/requestLogger";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler";
import { prisma } from "./utils/prisma";

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

let server: ReturnType<typeof app.listen>;

// Graceful shutdown
const shutdown = async (): Promise<void> => {
  console.log("\n[YutuHub API] Shutting down...");
  server.close(async () => {
    await prisma.$disconnect();
    console.log("[YutuHub API] Server closed");
    process.exit(0);
  });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

// Start server — establish the Prisma engine eagerly so a bad datasource
// config fails fast. Note that SQLite creates a missing database file on
// connect, so this validates the connection config, not that migrations
// have been applied.
const start = async (): Promise<void> => {
  await prisma.$connect();

  server = app.listen(PORT, () => {
    console.log(`[YutuHub API] Server running on port ${PORT} (${NODE_ENV})`);
  });
};

start().catch((err: unknown) => {
  console.error("[YutuHub API] Failed to start:", err);
  process.exit(1);
});

export default app;