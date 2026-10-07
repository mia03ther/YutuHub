import { authError, authSuccess } from "@/lib/auth/http";
import { getCurrentUser } from "@/lib/auth/user-service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return authError("UNAUTHENTICATED", "尚未登录", 401);
    }
    return authSuccess({ user });
  } catch (error) {
    console.error("[auth/me]", error);
    return authError("INTERNAL_ERROR", "暂时无法读取账户信息", 500);
  }
}
