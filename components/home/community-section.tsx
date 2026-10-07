const ROW_A = ["课程经验", "校园美食", "二手交易", "课程经验", "校园美食"];
const ROW_B = ["校园服务", "学生社区", "真实信息", "校园服务", "学生社区"];
const principles = ["真实经验", "匿名分享", "同校连接", "共同建设"];

export function CommunitySection() {
  return (
    <section
      id="community"
      className="relative overflow-hidden border-t border-[rgba(245,245,245,0.08)] bg-[#080808] text-[#f5f5f5]"
    >
      <div className="mx-auto max-w-6xl px-5 pt-32 sm:px-8 sm:pt-44">
        <div className="max-w-4xl">
          <p className="network-fade hx-caption">05 — Community</p>
          <h2 className="network-fade mt-6 text-[clamp(2.8rem,8vw,6.5rem)] font-semibold leading-[1.02] tracking-[-0.02em]">
            一座校园，
            <span className="block text-[#666666]">一起建设。</span>
          </h2>
          <p className="network-fade mt-8 max-w-2xl text-lg leading-8 text-[#8a8a8a] sm:text-2xl sm:leading-10">
            YutuHub 不制造热闹。它保存真实经验，
            让同校的人更容易互相帮到。
          </p>
        </div>
      </div>

      {/* Kinetic network rows drifting in opposite directions */}
      <div className="network-stage space-y-4 py-24 sm:py-32">
        <div className="network-row-a flex w-max items-center gap-10 whitespace-nowrap">
          {ROW_A.map((word, i) => (
            <span
              key={`${word}-${i}`}
              className={`text-[clamp(3rem,9vw,7.5rem)] font-semibold leading-none tracking-[-0.02em] ${
                i % 2 === 1 ? "hx-outline" : ""
              }`}
            >
              {word}
            </span>
          ))}
        </div>
        <div className="network-row-b flex w-max items-center gap-10 whitespace-nowrap">
          {ROW_B.map((word, i) => (
            <span
              key={`${word}-${i}`}
              className={`text-[clamp(3rem,9vw,7.5rem)] font-semibold leading-none tracking-[-0.02em] ${
                i % 2 === 0 ? "hx-outline" : ""
              }`}
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      <div className="network-principles mx-auto max-w-6xl px-5 pb-32 sm:px-8 sm:pb-44">
        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-4">
          {principles.map((item, index) => (
            <div
              key={item}
              className="network-fade border-t border-[rgba(245,245,245,0.16)] pt-5"
            >
              <span className="hx-accent font-mono text-xs">0{index + 1}</span>
              <p className="mt-2 text-2xl font-semibold tracking-tight">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
