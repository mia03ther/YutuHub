import {
  ACTIVITIES,
  AI_TOOLS,
  BADGES,
  LEVELS,
  PROJECTS,
  SKILLS,
  TRACKS,
  WIKI_ENTRIES,
} from "./data";
import type {
  ActivityItem,
  AiTool,
  BadgeMeta,
  LevelMeta,
  Project,
  Skill,
  TrackMeta,
  ToolListItem,
  WikiEntry,
} from "./types";

function preview(markdown: string): string {
  const line = markdown
    .split("\n")
    .map((item) => item.trim())
    .find((item) => item.length > 0 && !item.startsWith("#"));
  return line ?? "";
}

export async function listTools(): Promise<ToolListItem[]> {
  return AI_TOOLS.map(({ body, ...rest }) => ({
    ...rest,
    bodyPreview: preview(body),
  }));
}

export async function getTool(slug: string): Promise<AiTool | undefined> {
  return AI_TOOLS.find((item) => item.slug === slug);
}

export async function listSkills(): Promise<Skill[]> {
  return SKILLS;
}

export async function listWiki(): Promise<WikiEntry[]> {
  return WIKI_ENTRIES;
}

export async function getWikiEntry(
  slug: string,
): Promise<WikiEntry | undefined> {
  return WIKI_ENTRIES.find((item) => item.slug === slug);
}

export async function listProjects(): Promise<Project[]> {
  return PROJECTS;
}

export async function listPopularProjects(limit = 3): Promise<Project[]> {
  return [...PROJECTS].sort((a, b) => b.stars - a.stars).slice(0, limit);
}

export function tracks(): TrackMeta[] {
  return TRACKS;
}

export function levels(): LevelMeta[] {
  return LEVELS;
}

export function badges(): BadgeMeta[] {
  return BADGES;
}

export function activities(): ActivityItem[] {
  return ACTIVITIES;
}