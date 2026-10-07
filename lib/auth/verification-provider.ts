import "server-only";

export type VerificationChannel = "email" | "phone";
export type VerificationPurpose = "register" | "login" | "reset";

export interface VerificationRequest {
  channel: VerificationChannel;
  target: string;
  purpose: VerificationPurpose;
}

export type VerificationResult =
  | { ok: true }
  | {
      ok: false;
      code: "VERIFICATION_PROVIDER_UNAVAILABLE" | "INVALID_CODE";
      message: string;
    };

export interface VerificationProvider {
  requestCode(input: VerificationRequest): Promise<VerificationResult>;
  verifyCode(input: VerificationRequest & { code: string }): Promise<VerificationResult>;
}

class UnconfiguredVerificationProvider implements VerificationProvider {
  async requestCode(): Promise<VerificationResult> {
    return {
      ok: false,
      code: "VERIFICATION_PROVIDER_UNAVAILABLE",
      message: "邮件和短信验证服务尚未配置，本次没有发送验证码。",
    };
  }

  async verifyCode(): Promise<VerificationResult> {
    return {
      ok: false,
      code: "VERIFICATION_PROVIDER_UNAVAILABLE",
      message: "验证服务尚未配置，无法验证验证码。",
    };
  }
}

// TODO: Configure a real provider here when email/SMS infrastructure is ready.
export const verificationProvider: VerificationProvider =
  new UnconfiguredVerificationProvider();
