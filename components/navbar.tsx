type NavbarProps = {
  onPublishClick: () => void;
  onRandomClick: () => void;
};

export default function Navbar({ onPublishClick, onRandomClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-[#f7f7f5]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="text-left"
        >
          <div className="text-xl font-black tracking-tight">屿途知汇</div>
          <div className="text-[10px] uppercase tracking-[0.35em] text-neutral-400">
            YU TU ZHI HUI
          </div>
        </button>

        <nav className="hidden items-center gap-7 text-sm text-neutral-500 md:flex">
          <button
            onClick={() =>
              document
                .getElementById("directory")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="transition hover:text-black"
          >
            浏览
          </button>

          <button
            onClick={() =>
              document
                .getElementById("categories")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="transition hover:text-black"
          >
            分类
          </button>

          <button
            onClick={() => onRandomClick()}
            className="transition hover:text-black"
          >
            随机逛
          </button>
        </nav>

        <button
          onClick={() => onPublishClick()}
          className="rounded-full bg-[#171717] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-black/75"
        >
          发布
        </button>
      </div>
    </header>
  );
}