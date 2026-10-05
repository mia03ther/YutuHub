import type { Metadata } from "next";
import { SITE } from "./site";

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}

/**
 * Builds a consistent metadata object so every route shares the same
 * OpenGraph / Twitter / canonical shape instead of inheriting the root one.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
}: PageMetaInput): Metadata {
  const fullTitle = `${title} · ${SITE.name}`;
  const url = `${SITE.url}${path}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: SITE.locale,
      url,
      siteName: SITE.name,
      title: fullTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}