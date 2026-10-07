import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "注册 · 屿途知汇 YuTuHub",
  description: "使用学校身份加入屿途知汇。",
};

export default function RegisterPage() {
  return (
    <AuthShell
      eyebrow="Join the campus"
      title="从真实校园身份开始。"
      description="一次完成学校、邮箱、手机和账号资料设置，为后续可信校园社区打好基础。"
    >
      <RegisterForm />
    </AuthShell>
  );
}
