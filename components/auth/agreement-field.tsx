"use client";

import Link from "next/link";

interface AgreementFieldProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function AgreementField({
  checked,
  onChange,
  disabled = false,
}: AgreementFieldProps) {
  return (
    <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-[#9a9a9f]">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        disabled={disabled}
        className="mt-1 size-4 shrink-0 accent-[#002FA7]"
      />
      <span>
        我已阅读并同意
        <Link href="/terms" className="mx-1 text-[#f5f5f5] underline-offset-4 hover:underline">
          《服务协议》
        </Link>
        和
        <Link href="/privacy" className="ml-1 text-[#f5f5f5] underline-offset-4 hover:underline">
          《隐私政策》
        </Link>
      </span>
    </label>
  );
}
