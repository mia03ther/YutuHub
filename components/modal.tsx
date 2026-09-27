import { useEffect } from "react";
import { Item } from "@/lib/mock-data";

type ModalProps = {
  item: Item | null;
  favored: boolean;
  onToggleFavorite: (item: Item) => void;
  onClose: () => void;
};

export default function Modal({
  item,
  favored,
  onToggleFavorite,
  onClose,
}: ModalProps) {
  useEffect(() => {
    if (!item) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-5 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg animate-[fade-in_200ms_ease-out] rounded-3xl bg-white p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-xs text-neutral-400">
          {item.type} · {item.category}
        </div>

        <h3 className="mt-3 text-3xl font-black">
          {item.title}
        </h3>

        <div className="mt-2 text-sm text-neutral-400">
          {item.owner}
        </div>

        <p className="mt-6 text-sm leading-7 text-neutral-500">
          {item.desc}
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3 border-t border-black/5 pt-6">
          <div>
            <div className="text-xs text-neutral-400">参考价格</div>
            <div className="mt-1 font-black">{item.price}</div>
          </div>
          <div>
            <div className="text-xs text-neutral-400">成色</div>
            <div className="mt-1 font-medium">{item.condition}</div>
          </div>
          <div>
            <div className="text-xs text-neutral-400">地点</div>
            <div className="mt-1 font-medium">{item.location}</div>
          </div>
          <div>
            <div className="text-xs text-neutral-400">发布时间</div>
            <div className="mt-1 font-medium">{item.postedAt}</div>
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <button
            type="button"
            aria-label={favored ? "取消收藏" : "收藏"}
            onClick={() => onToggleFavorite(item)}
            className={`flex h-11 w-11 items-center justify-center rounded-full border transition hover:scale-105 ${
              favored
                ? "border-accent bg-accent-soft text-accent"
                : "border-black/10 bg-white text-neutral-500 hover:border-black/20"
            }`}
          >
            {favored ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
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
                className="h-5 w-5"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16Z" />
              </svg>
            )}
          </button>

          <button
            onClick={onClose}
            className="flex-1 rounded-2xl bg-[#171717] py-3.5 text-sm font-bold text-white transition hover:bg-black/80"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
}