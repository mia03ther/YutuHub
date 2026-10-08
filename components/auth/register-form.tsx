"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  GraduationCap,
  Loader2,
  Mail,
  MessageSquareText,
  Smartphone,
  UserRound,
} from "lucide-react";
import { AgreementField } from "./agreement-field";
import { CAMPUS_LIST, getCampusById, getCampusEmailHint } from "@/lib/campus";
import {
  normalizePhone,
  validateCampusEmail,
  validateChinaPhone,
  validateNickname,
  validatePassword,
} from "@/lib/auth-validation";
import type { AuthApiResponse, AuthUser } from "@/lib/user-types";

type Notice = { tone: "error" | "info"; message: string } | null;

const STEPS = ["选择学校", "学校邮箱", "邮箱验证", "手机验证", "设置账号", "完成"];
const inputClass =
  "h-12 w-full rounded-sm border border-white/[0.16] bg-white/[0.035] px-4 text-sm text-[#f5f5f5] outline-none transition placeholder:text-[#5f5f64] focus:border-[#002FA7]/70 focus:ring-2 focus:ring-[#002FA7]/10 disabled:cursor-not-allowed disabled:opacity-50";

export function RegisterForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [campusId, setCampusId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState<"email" | "phone" | "submit" | null>(null);
  const [notice, setNotice] = useState<Notice>(null);
  const [registeredUser, setRegisteredUser] = useState<AuthUser | null>(null);

  const campus = campusId ? getCampusById(campusId) : undefined;

  function fail(message: string) {
    setNotice({ tone: "error", message });
  }

  function requireAgreement(): boolean {
    if (agreed) return true;
    fail("请先阅读并同意服务协议和隐私政策");
    return false;
  }

  async function requestCode(kind: "email" | "phone") {
    setNotice(null);
    if (!requireAgreement()) return;
    const result = kind === "email" ? validateCampusEmail(email, campusId ?? "") : validateChinaPhone(phone);
    if (!result.valid) {
      fail(result.message);
      return;
    }
    setPending(kind);
    try {
      const response = await fetch("/api/auth/verification/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channel: kind,
          target: kind === "email" ? email : phone,
          purpose: "register",
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
      fail("暂时无法连接认证服务，请稍后重试");
    } finally {
      setPending(null);
    }
  }

  async function handleNext() {
    setNotice(null);
    if (!requireAgreement()) return;

    if (step === 0) {
      if (!campus) return fail("请选择一所已开放的学校");
      if (!campus.isEnabled) return fail(`${campus.name}尚未开放`);
    }

    if (step === 1) {
      const result = validateCampusEmail(email, campusId ?? "");
      if (!result.valid) return fail(result.message);
    }

    if (step === 2) {
      setNotice({ tone: "info", message: "邮箱验证服务尚未配置，将以“待验证”状态继续。" });
    }

    if (step === 3) {
      if (phone) {
        const phoneResult = validateChinaPhone(phone);
        if (!phoneResult.valid) return fail(phoneResult.message);
      }
    }

    if (step === 4) {
      const nicknameResult = validateNickname(nickname);
      if (!nicknameResult.valid) return fail(nicknameResult.message);
      const passwordResult = validatePassword(password);
      if (!passwordResult.valid) return fail(passwordResult.message);
      if (password !== confirmPassword) return fail("两次输入的密码不一致");

      if (!campusId) return fail("学校信息缺失，请返回重新选择");

      setPending("submit");
      try {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            campusId,
            email,
            phone: phone || undefined,
            displayName: nickname,
            password,
            acceptedTerms: agreed,
          }),
        });
        const result = (await response.json()) as AuthApiResponse<{
          user: AuthUser;
          verification: { email: "pending"; phone: "pending" | "not_provided" };
        }>;
        if (!result.ok) {
          fail(result.error.message);
          return;
        }
        setRegisteredUser(result.data.user);
        setStep(5);
        router.refresh();
        return;
      } catch {
        fail("暂时无法连接认证服务，请稍后重试");
        return;
      } finally {
        setPending(null);
      }
    }

    setStep((current) => Math.min(current + 1, STEPS.length - 1));
  }

  function handleBack() {
    setNotice(null);
    setStep((current) => Math.max(current - 1, 0));
  }

  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between text-xs text-[#6f6f74]">
          <span>STEP {Math.min(step + 1, STEPS.length)} / {STEPS.length}</span>
          <span className="text-[#002FA7]">{STEPS[step]}</span>
        </div>
        <div className="grid grid-cols-6 gap-1.5" aria-label="注册进度">
          {STEPS.map((label, index) => (
            <span
              key={label}
              className={`h-1 ${index <= step ? "bg-[#002FA7]" : "bg-white/[0.10]"}`}
              title={label}
            />
          ))}
        </div>
      </div>

      <div className="min-h-[310px]">
        {step === 0 && (
          <StepSection title="你的学校" description="先从已开放的校园开始。其他学校会清楚标记为即将开放。">
            <div className="grid gap-2 sm:grid-cols-2">
              {CAMPUS_LIST.map((item) => {
                const selected = campusId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-disabled={!item.isEnabled}
                    onClick={() => {
                      setNotice(null);
                      if (!item.isEnabled) {
                        fail(`${item.name}即将开放，当前暂不能注册`);
                        return;
                      }
                      setCampusId(item.id);
                    }}
                    className={`group flex min-h-20 items-center gap-3 rounded-2xl border p-3 text-left transition ${
                      selected
                        ? "border-[#002FA7]/60 bg-[#002FA7]/[0.08]"
                        : item.isEnabled
                          ? "border-white/[0.10] hover:border-white/25"
                          : "border-white/[0.06] bg-white/[0.02] opacity-55"
                    }`}
                  >
                    <span className={`flex size-10 shrink-0 items-center justify-center rounded-sm ${selected ? "bg-[#002FA7] text-[#080808]" : "bg-white/[0.06] text-[#8a8a8a]"}`}>
                      {selected ? <Check size={18} /> : <GraduationCap size={18} />}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium">{item.name}</span>
                      <span className={`mt-1 block text-xs ${item.isEnabled ? "text-[#002FA7]" : "text-[#77777d]"}`}>
                        {item.isEnabled ? "正式开放" : "即将开放"}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </StepSection>
        )}

        {step === 1 && campus && (
          <StepSection title="学校邮箱" description={`使用 ${campus.name} 邮箱确认校园身份。`}>
            <Field label="学校邮箱" icon={<Mail size={16} />}>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="name@gdufs.edu.cn"
                  autoComplete="email"
                  disabled={pending !== null}
                  className={`${inputClass} min-w-0 flex-1`}
                />
                <button
                  type="button"
                  onClick={() => requestCode("email")}
                  disabled={pending !== null}
                  className="w-28 shrink-0 rounded-sm border border-white/[0.14] text-sm transition hover:border-[#002FA7]/60 hover:text-[#002FA7] disabled:opacity-50"
                >
                  {pending === "email" ? <Loader2 size={17} className="mx-auto animate-spin" /> : "获取验证码"}
                </button>
              </div>
            </Field>
            <p className="mt-3 text-xs text-[#6f6f74]">允许的域名：{getCampusEmailHint(campus)}</p>
          </StepSection>
        )}

        {step === 2 && (
          <StepSection title="邮箱验证" description={`验证服务尚未配置，${email} 将以“待验证”状态创建账户。`}>
            <Field label="邮箱验证码" icon={<MessageSquareText size={16} />}>
              <input
                type="text"
                inputMode="numeric"
                value=""
                readOnly
                disabled
                placeholder="Provider 接入后可用"
                autoComplete="one-time-code"
                className={`${inputClass} text-center text-lg tracking-[0.45em]`}
              />
            </Field>
            <button type="button" onClick={() => requestCode("email")} disabled={pending !== null} className="mt-3 text-sm text-[#002FA7] hover:underline disabled:opacity-50">
              {pending === "email" ? "处理中…" : "重新获取验证码"}
            </button>
          </StepSection>
        )}

        {step === 3 && (
          <StepSection title="绑定手机" description="手机号当前可选填；验证 provider 接入前会保持“未验证”状态。">
            <div className="space-y-5">
              <Field label="+86 手机号" icon={<Smartphone size={16} />}>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#9a9a9f]">+86</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(normalizePhone(event.target.value))}
                    placeholder="138 0000 0000"
                    autoComplete="tel"
                    className={`${inputClass} pl-14`}
                  />
                </div>
              </Field>
              <Field label="手机验证码" icon={<MessageSquareText size={16} />}>
                <div className="flex gap-2">
                  <input
                    type="text"
                    inputMode="numeric"
                    value=""
                    readOnly
                    disabled
                    placeholder="Provider 接入后可用"
                    autoComplete="one-time-code"
                    className={`${inputClass} min-w-0 flex-1 tracking-[0.3em]`}
                  />
                  <button type="button" onClick={() => requestCode("phone")} disabled={pending !== null} className="w-28 shrink-0 rounded-sm border border-white/[0.14] text-sm transition hover:border-[#002FA7]/60 hover:text-[#002FA7] disabled:opacity-50">
                    {pending === "phone" ? <Loader2 size={17} className="mx-auto animate-spin" /> : "获取验证码"}
                  </button>
                </div>
              </Field>
            </div>
          </StepSection>
        )}

        {step === 4 && (
          <StepSection title="设置账号" description="最后设置公开昵称和登录密码。">
            <div className="space-y-5">
              <Field label="昵称" icon={<UserRound size={16} />}>
                <input type="text" value={nickname} onChange={(event) => setNickname(event.target.value.slice(0, 20))} placeholder="2–20 个字符" autoComplete="nickname" className={inputClass} />
              </Field>
              <Field label="密码" icon={<CheckCircle2 size={16} />}>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="至少 8 位，包含字母和数字" autoComplete="new-password" className={`${inputClass} pr-12`} />
                  <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#74747a] hover:text-white" aria-label={showPassword ? "隐藏密码" : "显示密码"}>
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </Field>
              <Field label="确认密码" icon={<CheckCircle2 size={16} />}>
                <input type={showPassword ? "text" : "password"} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="再次输入密码" autoComplete="new-password" className={inputClass} />
              </Field>
            </div>
          </StepSection>
        )}

        {step === 5 && (
          <div className="flex min-h-[310px] flex-col items-center justify-center text-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-[#002FA7] text-[#080808]"><Check size={24} /></span>
            <h2 className="mt-6 text-2xl font-semibold">账号已创建</h2>
            <p className="mt-3 max-w-sm text-sm leading-6 text-[#8a8a8a]">
              {registeredUser?.displayName ?? nickname}，你的密码账号已经可以使用。邮箱与手机号仍为待验证状态，验证服务接入后可继续完成认证。
            </p>
            <Link href="/profile" className="mt-7 inline-flex h-11 items-center rounded-sm border border-white/[0.14] px-5 text-sm transition hover:border-[#002FA7]/60 hover:text-[#002FA7]">
              进入个人中心
            </Link>
          </div>
        )}
      </div>

      {step < 5 && (
        <div className="mt-7 space-y-5 border-t border-white/[0.08] pt-6">
          <AgreementField checked={agreed} onChange={setAgreed} disabled={pending !== null} />
          {notice && <NoticeBox notice={notice} />}
          <div className="flex items-center justify-between gap-3">
            <button type="button" onClick={handleBack} disabled={step === 0 || pending !== null} className="inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm text-[#8a8a8a] transition hover:text-white disabled:invisible">
              <ArrowLeft size={16} />上一步
            </button>
            <button type="button" onClick={handleNext} disabled={pending !== null} className="inline-flex h-11 items-center gap-2 rounded-sm bg-[#002FA7] px-6 text-sm font-semibold text-[#080808] transition hover:bg-[#1649c2] disabled:opacity-55">
              {pending === "submit" ? <Loader2 size={16} className="animate-spin" /> : step === 4 ? <Check size={16} /> : <ArrowRight size={16} />}
              {step === 4 ? "创建账号" : step === 2 ? "暂不验证，继续" : "继续"}
            </button>
          </div>
        </div>
      )}

      <p className="mt-7 text-center text-sm text-[#77777d]">
        已有账号？<Link href="/login" className="ml-2 font-medium text-[#f5f5f5] hover:text-[#002FA7]">直接登录</Link>
      </p>
    </div>
  );
}

function StepSection({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-2xl font-semibold tracking-[-0.02em]">{title}</h2>
      <p className="mt-2 mb-6 text-sm leading-6 text-[#77777d]">{description}</p>
      {children}
    </section>
  );
}

function Field({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-sm text-[#b7b7bb]">{icon}{label}</span>
      {children}
    </label>
  );
}

function NoticeBox({ notice }: { notice: Exclude<Notice, null> }) {
  const Icon = notice.tone === "error" ? AlertCircle : CheckCircle2;
  return (
    <div role={notice.tone === "error" ? "alert" : "status"} className={`flex items-start gap-2.5 rounded-sm border px-3.5 py-3 text-sm leading-5 ${notice.tone === "error" ? "border-red-400/20 bg-red-400/[0.07] text-red-200" : "border-[#002FA7]/20 bg-[#002FA7]/[0.06] text-[#aab9ff]"}`}>
      <Icon size={16} className="mt-0.5 shrink-0" />
      <span>{notice.message}</span>
    </div>
  );
}
