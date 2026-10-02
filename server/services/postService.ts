// ============================================================
// Post Service
// ============================================================
// Encapsulates business logic for querying and managing posts.
// Currently backed by in-memory mock data; will be replaced by
// MySQL queries via the database utility in a future phase.
// ============================================================

import type { Post, PostsQuery, PaginatedResult } from "../types";
import { mockPosts } from "../utils/mockData";

/**
 * Apply filters and sorting to the mock post list.
 * In future this delegates to a SQL query.
 */
export function listPosts(query: PostsQuery): PaginatedResult<Post> {
  const {
    category,
    search,
    sort = "recommended",
    page = 1,
    limit = 20,
    user_id,
  } = query;

  const pageNum = Math.max(1, page);
  const limitNum = Math.max(1, Math.min(100, limit));

  let result = mockPosts.filter((post) => post.status === 1);

  // Filter by category name
  if (category && category !== "全部") {
    result = result.filter((post) => {
      // Will join with categories table in production
      const categoryMap: Record<string, number> = {
        技术: 1,
        AI: 2,
        设计: 3,
        学习: 4,
        求职: 5,
        二手: 6,
        校园: 7,
      };
      return post.category_id === categoryMap[category];
    });
  }

  // Filter by search keyword
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.content.toLowerCase().includes(q),
    );
  }

  // Filter by user
  if (user_id) {
    result = result.filter((post) => post.user_id === user_id);
  }

  // Sort
  switch (sort) {
    case "latest":
      result = [...result].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
      break;
    case "oldest":
      result = [...result].sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      );
      break;
    case "most_liked":
      result = [...result].sort((a, b) => b.like_count - a.like_count);
      break;
    case "recommended":
    default:
      // "recommended" = highest engagement first
      result = [...result].sort((a, b) => {
        const scoreA = a.like_count * 2 + a.favorite_count + a.views;
        const scoreB = b.like_count * 2 + b.favorite_count + b.views;
        return scoreB - scoreA;
      });
      break;
  }

  const total = result.length;
  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = startIndex + limitNum;
  const items = result.slice(startIndex, endIndex);

  return {
    items,
    total,
    page: pageNum,
    limit: limitNum,
    hasMore: endIndex < total,
  };
}

/**
 * Retrieve a single post by ID.
 * Returns null if the post does not exist or is deleted.
 */
export function getPostById(id: number): Post | null {
  return mockPosts.find((post) => post.id === id && post.status === 1) ?? null;
}

/**
 * Create a new post.
 * Stubbed — will persist to MySQL in a future phase.
 */
export function createPost(input: {
  user_id: number;
  category_id: number;
  title: string;
  content: string;
  images?: string[];
  price?: string | null;
  is_anonymous?: boolean;
}): Post {
  const newPost: Post = {
    id: mockPosts.length + 1,
    user_id: input.user_id,
    category_id: input.category_id,
    title: input.title,
    content: input.content,
    images: input.images ?? [],
    price: input.price ?? null,
    is_anonymous: input.is_anonymous ? 1 : 0,
    status: 1,
    views: 0,
    like_count: 0,
    favorite_count: 0,
    comment_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  // TODO: Insert into MySQL
  mockPosts.push(newPost);
  return newPost;
}
