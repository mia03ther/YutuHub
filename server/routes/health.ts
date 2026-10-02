// ============================================================
// Health Check Route
// ============================================================
// Returns the current status of the API server so load balancers
// and monitoring tools can verify availability.
// ============================================================

import { Router } from "express";
import { sendSuccess } from "../utils/response";

const router = Router();

router.get("/health", (_req, res) => {
  res.json(
    sendSuccess(
      {
        status: "ok",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      },
      "Service is healthy",
    ),
  );
});

export default router;
