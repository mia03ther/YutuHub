import type { Campus } from "./campus";

export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatar?: string;
  campusId: string;
  campus?: Campus;
  bio?: string;
  phone?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  role: UserRole;
  level: number;
  experience: number;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}

export type UserRole = "student" | "moderator" | "admin";

export interface CampusIdentity {
  studentId?: string;
  college?: string;
  major?: string;
  grade?: number;
  enrollmentYear?: number;
}

export interface AuthSession {
  user: AuthUser;
  expiresAt: number;
}

export interface AuthUser {
  id: number;
  email: string;
  phone: string | null;
  username: string;
  displayName: string;
  campusId: string;
  campusName: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export type AuthApiResponse<T> =
  | { ok: true; data: T }
  | {
      ok: false;
      error: {
        code: string;
        message: string;
        field?: string;
      };
    };

export interface Review {
  id: string;
  authorId: string;
  author?: User;
  targetType: ReviewTargetType;
  targetId: string;
  rating: number;
  title: string;
  content: string;
  tags: string[];
  images: string[];
  helpfulCount: number;
  replyCount: number;
  isAnonymous: boolean;
  status: ReviewStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type ReviewTargetType = "course" | "food" | "teacher" | "service" | "market";

export type ReviewStatus = "published" | "draft" | "hidden" | "deleted";

export interface Post {
  id: string;
  authorId: string;
  author?: User;
  type: PostType;
  title: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  images: string[];
  tags: string[];
  topicId?: string;
  campusId?: string;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  viewCount: number;
  isPinned: boolean;
  isFeatured: boolean;
  status: PostStatus;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

export type PostType = "discussion" | "question" | "announcement" | "event" | "market" | "lostfound";

export type PostStatus = "published" | "draft" | "hidden" | "deleted";

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  campusId: string;
  email: string;
  phone?: string;
  displayName: string;
  password: string;
  acceptedTerms: true;
}

export interface PhoneVerification {
  phone: string;
  code: string;
  type: "register" | "login" | "bind" | "reset";
}

export interface EmailVerification {
  email: string;
  code: string;
  type: "register" | "login" | "bind" | "reset";
}

export interface ResetPasswordData {
  email: string;
  code: string;
  newPassword: string;
}

export interface AuthError {
  code: string;
  message: string;
  field?: string;
}

export interface UserProfileTabs {
  reviews: Review[];
  favorites: Post[];
  likes: Post[];
  posts: Post[];
  marketItems: Post[];
}

export interface SecuritySettings {
  password: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  twoFactorEnabled: boolean;
  sessions: ActiveSession[];
}

export interface ActiveSession {
  id: string;
  device: string;
  ip: string;
  location?: string;
  lastActive: Date;
  isCurrent: boolean;
}

export const AUTH_COOKIE_NAME = "yutuhub_auth";
export const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;
