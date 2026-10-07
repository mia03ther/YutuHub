export interface Campus {
  id: string;
  name: string;
  shortName: string;
  /** Primary domain shown in the UI. */
  domain: string;
  /** Exact email domains accepted for identity verification. */
  emailDomains: readonly string[];
  city: string;
  province: string;
  isEnabled: boolean;
  description?: string;
  logo?: string;
}

export const CAMPUS_LIST: Campus[] = [
  {
    id: "gdufs",
    name: "广东外语外贸大学",
    shortName: "广外",
    domain: "gdufs.edu.cn",
    emailDomains: ["gdufs.edu.cn", "mail.gdufs.edu.cn"],
    city: "广州",
    province: "广东",
    isEnabled: true,
    description: "广东外语外贸大学，位于广州大学城，是广东省属重点大学",
  },
  {
    id: "sysu",
    name: "中山大学",
    shortName: "中大",
    domain: "sysu.edu.cn",
    emailDomains: [],
    city: "广州",
    province: "广东",
    isEnabled: false,
    description: "中山大学，位于广州大学城，教育部直属综合性研究型大学",
  },
  {
    id: "scut",
    name: "华南理工大学",
    shortName: "华工",
    domain: "scut.edu.cn",
    emailDomains: [],
    city: "广州",
    province: "广东",
    isEnabled: false,
    description: "华南理工大学，位于广州大学城，教育部直属全国重点大学",
  },
  {
    id: "scnu",
    name: "华南师范大学",
    shortName: "华师",
    domain: "scnu.edu.cn",
    emailDomains: [],
    city: "广州",
    province: "广东",
    isEnabled: false,
    description: "华南师范大学，位于广州大学城，教育部直属师范类重点大学",
  },
  {
    id: "jnu",
    name: "暨南大学",
    shortName: "暨大",
    domain: "jnu.edu.cn",
    emailDomains: [],
    city: "广州",
    province: "广东",
    isEnabled: false,
    description: "暨南大学，位于广州大学城，国家“双一流”建设高校",
  },
  {
    id: "gdut",
    name: "广东工业大学",
    shortName: "广工",
    domain: "gdut.edu.cn",
    emailDomains: [],
    city: "广州",
    province: "广东",
    isEnabled: false,
    description: "广东工业大学，位于广州大学城，广东省属高水平理工科大学",
  },
];

export const DEFAULT_CAMPUS = CAMPUS_LIST.find((c) => c.id === "gdufs")!;

export const UNIVERSITY_CITY_CAMPUSES = CAMPUS_LIST.filter(
  (c) => c.city === "广州" && c.province === "广东"
);

export function getCampusById(id: string): Campus | undefined {
  return CAMPUS_LIST.find((c) => c.id === id);
}

export function getCampusByDomain(domain: string): Campus | undefined {
  const normalizedDomain = domain.trim().toLowerCase();
  return CAMPUS_LIST.find((campus) =>
    campus.emailDomains.some(
      (emailDomain) => emailDomain.toLowerCase() === normalizedDomain,
    ),
  );
}

export function getEnabledCampuses(): Campus[] {
  return CAMPUS_LIST.filter((c) => c.isEnabled);
}

export function validateSchoolEmail(email: string): Campus | null {
  const normalizedEmail = email.trim().toLowerCase();
  const parts = normalizedEmail.split("@");
  if (parts.length !== 2 || !parts[0] || !parts[1]) return null;

  const domain = parts[1];
  const campus = getCampusByDomain(domain);
  return campus && campus.isEnabled ? campus : null;
}

export function isEmailAllowedForCampus(email: string, campusId: string): boolean {
  return validateSchoolEmail(email)?.id === campusId;
}

export function getCampusEmailHint(campus: Campus): string {
  return campus.emailDomains.map((domain) => `@${domain}`).join(" / ");
}
