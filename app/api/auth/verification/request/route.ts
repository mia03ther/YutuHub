import {
  normalizePhone,
  validateCampusEmail,
  validateChinaPhone,
} from "@/lib/auth-validation";
import { authError, authSuccess, readJsonBody } from "@/lib/auth/http";
import {
  verificationProvider,
  type VerificationChannel,
  type VerificationPurpose,
} from "@/lib/auth/verification-provider";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function POST(request: Request) {
  const body = await readJsonBody(request);
  if (!isRecord(body)) {
    return authError("VALIDATION_ERROR", "请求格式不正确", 400);
  }

  const channel = body.channel as VerificationChannel;
  const purpose = body.purpose as VerificationPurpose;
  const rawTarget = typeof body.target === "string" ? body.target : "";
  if (!(["email", "phone"] as const).includes(channel)) {
    return authError("VALIDATION_ERROR", "不支持的验证方式", 400, "channel");
  }
  if (!(["register", "login", "reset"] as const).includes(purpose)) {
    return authError("VALIDATION_ERROR", "不支持的验证用途", 400, "purpose");
  }

  const validation =
    channel === "email"
      ? validateCampusEmail(rawTarget)
      : validateChinaPhone(rawTarget);
  if (!validation.valid) {
    return authError("VALIDATION_ERROR", validation.message, 400, "target");
  }

  const target = channel === "phone" ? normalizePhone(rawTarget) : rawTarget.trim().toLowerCase();
  const result = await verificationProvider.requestCode({ channel, target, purpose });
  if (!result.ok) {
    return authError(result.code, result.message, 503);
  }
  return authSuccess({ requested: true });
}
