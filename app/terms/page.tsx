import type { Metadata } from "next";
import { LegalPage } from "@/components/auth/legal-page";

export const metadata: Metadata = { title: "服务协议 · YuTuHub" };

export default function TermsPage() {
  return <LegalPage title="服务协议" description="这里将说明使用屿途知汇时双方的权利、义务与社区规则。" />;
}
