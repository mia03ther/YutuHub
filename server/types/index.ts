// ============================================================
// YutuHub API — Shared TypeScript Types
// ============================================================
// These interfaces mirror the database schema (database/schema.sql)
// and are used by both the API server and the Next.js frontend.
// ============================================================

/**
 * User account information.
 */
export interface User {
  user_id: number;
  nickname: string;
  avatar: string | null;
  anonymous_name: string | null;
  phone: string | null;
  email: string | null;
  role: number;
  is_verified: number;
  status: number;
  created_at: string;
  updated_at: string;
}

/**
 * Post category (e.g. 二手, 技术, AI, 设计, 学习, 求职, 校园).
 */
export interface Category {
  id: number;
  name: string;
  description: string | null;
  icon: string | null;
  parent_id: number | null;
  sort_order: number;
  is_active: number;
  created_at: string;
}

/**
 * A post represents a listing — either a product (second-hand,
 * textbook, digital goods) or a service (skill exchange).
 */
export interface Post {
  id: number;
  user_id: number;
  category_id: number;
  title: string;
  content: string;
  images: string[];
  price: string | null;
  is_anonymous: number;
  status: number;
  views: number;
  like_count: number;
  favorite_count: number;
  comment_count: number;
  created_at: string;
  updated_at: string;
}

/**
 * Nested comment on a post.
 */
export interface Comment {
  id: number;
  post_id: number;
  user_id: number;
  parent_id: number | null;
  content: string;
  status: number;
  created_at: string;
}

/**
 * Like / up-vote on a post.
 */
export interface Like {
  id: number;
  user_id: number;
  post_id: number;
  created_at: string;
}

/**
 * Favorite / bookmark on a post.
 */
export interface Favorite {
  id: number;
  user_id: number;
  post_id: number;
  created_at: string;
}

/**
 * Content or user report submitted by a user.
 */
export interface Report {
  id: number;
  reporter_id: number;
  target_type: number;
  target_id: number;
  reason: string;
  status: number;
  resolution: string | null;
  resolved_by: number | null;
  resolved_at: string | null;
  created_at: string;
}

/**
 * Achievement definition (e.g. "First Post", "100 Likes").
 */
export interface Achievement {
  id: number;
  code: string;
  name: string;
  description: string | null;
  icon: string | null;
  criteria: string;
  points: number;
  tier: number;
  is_active: number;
  created_at: string;
}

/**
 * Junction table — which user earned which achievement and when.
 */
export interface UserAchievement {
  id: number;
  user_id: number;
  achievement_id: number;
  earned_at: string;
}

/**
 * Standard JSON API response wrapper.
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  code?: number;
}

/**
 * Query parameters accepted by GET /api/posts.
 */
export interface PostsQuery {
  category?: string;
  search?: string;
  sort?: "recommended" | "latest" | "oldest" | "most_liked";
  page?: number;
  limit?: number;
  user_id?: number;
}

/**
 * Paginated response for list endpoints.
 */
export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
