import { Item } from "@/lib/mock-data";
import ItemCard from "@/components/item-card";

type ItemGridProps = {
  items: Item[];
  favoredIds: number[];
  onToggleFavorite: (item: Item) => void;
  onItemSelect: (item: Item) => void;
  emptyLabel?: string;
  emptyActionLabel?: string;
  onEmptyAction?: () => void;
};

export default function ItemGrid({
  items,
  favoredIds,
  onToggleFavorite,
  onItemSelect,
  emptyLabel = "没有找到匹配内容，试试其他关键词。",
  emptyActionLabel = "浏览全部商品",
  onEmptyAction,
}: ItemGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          favored={favoredIds.includes(item.id)}
          onToggleFavorite={onToggleFavorite}
          onClick={onItemSelect}
        />
      ))}

      {items.length === 0 && (
        <div className="col-span-full rounded-3xl border border-dashed border-black/10 py-20 text-center">
          <div className="text-sm text-neutral-400">{emptyLabel}</div>
          {onEmptyAction && (
            <button
              onClick={onEmptyAction}
              className="mt-4 rounded-full border border-black/10 bg-white px-4 py-2 text-xs text-neutral-500 transition hover:border-black/20 hover:text-black"
            >
              {emptyActionLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
}