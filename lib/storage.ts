const FAVORITES_KEY = "yutuhub:favorites";

export function getFavorites(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(FAVORITES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((n) => typeof n === "number") : [];
  } catch {
    return [];
  }
}

export function addFavorite(id: number): number[] {
  const current = getFavorites();
  if (current.includes(id)) return current;
  const next = [...current, id];
  if (typeof window !== "undefined") {
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
  }
  return next;
}

export function removeFavorite(id: number): number[] {
  const current = getFavorites().filter((n) => n !== id);
  if (typeof window !== "undefined") {
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(current));
  }
  return current;
}