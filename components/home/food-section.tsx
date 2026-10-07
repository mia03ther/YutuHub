const stalls = [
  {
    index: "01",
    title: "热汤米饭",
    desc: "二楼靠窗窗口。晚课前稳定不踩雷。",
    tag: "今日推荐 · 示例",
  },
  {
    index: "02",
    title: "午高峰",
    desc: "别硬等，换窗口更快。",
    tag: "避雷提醒 · 示例",
  },
  {
    index: "03",
    title: "拼单",
    desc: "两个人拼一份刚好，分量足，晚一点会卖完。",
    tag: "真实评价 · 示例",
  },
  {
    index: "04",
    title: "校外小店",
    desc: "同学推荐的套餐、价格和踩雷点。",
    tag: "探店笔记 · 示例",
  },
];

export function FoodSection() {
  return (
    <section
      id="food-guide"
      className="relative overflow-hidden bg-[#080808] text-[#f5f5f5]"
    >
      <div className="food-track relative">
        <div className="mx-auto max-w-6xl px-5 py-32 sm:px-8 sm:py-44">
          <div className="scroll-reveal">
            <p className="hx-caption">03 — Food Guide</p>
            <h2 className="mt-6 max-w-4xl text-[clamp(2.6rem,7vw,5.5rem)] font-semibold leading-[1.04] tracking-[-0.02em]">
              干饭，是校园里
              <span className="block hx-outline">最诚实的评审现场。</span>
            </h2>
          </div>

          {/* Big poster block — zooms into place like a film shot */}
          <figure className="food-poster hx-poster mt-20 rounded-[2rem] px-6 py-24 text-center sm:px-12 sm:py-36">
            <div
              className="hx-halo left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 opacity-70"
              aria-hidden="true"
            />
            <figcaption className="food-fade hx-caption relative">
              Today&apos;s Canteen · 示例
            </figcaption>
            <p className="food-giant relative mt-10 text-[clamp(4rem,14vw,11rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
              食堂
              <span className="hx-accent">二楼</span>
            </p>
            <p className="food-fade relative mx-auto mt-10 max-w-md text-base leading-7 text-[#8a8a8a]">
              把窗口、小店和真实口味串起来。吃什么不是小事，
              以下均为产品展示用示例内容。
            </p>
          </figure>

          {/* Horizontal drifting stall strip */}
          <div className="mt-20 overflow-hidden">
            <div className="food-strip flex w-max min-w-0 gap-5">
              {stalls.map((stall) => (
                <article
                  key={stall.index}
                  className="w-[min(78vw,24rem)] shrink-0 rounded-[1.5rem] border border-[rgba(245,245,245,0.1)] bg-[#111111] p-6 sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <span className="hx-accent font-mono text-sm">
                      {stall.index}
                    </span>
                    <span className="hx-caption">{stall.tag}</span>
                  </div>
                  <h3 className="mt-10 text-3xl font-semibold tracking-tight sm:text-4xl">
                    {stall.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[#8a8a8a]">
                    {stall.desc}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
