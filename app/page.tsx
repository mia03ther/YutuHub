"use client";

import { useMemo, useState } from "react";
import { items, categories, type Item } from "@/lib/mock-data";
import { addFavorite, getFavorites, removeFavorite } from "@/lib/storage";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import CategoryFilter from "@/components/category-filter";
import ItemGrid from "@/components/item-grid";
import Modal from "@/components/modal";
import PublishModal from "@/components/publish-modal";
import PublishCTA from "@/components/publish-cta";
import Footer from "@/components/footer";

export default function Home() {
  const [category, setCategory] = useState("全部");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("推荐");
  const [selected, setSelected] = useState<Item | null>(null);
  const [publishOpen, setPublishOpen] = useState(false);
  const [favoredIds, setFavoredIds] = useState<number[]>(() => getFavorites());

  const toggleFavorite = (item: Item) => {
    setFavoredIds((prev) => {
      const exists = prev.includes(item.id);
      const next = exists
        ? removeFavorite(item.id)
        : addFavorite(item.id);
      return next;
    });
  };

  const filteredItems = useMemo(() => {
    let result = items.filter((item) => {
      const categoryMatch =
        category === "全部" || item.category === category;

      const q = query.trim().toLowerCase();

      const queryMatch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.owner.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);

      return categoryMatch && queryMatch;
    });

    if (sort === "字母序") {
      result = [...result].sort((a, b) =>
        a.title.localeCompare(b.title, "zh-Hans-CN"),
      );
    }

    if (sort === "随机") {
      // eslint-disable-next-line react-hooks/purity
      result = [...result].sort(() => Math.random() - 0.5);
    }

    return result;
  }, [category, query, sort]);

  const randomItem = () => {
    const item = items[Math.floor(Math.random() * items.length)];
    setSelected(item);
  };

  return (
    <main className="min-h-screen bg-[#f7f7f5] text-[#171717]">
      <Navbar
        onPublishClick={() => setPublishOpen(true)}
        onRandomClick={randomItem}
      />

      <Hero
        query={query}
        onQueryChange={setQuery}
        onClear={() => setQuery("")}
        onSearchClick={() =>
          document.getElementById("directory")?.scrollIntoView({ behavior: "smooth" })
        }
      />

      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["08", "当前内容"],
            ["07", "探索方向"],
            ["06", "服务类型"],
            ["∞", "校园需求"],
          ].map(([number, label]) => (
            <div
              key={label}
              className="rounded-3xl border border-black/5 bg-white p-6"
            >
              <div className="text-3xl font-black tracking-tight">
                {number}
              </div>
              <div className="mt-2 text-sm text-neutral-400">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section
        id="categories"
        className="mx-auto max-w-7xl px-5 py-16 md:px-8"
      >
        <div className="mb-8">
          <div className="text-xs font-semibold tracking-[0.2em] text-neutral-400">
            CATEGORIES
          </div>
          <h2 className="mt-3 text-3xl font-black">赛道与生态</h2>
        </div>

        <CategoryFilter
          categories={categories}
          active={category}
          onCategoryChange={setCategory}
        />
      </section>

      <section
        id="directory"
        className="border-y border-black/5 bg-white"
      >
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-xs font-semibold tracking-[0.2em] text-neutral-400">
                DISCOVER
              </div>

              <h2 className="mt-3 text-3xl font-black">
                {category === "全部" ? "正在发生" : `${category} · 内容`}
              </h2>
            </div>

            <div className="flex gap-2">
              {["推荐", "字母序", "随机"].map((value) => (
                <button
                  key={value}
                  onClick={() => setSort(value)}
                  className={`rounded-full border px-4 py-2 text-xs transition ${
                    sort === value
                      ? "border-black bg-black text-white"
                      : "border-black/10 bg-white text-neutral-500"
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          <ItemGrid
            items={filteredItems}
            favoredIds={favoredIds}
            onToggleFavorite={toggleFavorite}
            onItemSelect={setSelected}
            emptyLabel={
              query
                ? `没有找到相关内容，试试其他关键词。`
                : "没有找到匹配内容，试试其他分类。"
            }
            emptyActionLabel="浏览全部商品"
            onEmptyAction={() => {
              setQuery("");
              setCategory("全部");
            }}
          />
        </div>
      </section>

      <PublishCTA />

      <Footer />

      <Modal
        item={selected}
        favored={selected ? favoredIds.includes(selected.id) : false}
        onToggleFavorite={(item) => {
          toggleFavorite(item);
        }}
        onClose={() => setSelected(null)}
      />

      <PublishModal
        open={publishOpen}
        onClose={() => setPublishOpen(false)}
      />
    </main>
  );
}