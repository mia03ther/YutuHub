"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  MessageSquareText,
  Smartphone,
} from "lucide-react";
import { AgreementField } from "./agreement-field";
import {
  normalizePhone,
  validateCampusEmail,
  validateChinaPhone,
  validatePassword,
} from "@/lib/auth-validation";
import type { AuthApiResponse, AuthUser } from "@/lib/user-types";

type LoginMode = "password" | "code";
type CodeTarget = "email" | "phone";
type Notice = { tone: "error" | "info"; message: string } | null;

const inputClass =
  "h-12 w-full rounded-xl border border-white/[0.12] bg-white/[0.045] px-4 text-sm text-[#f5f5f5] outline-none transition placeholder:text-[#5f5f64] focus:border-[#b7ff3c]/60 focus:ring-2 focus:ring-[#b7ff3c]/10 disabled:cursor-not-allowed disabled:opacity-50";

export function LoginForm({ callbackUrl = "/profile" }: { callbackUrl?: string }) {
  const router = useRouter();
  const [mode, setMode] = useState<LoginMode>("password");
  const [codeTarget, setCodeTarget] = useState<CodeTarget>("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [pendingAction, setPendingAction] = useState<"submit" | "code" | null>(null);
  const [notice, setNotice] = useState<Notice>(null);

  function requireAgreement(): boolean {
    if (agreed) return true;
    setNotice({ tone: "error", message: "请先阅读并同意服务协议和隐私政策" });
    return false;
  }

  function validateIdentity(): string | null {
    const result = codeTarget === "email" ? validateCampusEmail(email) : validateChinaPhone(phone);
    return result.valid ? null : result.message;
  }

  async function handleRequestCode() {
    setNotice(null);
    if (!requireAgreement()) return;
    const identityError = validateIdentity();
    if (identityError) {
      setNotice({ tone: "error", message: identityError });
      return;
    }

    setPendingAction("code");
    try {
      const response = await fetch("/api/auth/verification/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channel: codeTarget,
          target: codeTarget === "email" ? email : phone,
          purpose: "login",
        }),
      });
      const result = (await response.json()) as AuthApiResponse<{ requested: true }>;
      if (!result.ok) {
        setNotice({
          tone: result.error.code === "VERIFICATION_PROVIDER_UNAVAILABLE" ? "info" : "error",
          message: result.error.message,
        });
        return;
      }
      setNotice({ tone: "info", message: "验证码请求已提交" });
    } catch {
      setNotice({ tone: "error", message: "暂时无法连接认证服务，请稍后重试" });
    } finally {
      setPendingAction(null);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(null);
    if (!requireAgreement()) return;

    if (mode === "password") {
      const emailResult = validateCampusEmail(email);
      if (!emailResult.valid) {
        setNotice({ tone: "error", message: emailResult.message });
        return;
      }
      const passwordResult = validatePassword(password);
      if (!passwordResult.valid) {
        setNotice({ tone: "error", message: passwordResult.message });
        return;
      }
    } else {
      const identityError = validateIdentity();
      if (identityError) {
        setNotice({ tone: "error", message: identityError });
        return;
      }
      setNotice({
        tone: "info",
        message: "验证码登录暂未开放；验证 provider 配置完成后才会启用。",
      });
      return;
    }

    setPendingAction("submit");
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, acceptedTerms: agreed }),
      });
      const result = (await response.json()) as AuthApiResponse<{ user: AuthUser }>;
      if (!result.ok) {
        setNotice({ tone: "error", message: result.error.message });
        return;
      }
      router.push(callbackUrl);
      router.refresh();
    } catch {
      setNotice({ tone: "error", message: "暂时无法连接认证服务，请稍后重试" });
    } finally {
      setPendingAction(null);
    }
  }

  function changeMode(nextMode: LoginMode) {
    setMode(nextMode);
    setNotice(null);
    setCode("");
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="flex rounded-full border border-white/[0.10] bg-black/20 p-1" role="tablist">
        {([
          ["password", "密码登录", LockKeyhole],
          ["code", "验证码快捷登录", MessageSquareText],
        ] as const).map(([value, label, Icon]) => (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={mode === value}
            onClick={() => changeMode(value)}
            className={`flex h-10 flex-1 items-center justify-center gap-2 rounded-full text-sm transition ${
              mode === value
                ? "bg-[#f5f5f5] font-medium text-[#080808]"
                : "text-[#8a8a8a] hover:text-[#f5f5f5]"
            }`}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-7 space-y-5" noValidate>
        {mode === "password" ? (
          <>
            <Field label="学校邮箱" icon={<Mail size={16} />}>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="name@gdufs.edu.cn"
                autoComplete="email"
                disabled={pendingAction !== null}
                className={inputClass}
              />
            </Field>

            <Field
              label="密码"
              action={
                <button
                  type="button"
                  onClick={() =>
                    setNotice({
                      tone: "info",
                      message: "密码找回接口将在下一阶段接入，当前没有发送重置邮件。",
                    })
                  }
                  className="text-xs text-[#b7ff3c] hover:underline"
                >
                  忘记密码？
                </button>
              }
              icon={<LockKeyhole size={16} />}
            >
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="至少 8 位，包含字母和数字"
                  autoComplete="current-password"
                  disabled={pendingAction !== null}
                  className={`${inputClass} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#74747a] transition hover:text-[#f5f5f5]"
                  aria-label={showPassword ? "隐藏密码" : "显示密码"}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </Field>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-2">
              {([
                ["email", "学校邮箱", Mail],
                ["phone", "+86 手机号", Smartphone],
              ] as const).map(([value, label, Icon]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setCodeTarget(value);
                    setCode("");
                    setNotice(null);
                  }}
                  className={`flex h-11 items-center justify-center gap-2 rounded-xl border text-sm transition ${
                    codeTarget === value
                      ? "border-[#b7ff3c]/60 bg-[#b7ff3c]/[0.08] text-[#f5f5f5]"
                      : "border-white/[0.10] text-[#77777d] hover:border-white/20 hover:text-[#f5f5f5]"
                  }`}
                >
                  <Icon size={15} />
                  {label}
                </button>
              ))}
            </div>

            <Field
              label={codeTarget === "email" ? "学校邮箱" : "+86 手机号"}
              icon={codeTarget === "email" ? <Mail size={16} /> : <Smartphone size={16} />}
            >
              <div className="relative flex items-center">
                {codeTarget === "phone" && <span className="absolute left-4 text-sm text-[#9a9a9f]">+86</span>}
                <input
                  type={codeTarget === "email" ? "email" : "tel"}
                  value={codeTarget === "email" ? email : phone}
                  onChange={(event) =>
                    codeTarget === "email"
                      ? setEmail(event.target.value)
                      : setPhone(normalizePhone(event.target.value))
                  }
                  placeholder={codeTarget === "email" ? "name@gdufs.edu.cn" : "138 0000 0000"}
                  autoComplete={codeTarget === "email" ? "email" : "tel"}
                  disabled={pendingAction !== null}
                  className={`${inputClass} ${codeTarget === "phone" ? "pl-14" : ""}`}
                />
              </div>
            </Field>

            <Field label="验证码" icon={<MessageSquareText size={16} />}>
              <div className="flex gap-2">
                <input
                  type="text"
                  inputMode="numeric"
                  value={code}
                  onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="6 位数字"
                  autoComplete="one-time-code"
                  disabled={pendingAction !== null}
                  className={`${inputClass} min-w-0 flex-1 tracking-[0.3em]`}
                />
                <button
                  type="button"
                  onClick={handleRequestCode}
                  disabled={pendingAction !== null}
                  className="w-28 shrink-0 rounded-xl border border-white/[0.14] text-sm text-[#f5f5f5] transition hover:border-[#b7ff3c]/60 hover:text-[#b7ff3c] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {pendingAction === "code" ? <Loader2 className="mx-auto animate-spin" size={17} /> : "获取验证码"}
                </button>
              </div>
            </Field>
          </>
        )}

        <AgreementField checked={agreed} onChange={setAgreed} disabled={pendingAction !== null} />
        {notice && <NoticeBox notice={notice} />}

        <button
          type="submit"
          disabled={pendingAction !== null}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#b7ff3c] text-sm font-semibold text-[#080808] transition hover:bg-[#c3ff5d] disabled:cursor-not-allowed disabled:opacity-55"
        >
          {pendingAction === "submit" && <Loader2 size={17} className="animate-spin" />}
          {mode === "password" ? "登录" : "验证并登录"}
        </button>
      </form>

      <p className="mt-7 text-center text-sm text-[#77777d]">
        第一次来到屿途？
        <Link href="/register" className="ml-2 font-medium text-[#f5f5f5] hover:text-[#b7ff3c]">创建账号</Link>
      </p>
    </div>
  );
}

function Field({ label, icon, action, children }: {
  label: string;
  icon: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center justify-between text-sm text-[#b7b7bb]">
        <span className="flex items-center gap-2">{icon}{label}</span>
        {action}
      </span>
      {children}
    </label>
  );
}

function NoticeBox({ notice }: { notice: Exclude<Notice, null> }) {
  const Icon = notice.tone === "error" ? AlertCircle : CheckCircle2;
  return (
    <div
      role={notice.tone === "error" ? "alert" : "status"}
      className={`flex items-start gap-2.5 rounded-xl border px-3.5 py-3 text-sm leading-5 ${
        notice.tone === "error"
          ? "border-red-400/20 bg-red-400/[0.07] text-red-200"
          : "border-[#b7ff3c]/20 bg-[#b7ff3c]/[0.06] text-[#c9dca9]"
      }`}
    >
      <Icon size={16} className="mt-0.5 shrink-0" />
      <span>{notice.message}</span>
    </div>
  );
}
