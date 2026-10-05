import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { AI_TOOLS, WIKI_ENTRIES } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const statics: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/tools`, lastModified, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/skills`, lastModified, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/wiki`, lastModified, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/community`, lastModified, changeFrequency: "hourly", priority: 0.7 },
    { url: `${SITE_URL}/projects`, lastModified, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/levels`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/badges`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.4 },
  ];

  const details: MetadataRoute.Sitemap = [
    ...AI_TOOLS.map((tool) => ({
      url: `${SITE_URL}/tools/${tool.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...WIKI_ENTRIES.map((entry) => ({
      url: `${SITE_URL}/wiki/${entry.slug}`,
      lastModified: new Date(entry.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ];

  return [...statics, ...details];
}