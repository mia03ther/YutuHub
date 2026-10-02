// ============================================================
// Error Handler Middleware
// ============================================================
// Catches all unhandled errors and returns a standardized JSON
// response. Also handles 404 for unmatched routes.
// ============================================================

import type { Request, Response, NextFunction } from "express";
import { sendError } from "../utils/response";

/**
 * 404 handler — must be registered after all routes.
 */
export function notFoundHandler(
  _req: Request,
  res: Response,
): void {
  res.status(404).json(sendError("Route not found", 404));
}

/**
 * Global error handler — must be the last middleware registered.
 */
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  console.error("[ERROR]", err.message);

  const status = (err as { status?: number }).status ?? 500;
  const message =
    status === 500
      ? "Internal server error"
      : (err as { message?: string }).message ?? "Unknown error";

  res.status(status).json(sendError(message, status));
}
