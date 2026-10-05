import {
  BookOpen,
  Rocket,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { TrackIcon } from "./types";

export const TRACK_ICONS: Record<TrackIcon, LucideIcon> = {
  sparkles: Sparkles,
  repeat: BookOpen,
  book: BookOpen,
  users: Users,
  rocket: Rocket,
};