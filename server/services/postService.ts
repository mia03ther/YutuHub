// ============================================================
// Post Service
// ============================================================
// Encapsulates business logic for querying and managing posts.
// Backed by Prisma (SQLite) through the shared PrismaClient
// singleton in utils/prisma.
// ============================================================

import type { Post as PostRow } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { prisma } from "../utils/prisma";
import type { Post, PostsQuery, PaginatedResult } from "../types";

/**
 * Only posts with this status are publicly visible.
 * 0 = pending, 1 = active, 2 = deleted, 3 = taken down.
 */
const ACTIVE_STATUS = 1;

/**
 * Category name → category_id lookup.
 * A Category table is not modelled yet; the legacy mapping is kept
 * until the query can join against real category records.
 */
const CATEGORY_MAP: Record<string, number> = {
  技术: 1,
  AI: 2,
  设计: 3,
  学习: 4,
  求职: 5,
  二手: 6,
  校园: 7,
};

/**
 * Normalised filters shared by the typed and the raw query paths.
 */
interface PostFilters {
  search?: string;
  categoryId?: number;
  userId?: number;
}

/**
 * Parse the JSON-encoded image list, tolerating malformed rows.
 */
function parseImages(raw: string): string[] {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === "string");
  } catch {
    return [];
  }
}

/**
 * Map a database row onto the public Post DTO.
 */
function toPostDTO(row: PostRow): Post {
  return {
    id: row.id,
    user_id: row.userId,
    category_id: row.categoryId,
    title: row.title,
    content: row.content,
    images: parseImages(row.images),
    price: row.price,
    is_anonymous: row.isAnonymous,
    status: row.status,
    views: row.views,
    like_count: row.likeCount,
    favorite_count: row.favoriteCount,
    comment_count: row.commentCount,
    created_at: row.createdAt.toISOString(),
    updated_at: row.updatedAt.toISOString(),
  };
}

/**
 * Build the typed Prisma filter from the normalised filters.
 */
function buildWhere(filters: PostFilters): Prisma.PostWhereInput {
  const where: Prisma.PostWhereInput = { status: ACTIVE_STATUS };

  if (filters.search) {
    where.OR = [
      { title: { contains: filters.search } },
      { content: { contains: filters.search } },
    ];
  }
  if (filters.categoryId !== undefined) {
    where.categoryId = filters.categoryId;
  }
  if (filters.userId !== undefined) {
    where.userId = filters.userId;
  }

  return where;
}

/**
 * Same filters as buildWhere, expressed as a SQL fragment for the
 * "recommended" ranking, which needs a computed ORDER BY expression.
 */
function buildWhereSql(filters: PostFilters): Prisma.Sql {
  const parts: Prisma.Sql[] = [Prisma.sql`"status" = ${ACTIVE_STATUS}`];

  if (filters.search) {
    const pattern = `%${filters.search}%`;
    parts.push(
      Prisma.sql`("title" LIKE ${pattern} OR "content" LIKE ${pattern})`,
    );
  }
  if (filters.categoryId !== undefined) {
    parts.push(Prisma.sql`"categoryId" = ${filters.categoryId}`);
  }
  if (filters.userId !== undefined) {
    parts.push(Prisma.sql`"userId" = ${filters.userId}`);
  }

  return Prisma.join(parts, " AND ");
}

/**
 * "recommended" = highest engagement first (likes weigh double),
 * matching the ranking the mock implementation used.
 */
async function findRecommended(
  filters: PostFilters,
  skip: number,
  take: number,
): Promise<PostRow[]> {
  const whereSql = buildWhereSql(filters);

  return prisma.$queryRaw<PostRow[]>(Prisma.sql`
    SELECT * FROM "Post"
    WHERE ${whereSql}
    ORDER BY ("likeCount" * 2 + "favoriteCount" + "views") DESC, "id" DESC
    LIMIT ${take} OFFSET ${skip}
  `);
}

/**
 * Apply filters and sorting to the post list, backed by SQLite.
 */
export async function listPosts(
  query: PostsQuery,
): Promise<PaginatedResult<Post>> {
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
  const skip = (pageNum - 1) * limitNum;

  const filters: PostFilters = {
    search: search || undefined,
    categoryId:
      category && category !== "全部" ? CATEGORY_MAP[category] : undefined,
    userId: user_id,
  };

  const total = await prisma.post.count({ where: buildWhere(filters) });

  const rows =
    sort === "recommended"
      ? await findRecommended(filters, skip, limitNum)
      : await prisma.post.findMany({
          where: buildWhere(filters),
          orderBy:
            sort === "oldest"
              ? { createdAt: "asc" }
              : sort === "latest"
                ? { createdAt: "desc" }
                : { likeCount: "desc" },
          skip,
          take: limitNum,
        });

  return {
    items: rows.map(toPostDTO),
    total,
    page: pageNum,
    limit: limitNum,
    hasMore: skip + rows.length < total,
  };
}

/**
 * Retrieve a single post by ID.
 * Returns null if the post does not exist or is not publicly visible.
 */
export async function getPostById(id: number): Promise<Post | null> {
  const row = await prisma.post.findFirst({
    where: { id, status: ACTIVE_STATUS },
  });
  return row ? toPostDTO(row) : null;
}

/**
 * Create a new post.
 */
export async function createPost(input: {
  user_id: number;
  category_id: number;
  title: string;
  content: string;
  images?: string[];
  price?: string | null;
  is_anonymous?: boolean;
}): Promise<Post> {
  const row = await prisma.post.create({
    data: {
      userId: input.user_id,
      categoryId: input.category_id,
      title: input.title,
      content: input.content,
      images: JSON.stringify(input.images ?? []),
      price: input.price ?? null,
      isAnonymous: input.is_anonymous ? 1 : 0,
      status: ACTIVE_STATUS,
    },
  });

  return toPostDTO(row);
}