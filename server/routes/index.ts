// ============================================================
// Route Registration
// ============================================================
// Mounts all API route modules onto the Express router.
// Each feature area gets its own router file under routes/.
// ============================================================

import { Router } from "express";
import healthRouter from "./health";
import postsRouter from "./posts";

const apiRouter = Router();

// GET /api/health — server health check
apiRouter.use("/", healthRouter);

// GET /api/posts, GET /api/posts/:id, POST /api/posts, etc.
apiRouter.use("/", postsRouter);

export default apiRouter;
