import type { Metadata } from "next";
import { LegalPage } from "@/components/auth/legal-page";

export const metadata: Metadata = { title: "隐私政策 · YuTuHub" };

export default function PrivacyPage() {
  return <LegalPage title="隐私政策" description="这里将说明屿途知汇如何收集、使用、保存与保护账户及校园身份信息。" />;
}
