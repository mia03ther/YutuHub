import type { ContributorLevel } from "@/lib/types";

export const LEVEL_BG: Record<ContributorLevel, string> = {
  1: "bg-level-1",
  2: "bg-level-2",
  3: "bg-level-3",
  4: "bg-level-4",
  5: "bg-level-5",
};

export const LEVEL_NAMES: Record<ContributorLevel, string> = {
  1: "探索者",
  2: "贡献者",
  3: "搭建者",
  4: "领航员",
  5: "架构师",
};

export function LevelBadge({
  level,
  compact = false,
}: {
  level: ContributorLevel;
  compact?: boolean;
}) {
  return (
    <span
      title={`Lv.${level} ${LEVEL_NAMES[level]}`}
      className={`inline-flex shrink-0 items-center rounded-full font-medium tabular-nums text-white ${LEVEL_BG[level]} ${
        compact ? "px-1.5 py-px text-[10px]" : "px-2 py-0.5 text-xs"
      }`}
    >
      Lv.{level}
      <span className="sr-only">{LEVEL_NAMES[level]}</span>
    </span>
  );
}