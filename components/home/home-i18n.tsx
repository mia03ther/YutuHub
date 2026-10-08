"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";
import { HOME_COPY, type HomeLocale } from "@/lib/i18n/home";
import {
  getLanguageSnapshot,
  setLanguage,
  subscribeLanguage,
} from "@/lib/i18n/store";

type HomeI18nValue = {
  locale: HomeLocale;
  copy: (typeof HOME_COPY)[HomeLocale];
  setLocale: (locale: HomeLocale) => void;
};

const HomeI18nContext = createContext<HomeI18nValue | null>(null);

export function HomeI18nProvider({
  children,
  initialLocale,
}: {
  children: ReactNode;
  initialLocale: HomeLocale;
}) {
  const locale = useSyncExternalStore(
    subscribeLanguage,
    getLanguageSnapshot,
    () => initialLocale,
  );

  return (
    <HomeI18nContext.Provider value={{ locale, copy: HOME_COPY[locale], setLocale: setLanguage }}>
      {children}
    </HomeI18nContext.Provider>
  );
}

export function useHomeI18n() {
  const value = useContext(HomeI18nContext);
  if (!value) throw new Error("useHomeI18n must be used inside HomeI18nProvider");
  return value;
}
