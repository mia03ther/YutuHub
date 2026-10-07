"use client";

import { useState, useEffect, useRef } from "react";
import { CheckCircle, Loader2, AlertCircle, Mail, Smartphone } from "lucide-react";

interface PhoneVerificationProps {
  phone: string;
  onVerify: (code: string) => Promise<void>;
  onResend?: () => Promise<void>;
  onChangePhone?: () => void;
  type?: "register" | "login" | "bind" | "reset";
  disabled?: boolean;
  className?: string;
}

export function PhoneVerification({
  phone,
  onVerify,
  onResend,
  onChangePhone,
  disabled = false,
  className = "",
}: PhoneVerificationProps) {
  const [code, setCode] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const handleResend = async () => {
    if (countdown > 0 || isResending || !onResend) return;
    setIsResending(true);
    setError("");
    try {
      await onResend();
      setCountdown(60);
      setCode("");
      setSuccess(false);
      inputsRef.current[0]?.focus();
    } catch {
      setError("发送失败，请稍后重试");
    } finally {
      setIsResending(false);
    }
  };

  const handleVerify = async (candidateCode: string) => {
    if (candidateCode.length !== 6 || isVerifying) return;
    setIsVerifying(true);
    setError("");
    try {
      await onVerify(candidateCode);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "验证码错误，请重新输入");
      setCode("");
      inputsRef.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  const handleCodeChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value) || value.length > 1) return;
    const newCode = code.split("");
    newCode[index] = value;
    const joined = newCode.join("");
    setCode(joined);
    setSuccess(false);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    } else if (!value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }

    if (joined.length === 6) {
      void handleVerify(joined);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setCode(pasted);
      setSuccess(false);
      void handleVerify(pasted);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const formatPhone = (p: string) => {
    const cleaned = p.replace(/\D/g, "");
    if (cleaned.length === 11) {
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 7)} ${cleaned.slice(7)}`;
    }
    return p;
  };

  return (
    <div className={className}>
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted mb-2">
          <Smartphone size={16} />
          <span>手机验证</span>
        </div>
        <p className="text-foreground font-medium">
          已发送验证码至 <span className="font-mono">{formatPhone(phone)}</span>
        </p>
        {onChangePhone && (
          <button
            type="button"
            onClick={onChangePhone}
            className="mt-2 text-sm text-accent hover:underline"
            disabled={disabled}
          >
            更换手机号
          </button>
        )}
      </div>

      <div className="flex gap-2 mb-6" role="group" aria-label="验证码输入">
        {[...Array(6)].map((_, i) => (
          <input
            key={i}
            ref={(el) => {
              inputsRef.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={code[i] || ""}
            onChange={(e) => handleCodeChange(i, e.target.value)}
            onPaste={handlePaste}
            onKeyDown={(e) => handleKeyDown(i, e)}
            disabled={disabled || isVerifying}
            autoComplete="one-time-code"
            className={`flex-1 max-w-12 h-12 text-center text-2xl font-medium rounded-xl border-2 transition-all duration-200 ${
              code[i]
                ? "border-accent bg-accent/5 text-foreground"
                : i === code.length && !disabled
                ? "border-accent/50 bg-accent/5"
                : "border-border bg-card/50"
            } ${isVerifying ? "cursor-wait" : ""} ${success ? "border-positive bg-positive/5" : ""} ${error && !isVerifying ? "border-destructive bg-destructive/5" : ""}`}
            aria-label={`验证码第 ${i + 1} 位`}
          />
        ))}
      </div>

      {error && (
        <div
          className="flex items-center gap-2 mb-4 p-3 rounded-xl bg-destructive/10 border border-destructive/20 animate-fade-in"
          role="alert"
        >
          <AlertCircle size={18} className="text-destructive shrink-0" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {success && (
        <div
          className="flex items-center gap-2 mb-4 p-3 rounded-xl bg-positive/10 border border-positive/20 animate-fade-in"
          role="status"
        >
          <CheckCircle size={18} className="text-positive shrink-0" />
          <p className="text-sm text-positive">验证成功</p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handleResend}
          disabled={countdown > 0 || isResending || disabled}
          className="text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ color: "var(--accent)" }}
        >
          {countdown > 0 ? (
            <span className="text-muted-soft">{countdown}s 后重新发送</span>
          ) : (
            <>
              没收到验证码？<span className="ml-1 hover:underline">重新发送</span>
            </>
          )}
        </button>

        {isVerifying && (
          <div className="flex items-center gap-2 text-sm text-muted">
            <Loader2 size={16} className="animate-spin" />
            验证中...
          </div>
        )}
      </div>
    </div>
  );
}

interface EmailVerificationProps {
  email: string;
  onVerify: (code: string) => Promise<void>;
  onResend?: () => Promise<void>;
  onChangeEmail?: () => void;
  type?: "register" | "login" | "bind" | "reset";
  disabled?: boolean;
  className?: string;
}

export function EmailVerification({
  email,
  onVerify,
  onResend,
  onChangeEmail,
  disabled = false,
  className = "",
}: EmailVerificationProps) {
  const [code, setCode] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const handleResend = async () => {
    if (countdown > 0 || isResending || !onResend) return;
    setIsResending(true);
    setError("");
    try {
      await onResend();
      setCountdown(60);
      setCode("");
      setSuccess(false);
      inputsRef.current[0]?.focus();
    } catch {
      setError("发送失败，请稍后重试");
    } finally {
      setIsResending(false);
    }
  };

  const handleVerify = async (candidateCode: string) => {
    if (candidateCode.length !== 6 || isVerifying) return;
    setIsVerifying(true);
    setError("");
    try {
      await onVerify(candidateCode);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "验证码错误，请重新输入");
      setCode("");
      inputsRef.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  const handleCodeChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value) || value.length > 1) return;
    const newCode = code.split("");
    newCode[index] = value;
    const joined = newCode.join("");
    setCode(joined);
    setSuccess(false);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    } else if (!value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }

    if (joined.length === 6) {
      void handleVerify(joined);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setCode(pasted);
      setSuccess(false);
      void handleVerify(pasted);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const maskEmail = (e: string) => {
    const [local, domain] = e.split("@");
    if (!local || !domain) return e;
    const maskedLocal =
      local.length <= 2
        ? "*".repeat(local.length)
        : local[0] + "*".repeat(local.length - 2) + local[local.length - 1];
    return `${maskedLocal}@${domain}`;
  };

  return (
    <div className={className}>
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted mb-2">
          <Mail size={16} />
          <span>邮箱验证</span>
        </div>
        <p className="text-foreground font-medium">
          已发送验证码至 <span className="font-mono">{maskEmail(email)}</span>
        </p>
        {onChangeEmail && (
          <button
            type="button"
            onClick={onChangeEmail}
            className="mt-2 text-sm text-accent hover:underline"
            disabled={disabled}
          >
            更换邮箱
          </button>
        )}
      </div>

      <div className="flex gap-2 mb-6" role="group" aria-label="验证码输入">
        {[...Array(6)].map((_, i) => (
          <input
            key={i}
            ref={(el) => {
              inputsRef.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={code[i] || ""}
            onChange={(e) => handleCodeChange(i, e.target.value)}
            onPaste={handlePaste}
            onKeyDown={(e) => handleKeyDown(i, e)}
            disabled={disabled || isVerifying}
            autoComplete="one-time-code"
            className={`flex-1 max-w-12 h-12 text-center text-2xl font-medium rounded-xl border-2 transition-all duration-200 ${
              code[i]
                ? "border-accent bg-accent/5 text-foreground"
                : i === code.length && !disabled
                ? "border-accent/50 bg-accent/5"
                : "border-border bg-card/50"
            } ${isVerifying ? "cursor-wait" : ""} ${success ? "border-positive bg-positive/5" : ""} ${error && !isVerifying ? "border-destructive bg-destructive/5" : ""}`}
            aria-label={`验证码第 ${i + 1} 位`}
          />
        ))}
      </div>

      {error && (
        <div
          className="flex items-center gap-2 mb-4 p-3 rounded-xl bg-destructive/10 border border-destructive/20 animate-fade-in"
          role="alert"
        >
          <AlertCircle size={18} className="text-destructive shrink-0" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {success && (
        <div
          className="flex items-center gap-2 mb-4 p-3 rounded-xl bg-positive/10 border border-positive/20 animate-fade-in"
          role="status"
        >
          <CheckCircle size={18} className="text-positive shrink-0" />
          <p className="text-sm text-positive">验证成功</p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handleResend}
          disabled={countdown > 0 || isResending || disabled}
          className="text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ color: "var(--accent)" }}
        >
          {countdown > 0 ? (
            <span className="text-muted-soft">{countdown}s 后重新发送</span>
          ) : (
            <>
              没收到验证码？<span className="ml-1 hover:underline">重新发送</span>
            </>
          )}
        </button>

        {isVerifying && (
          <div className="flex items-center gap-2 text-sm text-muted">
            <Loader2 size={16} className="animate-spin" />
            验证中...
          </div>
        )}
      </div>
    </div>
  );
}
