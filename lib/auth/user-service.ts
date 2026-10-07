import "server-only";

import { randomBytes } from "node:crypto";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/server/utils/prisma";
import { getCampusById } from "@/lib/campus";
import type { AuthUser, RegisterData } from "@/lib/user-types";
import { getSession } from "./session";
import { hashPassword, verifyPassword } from "./password";

const authUserSelect = {
  id: true,
  email: true,
  phone: true,
  username: true,
  displayName: true,
  campusId: true,
  emailVerified: true,
  phoneVerified: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.UserSelect;

type AuthUserRecord = Prisma.UserGetPayload<{ select: typeof authUserSelect }>;

export function toAuthUser(record: AuthUserRecord): AuthUser {
  return {
    ...record,
    campusName: getCampusById(record.campusId)?.name ?? record.campusId,
    createdAt: record.createdAt.toISOString(),
    updatedAt: record.updatedAt.toISOString(),
  };
}

function createUsername(email: string): string {
  const localPart = email.split("@")[0]?.toLowerCase() ?? "user";
  const safePrefix = localPart.replace(/[^a-z0-9_]/g, "").slice(0, 18) || "user";
  return `${safePrefix}_${randomBytes(4).toString("hex")}`;
}

export async function createUserAccount(input: RegisterData): Promise<AuthUser> {
  const normalizedEmail = input.email.trim().toLowerCase();
  const passwordHash = await hashPassword(input.password);
  const record = await prisma.user.create({
    data: {
      email: normalizedEmail,
      phone: input.phone || null,
      username: createUsername(normalizedEmail),
      displayName: input.displayName.trim(),
      passwordHash,
      campusId: input.campusId,
      emailVerified: false,
      phoneVerified: false,
      termsAcceptedAt: new Date(),
    },
    select: authUserSelect,
  });
  return toAuthUser(record);
}

export async function authenticateWithPassword(
  email: string,
  password: string,
): Promise<AuthUser | null> {
  const record = await prisma.user.findUnique({
    where: { email: email.trim().toLowerCase() },
    select: { ...authUserSelect, passwordHash: true },
  });
  if (!record || !(await verifyPassword(password, record.passwordHash))) {
    return null;
  }

  const updated = await prisma.user.update({
    where: { id: record.id },
    data: { lastLoginAt: new Date() },
    select: authUserSelect,
  });
  return toAuthUser(updated);
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const session = await getSession();
  if (!session) return null;

  const record = await prisma.user.findUnique({
    where: { id: session.userId },
    select: authUserSelect,
  });
  return record ? toAuthUser(record) : null;
}
