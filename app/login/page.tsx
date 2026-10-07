import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "登录 · 屿途知汇 YuTuHub",
  description: "登录屿途知汇，连接真实、可信的校园信息。",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string | string[] }>;
}) {
  const requestedCallback = (await searchParams).callbackUrl;
  const callbackUrl =
    typeof requestedCallback === "string" &&
    requestedCallback.startsWith("/") &&
    !requestedCallback.startsWith("//")
      ? requestedCallback
      : "/profile";

  return (
    <AuthShell
      eyebrow="Welcome back"
      title="回到你的校园信息流。"
      description="使用学校邮箱和密码，或通过邮箱、手机号验证码快捷登录。"
    >
      <LoginForm callbackUrl={callbackUrl} />
    </AuthShell>
  );
}
