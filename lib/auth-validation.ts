import {
  getCampusById,
  getCampusEmailHint,
  isEmailAllowedForCampus,
} from "./campus";
import type { LoginCredentials, RegisterData } from "./user-types";

export type ValidationResult =
  | { valid: true }
  | { valid: false; message: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CHINA_MOBILE_PATTERN = /^1[3-9]\d{9}$/;

export function normalizePhone(value: string): string {
  return value.replace(/^\+86/, "").replace(/\D/g, "").slice(0, 11);
}

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function validateCampusEmail(
  email: string,
  campusId = "gdufs",
): ValidationResult {
  const campus = getCampusById(campusId);
  const normalizedEmail = normalizeEmail(email);

  if (normalizedEmail.length > 254 || !EMAIL_PATTERN.test(normalizedEmail)) {
    return { valid: false, message: "请输入完整的学校邮箱地址" };
  }

  if (!campus || !campus.isEnabled) {
    return { valid: false, message: "该学校尚未开放注册" };
  }

  if (!isEmailAllowedForCampus(normalizedEmail, campus.id)) {
    return {
      valid: false,
      message: `请使用 ${campus.shortName} 学校邮箱（${getCampusEmailHint(campus)}）`,
    };
  }

  return { valid: true };
}

export function validateChinaPhone(phone: string): ValidationResult {
  if (!CHINA_MOBILE_PATTERN.test(normalizePhone(phone))) {
    return { valid: false, message: "请输入有效的 +86 中国大陆手机号" };
  }
  return { valid: true };
}

export function validateVerificationCode(code: string): ValidationResult {
  if (!/^\d{6}$/.test(code)) {
    return { valid: false, message: "请输入 6 位数字验证码" };
  }
  return { valid: true };
}

export function validatePassword(password: string): ValidationResult {
  if (password.length < 8) {
    return { valid: false, message: "密码至少需要 8 个字符" };
  }
  if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    return { valid: false, message: "密码需同时包含字母和数字" };
  }
  if (password.length > 128) {
    return { valid: false, message: "密码不能超过 128 个字符" };
  }
  return { valid: true };
}

export function validateNickname(nickname: string): ValidationResult {
  const length = nickname.trim().length;
  if (length < 2 || length > 20) {
    return { valid: false, message: "昵称需要 2–20 个字符" };
  }
  return { valid: true };
}

type Parsed<T> =
  | { valid: true; data: T }
  | { valid: false; message: string; field?: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function parseRegisterData(value: unknown): Parsed<RegisterData> {
  if (!isRecord(value)) {
    return { valid: false, message: "请求格式不正确" };
  }

  const campusId = typeof value.campusId === "string" ? value.campusId : "";
  const email = typeof value.email === "string" ? normalizeEmail(value.email) : "";
  const phoneInput = typeof value.phone === "string" ? value.phone : "";
  const phone = phoneInput ? normalizePhone(phoneInput) : undefined;
  const displayName = typeof value.displayName === "string" ? value.displayName.trim() : "";
  const password = typeof value.password === "string" ? value.password : "";

  if (value.acceptedTerms !== true) {
    return { valid: false, field: "acceptedTerms", message: "请先同意服务协议和隐私政策" };
  }

  const emailResult = validateCampusEmail(email, campusId);
  if (!emailResult.valid) {
    return { valid: false, field: "email", message: emailResult.message };
  }

  if (phone) {
    const phoneResult = validateChinaPhone(phone);
    if (!phoneResult.valid) {
      return { valid: false, field: "phone", message: phoneResult.message };
    }
  }

  const nicknameResult = validateNickname(displayName);
  if (!nicknameResult.valid) {
    return { valid: false, field: "displayName", message: nicknameResult.message };
  }

  const passwordResult = validatePassword(password);
  if (!passwordResult.valid) {
    return { valid: false, field: "password", message: passwordResult.message };
  }

  return {
    valid: true,
    data: {
      campusId,
      email,
      phone,
      displayName,
      password,
      acceptedTerms: true,
    },
  };
}

export function parseLoginCredentials(value: unknown): Parsed<LoginCredentials> {
  if (!isRecord(value)) {
    return { valid: false, message: "请求格式不正确" };
  }
  if (value.acceptedTerms !== true) {
    return { valid: false, field: "acceptedTerms", message: "请先同意服务协议和隐私政策" };
  }

  const email = typeof value.email === "string" ? normalizeEmail(value.email) : "";
  const password = typeof value.password === "string" ? value.password : "";
  const emailResult = validateCampusEmail(email);
  if (!emailResult.valid) {
    return { valid: false, field: "email", message: emailResult.message };
  }
  const passwordResult = validatePassword(password);
  if (!passwordResult.valid) {
    return { valid: false, field: "password", message: passwordResult.message };
  }

  return { valid: true, data: { email, password } };
}
