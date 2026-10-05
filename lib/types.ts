export type Track =
  | "ai-tool"
  | "skill"
  | "wiki"
  | "community"
  | "project";

export type TrackId = "ai-tools" | "skills" | "wiki" | "community" | "projects";

export type TrackIcon = "sparkles" | "repeat" | "book" | "users" | "rocket";

export interface TrackMeta {
  id: TrackId;
  label: string;
  tagline: string;
  description: string;
  href: string;
  icon: TrackIcon;
  accent: "accent" | "info" | "positive" | "warning" | "destructive";
}

export type ToolListItem = Omit<AiTool, "body"> & { bodyPreview: string };

export type ContributorLevel = 1 | 2 | 3 | 4 | 5;

export interface LevelMeta {
  level: ContributorLevel;
  name: string;
  minContribution: number;
  perk: string;
}

export interface BadgeMeta {
  id: string;
  name: string;
  description: string;
  icon: string;
  tone: "accent" | "info" | "positive" | "warning";
}

export interface Author {
  handle: string;
  name: string;
  avatar: string;
  school: string;
  level: ContributorLevel;
  contribution: number;
  bio: string;
}

export interface AiTool {
  slug: string;
  name: string;
  vendor: string;
  category: string;
  summary: string;
  body: string;
  pricing: string;
  tags: string[];
  author: Author;
  saves: number;
  verified: boolean;
}

export interface Skill {
  slug: string;
  title: string;
  exchange: string;
  category: string;
  summary: string;
  body: string;
  tags: string[];
  author: Author;
  rate: number;
  sessions: number;
}

export interface WikiEntry {
  slug: string;
  title: string;
  summary: string;
  body: string;
  category: string;
  tags: string[];
  author: Author;
  revision: number;
  updatedAt: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  stack: string[];
  stage: "idea" | "building" | "beta" | "shipped";
  lookingFor: string[];
  author: Author;
  stars: number;
}

export interface ActivityItem {
  id: string;
  actor: Author;
  action: string;
  target: string;
  href: string;
  at: string;
}