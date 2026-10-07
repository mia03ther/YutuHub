const courses = [
  {
    id: "MATH101",
    name: "高等数学",
    nameEn: "Advanced Mathematics",
    meta: "林老师 · 工作量中高 · 评分示意 4.6",
    note: "作业强度大但反馈具体。把每周的习题整理成自己的错题本，期末会轻松很多。",
    outline: false,
  },
  {
    id: "CS201",
    name: "数据结构与算法",
    nameEn: "Data Structures",
    meta: "陈老师 · 讨论占比高 · 评分示意 4.8",
    note: "小组项目要早点找节奏。老师反馈很具体，愿意投入的话收获极大。",
    outline: true,
  },
  {
    id: "SOC118",
    name: "城市与社会观察",
    nameEn: "Urban Studies",
    meta: "周老师 · 阅读节奏稳定 · 评分示意 4.3",
    note: "适合和其他硬课搭配。讨论课占一半，期末压力不会突然爆炸。",
    outline: false,
  },
];

export function CourseSection() {
  return (
    <section
      id="course-guide"
      className="relative overflow-hidden bg-[#080808] px-5 py-32 text-[#f5f5f5] sm:px-8 sm:py-44"
    >
      <div className="section-head mx-auto max-w-6xl">
        <p className="head-fade hx-caption">02 — Course Guide</p>
        <h2 className="head-fade mt-6 text-[clamp(2.6rem,7vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.02em]">
          选课，不再<span className="hx-accent">开盲盒</span>。
        </h2>
        <p className="head-fade hx-caption mt-6">以下均为产品展示用示例内容</p>
      </div>

      <div className="mx-auto mt-24 max-w-6xl space-y-32 sm:space-y-44">
        {courses.map((course, index) => (
          <article
            key={course.id}
            className="world-course border-t border-[rgba(245,245,245,0.08)] pt-10"
          >
            <div className="world-detail flex items-baseline justify-between gap-4">
              <span className="hx-caption">{course.id}</span>
              <span className="hx-caption tabular-nums">0{index + 1} / 03</span>
            </div>

            {/* Giant magazine headline — keyword collapses into story */}
            <h3
              className={`world-name mt-6 text-[clamp(3.2rem,9vw,8rem)] font-semibold leading-[1.04] tracking-[-0.02em] ${
                course.outline ? "hx-outline" : ""
              }`}
            >
              {course.name}
            </h3>
            <p className="world-detail hx-caption mt-2">{course.nameEn}</p>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
              <p className="world-detail font-mono text-[13px] leading-6 text-[#8a8a8a]">
                {course.meta}
              </p>
              <blockquote className="world-detail border-l-2 border-[var(--lime)] pl-5 text-lg leading-8 text-[#f5f5f5]/90 sm:text-xl sm:leading-9">
                {course.note}
              </blockquote>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
