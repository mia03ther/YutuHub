import "server-only";

import { NextResponse } from "next/server";
import type { AuthApiResponse } from "@/lib/user-types";

export function authSuccess<T>(data: T, status = 200): NextResponse<AuthApiResponse<T>> {
  return NextResponse.json(
    { ok: true, data },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}

export function authError(
  code: string,
  message: string,
  status: number,
  field?: string,
): NextResponse<AuthApiResponse<never>> {
  return NextResponse.json(
    { ok: false, error: { code, message, ...(field ? { field } : {}) } },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}

export async function readJsonBody(request: Request): Promise<unknown | null> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}
