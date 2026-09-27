type CategoryFilterProps = {
  categories: ReadonlyArray<readonly [string, string]>;
  active: string;
  onCategoryChange: (category: string) => void;
};

export default function CategoryFilter({
  categories,
  active,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map(([name, description]) => {
        const activeState = active === name;

        return (
          <button
            key={name}
            onClick={() => {
              onCategoryChange(name);
              document
                .getElementById("directory")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className={`rounded-full border px-4 py-2.5 text-sm transition ${
              activeState
                ? "border-[#171717] bg-[#171717] text-white"
                : "border-black/10 bg-white text-neutral-500 hover:border-black/20 hover:text-black"
            }`}
          >
            <span className="font-semibold">{name}</span>
            <span className="ml-2 text-xs opacity-60">{description}</span>
          </button>
        );
      })}
    </div>
  );
}