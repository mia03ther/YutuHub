type HeroProps = {
  query: string;
  onQueryChange: (query: string) => void;
  onClear: () => void;
  onSearchClick: () => void;
};

export default function Hero({
  query,
  onQueryChange,
  onClear,
  onSearchClick,
}: HeroProps) {
  return (
    <section className="border-b border-black/5">
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-16 md:px-8 md:pb-28 md:pt-24">
        <div className="max-w-4xl">
          <div className="mb-6 text-sm font-medium text-neutral-400">
            YU TU ZHI HUI · CAMPUS MARKETPLACE
          </div>

          <h1 className="text-5xl font-black leading-[1.02] tracking-[-0.045em] md:text-8xl">
            屿途知汇
            <span className="block text-neutral-300">
              大学生自己的信息集市
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-base leading-8 text-neutral-500 md:text-lg">
            服务、AI 产品、技能、二手物品与校园信息。
            找到你需要的，也把你会的东西放到这里。
          </p>

          <div className="mt-10 flex max-w-3xl overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm focus-within:border-black/20 focus-within:shadow-md">
            <div className="flex items-center pl-5 text-neutral-400">
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
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <input
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSearchClick();
                }
              }}
              placeholder="搜索服务、商品、AI 产品、作者……"
              className="min-w-0 flex-1 bg-transparent px-3 py-4 text-sm outline-none placeholder:text-neutral-400"
            />
            {query && (
              <button
                type="button"
                onClick={onClear}
                className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/5 text-neutral-400 transition hover:bg-black/10 hover:text-black"
                aria-label="清空搜索"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3.5 w-3.5"
                >
                    <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            )}

            <button
              onClick={() => onSearchClick()}
              className="m-1 rounded-xl bg-[#171717] px-6 text-sm font-semibold text-white transition hover:bg-black/80"
            >
              搜索
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {["技术", "AI", "二手", "求职"].map((name) => (
              <button
                key={name}
                onClick={() => {
                  document
                    .getElementById("categories")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="rounded-full border border-black/10 bg-white px-3.5 py-2 text-xs text-neutral-500 transition hover:border-black/20 hover:text-black"
              >
                #{name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}