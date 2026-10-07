import { Prisma } from "@prisma/client";
import { parseRegisterData } from "@/lib/auth-validation";
import { authError, authSuccess, readJsonBody } from "@/lib/auth/http";
import { setSession } from "@/lib/auth/session";
import { createUserAccount } from "@/lib/auth/user-service";

export async function POST(request: Request) {
  const parsed = parseRegisterData(await readJsonBody(request));
  if (!parsed.valid) {
    return authError("VALIDATION_ERROR", parsed.message, 400, parsed.field);
  }

  try {
    const user = await createUserAccount(parsed.data);
    await setSession(user.id);
    return authSuccess(
      {
        user,
        verification: {
          email: "pending" as const,
          phone: user.phone ? ("pending" as const) : ("not_provided" as const),
        },
      },
      201,
    );
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return authError("EMAIL_ALREADY_REGISTERED", "该学校邮箱已经注册", 409, "email");
    }
    console.error("[auth/register]", error);
    return authError("INTERNAL_ERROR", "注册暂时失败，请稍后重试", 500);
  }
}
