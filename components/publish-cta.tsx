export default function PublishCTA() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
      <div className="rounded-[2rem] bg-[#171717] p-8 text-white md:p-12">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold tracking-[0.2em] text-neutral-500">
            BUILD ON CAMPUS
          </div>

          <h2 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">
            有技能？
            <br />
            有产品？
            <br />
            有闲置？
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-7 text-neutral-400">
            发布到屿途知汇，让校园里的需求找到真正能解决问题的人。
          </p>

          <button
            onClick={() =>
              document
                .getElementById("directory")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="mt-8 rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition hover:bg-neutral-200"
          >
            创建一个发布 →
          </button>
        </div>
      </div>
    </section>
  );
}