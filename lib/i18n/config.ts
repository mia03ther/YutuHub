export const SUPPORTED_LANGUAGES = ["zh-CN", "en", "ja", "ko", "es", "fr", "ru"] as const;

export type Language = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: Language = "zh-CN";
export const LANGUAGE_STORAGE_KEY = "yutuhub-locale";
export const LANGUAGE_COOKIE_KEY = "yutuhub-locale";
export const LANGUAGE_CHANGE_EVENT = "yutuhub-locale-change";

export const LANGUAGE_NAMES: Record<Language, string> = {
  "zh-CN": "简体中文",
  en: "English",
  ja: "日本語",
  ko: "한국어",
  es: "Español",
  fr: "Français",
  ru: "Русский",
};

export function matchLanguage(value: string | null | undefined): Language | null {
  if (!value) return null;

  const normalized = value.trim().toLowerCase();
  if (normalized.startsWith("zh")) return "zh-CN";

  return (
    SUPPORTED_LANGUAGES.find((language) => {
      const candidate = language.toLowerCase();
      return normalized === candidate || normalized.startsWith(`${candidate}-`);
    }) ?? null
  );
}

export function detectLanguage(preferences: readonly string[]): Language {
  for (const preference of preferences) {
    const language = matchLanguage(preference);
    if (language) return language;
  }

  return DEFAULT_LANGUAGE;
}
