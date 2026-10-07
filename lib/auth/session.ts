import "server-only";

import { randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";
import { AUTH_COOKIE_MAX_AGE, AUTH_COOKIE_NAME } from "@/lib/user-types";

const ISSUER = "yutuhub";
const AUDIENCE = "yutuhub-web";
const DEV_SESSION_SECRET =
  "yutuhub-development-session-secret-change-before-production";

export interface SessionPayload {
  userId: number;
}

function getSessionKey(): Uint8Array {
  const configuredSecret = process.env.SESSION_SECRET?.trim();
  if (configuredSecret && configuredSecret.length < 32) {
    throw new Error("SESSION_SECRET must contain at least 32 characters");
  }
  if (!configuredSecret && process.env.NODE_ENV === "production") {
    throw new Error("SESSION_SECRET is required in production");
  }
  return new TextEncoder().encode(configuredSecret || DEV_SESSION_SECRET);
}

export async function createSessionToken(userId: number): Promise<string> {
  return new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setSubject(String(userId))
    .setJti(randomUUID())
    .setIssuedAt()
    .setExpirationTime(`${AUTH_COOKIE_MAX_AGE}s`)
    .sign(getSessionKey());
}

export async function readSessionToken(
  token: string | undefined,
): Promise<SessionPayload | null> {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSessionKey(), {
      algorithms: ["HS256"],
      issuer: ISSUER,
      audience: AUDIENCE,
    });
    const userId = payload.userId;
    if (typeof userId !== "number" || !Number.isInteger(userId) || userId < 1) {
      return null;
    }
    return { userId };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  return readSessionToken(cookieStore.get(AUTH_COOKIE_NAME)?.value);
}

export async function setSession(userId: number): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, await createSessionToken(userId), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: AUTH_COOKIE_MAX_AGE,
  });
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}
