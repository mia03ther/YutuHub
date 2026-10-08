import {
  DEFAULT_LANGUAGE,
  detectLanguage,
  LANGUAGE_CHANGE_EVENT,
  LANGUAGE_COOKIE_KEY,
  LANGUAGE_STORAGE_KEY,
  matchLanguage,
  type Language,
} from "@/lib/i18n/config";

let currentLanguage: Language | null = null;
const listeners = new Set<() => void>();

function readStoredLanguage() {
  try {
    return matchLanguage(window.localStorage.getItem(LANGUAGE_STORAGE_KEY));
  } catch {
    return null;
  }
}

function readDocumentLanguage() {
  return matchLanguage(
    document.documentElement.dataset.locale ?? document.documentElement.lang,
  );
}

function resolveLanguage() {
  return (
    readStoredLanguage() ??
    readDocumentLanguage() ??
    detectLanguage(navigator.languages.length ? navigator.languages : [navigator.language])
  );
}

function applyLanguage(language: Language) {
  document.documentElement.lang = language;
  document.documentElement.dataset.locale = language;
}

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

export function getLanguageSnapshot(): Language {
  if (currentLanguage) return currentLanguage;
  if (typeof document === "undefined") return DEFAULT_LANGUAGE;

  currentLanguage = resolveLanguage();
  applyLanguage(currentLanguage);
  return currentLanguage;
}

export function subscribeLanguage(listener: () => void) {
  listeners.add(listener);

  const handleStorage = (event: StorageEvent) => {
    if (event.key !== null && event.key !== LANGUAGE_STORAGE_KEY) return;

    const nextLanguage = matchLanguage(event.newValue) ?? resolveLanguage();
    if (nextLanguage === currentLanguage) return;

    currentLanguage = nextLanguage;
    applyLanguage(nextLanguage);
    notifyListeners();
  };

  window.addEventListener("storage", handleStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

export function setLanguage(language: Language) {
  const changed = language !== currentLanguage;

  // Update the in-memory snapshot and DOM first so storage restrictions cannot
  // prevent the visible language change.
  currentLanguage = language;
  applyLanguage(language);

  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    // The UI remains functional when storage is unavailable (for example,
    // strict privacy modes). The cookie is attempted independently below.
  }

  try {
    document.cookie = `${LANGUAGE_COOKIE_KEY}=${encodeURIComponent(language)}; Max-Age=31536000; Path=/; SameSite=Lax`;
  } catch {
    // Cookie persistence is a progressive enhancement for matching SSR copy.
  }

  if (changed) notifyListeners();
  window.dispatchEvent(
    new CustomEvent(LANGUAGE_CHANGE_EVENT, { detail: { language } }),
  );
}
