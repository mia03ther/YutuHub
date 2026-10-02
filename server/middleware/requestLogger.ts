// ============================================================
// Request Logger Middleware
// ============================================================
// Logs incoming HTTP requests with method, path, status code,
// and response time. Uses console.log for simplicity — can
// be swapped for a proper logger (e.g. pino, winston) later.
// ============================================================

import type { Request, Response, NextFunction } from "express";

export function requestLogger(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const startTime = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - startTime;
    const statusColor = res.statusCode >= 400 ? "\x1b[31m" : "\x1b[32m";
    const resetColor = "\x1b[0m";

    const safeMethod = req.method;
    const safeUrl = req.url;
    const safeStatus = res.statusCode;

    console.log(
      `${statusColor}${safeStatus}${resetColor} ` +
        `${safeMethod} ${safeUrl} — ${duration}ms`,
    );
  });

  next();
}
