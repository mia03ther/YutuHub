// ============================================================
// Posts Routes
// ============================================================
// RESTful endpoints for browsing and managing posts.
// All mutating endpoints are stubbed — they return success
// but note that persistence is not yet implemented.
// ============================================================

import { Router } from "express";
import { z } from "zod";
import { listPosts, getPostById, createPost } from "../services/postService";
import { sendSuccess, sendError } from "../utils/response";
import type { PostsQuery, Post } from "../types";

const router = Router();

/**
 * GET /api/posts
 * List posts with optional filtering, sorting, and pagination.
 *
 * Query params:
 *   category  — category name (e.g. "技术", "AI")
 *   search    — keyword search in title / content
 *   sort      — "recommended" | "latest" | "oldest" | "most_liked"
 *   page      — page number (default 1)
 *   limit     — items per page (default 20, max 100)
 *   user_id   — filter by author
 */
router.get("/posts", (req, res) => {
  const query: PostsQuery = {
    category: req.query.category as string | undefined,
    search: req.query.search as string | undefined,
    sort: (req.query.sort as PostsQuery["sort"]) ?? "recommended",
    page: req.query.page ? Number(req.query.page) : undefined,
    limit: req.query.limit ? Number(req.query.limit) : undefined,
    user_id: req.query.user_id ? Number(req.query.user_id) : undefined,
  };

  try {
    const result = listPosts(query);
    res.json(sendSuccess(result, "Posts retrieved"));
  } catch {
    res.status(500).json(sendError("Failed to retrieve posts"));
  }
});

/**
 * GET /api/posts/:id
 * Retrieve a single post by its ID.
 */
router.get("/posts/:id", (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).json(sendError("Invalid post ID"));
    return;
  }

  const post = getPostById(id);

  if (!post) {
    res.status(404).json(sendError("Post not found"));
    return;
  }

  res.json(sendSuccess(post, "Post retrieved"));
});

/**
 * POST /api/posts
 * Create a new post.
 *
 * TODO: Add authentication and input validation.
 * Currently accepts the same shape as the Post model minus
 * server-generated fields and returns the created post.
 */
const createPostSchema = z.object({
  user_id: z.number().int().positive(),
  category_id: z.number().int().positive(),
  title: z.string().min(1).max(200),
  content: z.string().min(1),
  images: z.array(z.string().url()).optional(),
  price: z.string().nullable().optional(),
  is_anonymous: z.boolean().optional(),
});

router.post("/posts", (req, res) => {
  const parsed = createPostSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json(sendError("Invalid request body"));
    return;
  }

  try {
    const post: Post = createPost({
      user_id: parsed.data.user_id,
      category_id: parsed.data.category_id,
      title: parsed.data.title,
      content: parsed.data.content,
      images: parsed.data.images,
      price: parsed.data.price,
      is_anonymous: parsed.data.is_anonymous,
    });

    res.status(201).json(sendSuccess(post, "Post created"));
  } catch {
    res.status(500).json(sendError("Failed to create post"));
  }
});

/**
 * POST /api/posts/:id/like
 * Like (or toggle like on) a post.
 *
 * TODO: Implement actual like toggling with real user identity.
 */
router.post("/posts/:id/like", (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).json(sendError("Invalid post ID"));
    return;
  }

  const post = getPostById(id);

  if (!post) {
    res.status(404).json(sendError("Post not found"));
    return;
  }

  // TODO: Persist like to database
  res.json(sendSuccess({ message: "Post liked" }, "Liked"));
});

/**
 * POST /api/posts/:id/favorite
 * Add a post to the current user's favorites.
 *
 * TODO: Implement actual favorite persistence with real user identity.
 */
router.post("/posts/:id/favorite", (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).json(sendError("Invalid post ID"));
    return;
  }

  const post = getPostById(id);

  if (!post) {
    res.status(404).json(sendError("Post not found"));
    return;
  }

  // TODO: Persist favorite to database
  res.json(sendSuccess({ message: "Post favorited" }, "Favorited"));
});

/**
 * POST /api/posts/:id/report
 * Submit a report for a post.
 *
 * TODO: Implement actual report submission with real user identity
 * and store the report reason in the database.
 */
const reportSchema = z.object({
  reason: z.string().min(1).max(500),
});

router.post("/posts/:id/report", (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).json(sendError("Invalid post ID"));
    return;
  }

  const post = getPostById(id);

  if (!post) {
    res.status(404).json(sendError("Post not found"));
    return;
  }

  const parsed = reportSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json(sendError("Invalid request body"));
    return;
  }

  // TODO: Persist report to database
  res.status(201).json(
    sendSuccess(
      { post_id: id, reason: parsed.data.reason },
      "Report submitted",
    ),
  );
});

export default router;
