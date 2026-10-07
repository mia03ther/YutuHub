import { parseLoginCredentials } from "@/lib/auth-validation";
import { authError, authSuccess, readJsonBody } from "@/lib/auth/http";
import { setSession } from "@/lib/auth/session";
import { authenticateWithPassword } from "@/lib/auth/user-service";

export async function POST(request: Request) {
  const parsed = parseLoginCredentials(await readJsonBody(request));
  if (!parsed.valid) {
    return authError("VALIDATION_ERROR", parsed.message, 400, parsed.field);
  }

  try {
    const user = await authenticateWithPassword(
      parsed.data.email,
      parsed.data.password,
    );
    if (!user) {
      return authError("INVALID_CREDENTIALS", "邮箱或密码不正确", 401);
    }

    await setSession(user.id);
    return authSuccess({ user });
  } catch (error) {
    console.error("[auth/login]", error);
    return authError("INTERNAL_ERROR", "登录暂时失败，请稍后重试", 500);
  }
}
