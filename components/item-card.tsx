import { Item } from "@/lib/mock-data";

type ItemCardProps = {
  item: Item;
  favored: boolean;
  onToggleFavorite: (item: Item) => void;
  onClick: (item: Item) => void;
};

export default function ItemCard({
  item,
  favored,
  onToggleFavorite,
  onClick,
}: ItemCardProps) {
  return (
    <div className="group relative rounded-3xl border border-black/5 bg-[#fafaf8] p-6 transition hover:-translate-y-1 hover:border-black/10 hover:shadow-xl">
      <button
        type="button"
        aria-label={favored ? "取消收藏" : "收藏"}
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(item);
        }}
        className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-neutral-500 shadow-sm backdrop-blur transition hover:scale-105 hover:text-accent"
      >
        {favored ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4 text-accent"
          >
            <path d="M11.645 2.91 8.956 8.142 3 9.272c-.59.086-.828.81-.424 1.237l3.31 3.25-1.342 4.614c-.19.656.56 1.176 1.14.85l4.353-2.51 4.354 2.51c.58.326 1.33-.194 1.14-.85l-1.342-4.614 3.31-3.25c.404-.427.166-1.151-.424-1.232l-4.956-.69-2.216-5.232a.75.75 0 0 0-1.37 0Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16Z" />
          </svg>
        )}
      </button>

      <button
        onClick={() => onClick(item)}
        className="w-full text-left"
      >
        <div className="flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#171717] text-sm font-bold text-white">
            {item.emoji}
          </div>

          <span className="rounded-full border border-black/5 bg-white px-3 py-1 text-[11px] text-neutral-400">
            {item.type}
          </span>
        </div>

        <div className="mt-8">
          <div className="text-xl font-bold">{item.title}</div>

          <div className="mt-2 text-sm text-neutral-400">
            {item.owner} · {item.category}
          </div>

          <p className="mt-4 min-h-12 text-sm leading-6 text-neutral-500">
            {item.desc}
          </p>
        </div>

        <div className="mt-7 flex items-center justify-between">
          <span className="text-xs text-neutral-400">
            查看详情 →
          </span>
          <span className="font-bold">{item.price}</span>
        </div>
      </button>
    </div>
  );
}