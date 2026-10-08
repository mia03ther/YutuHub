import {
  LANGUAGE_NAMES,
  matchLanguage,
  SUPPORTED_LANGUAGES,
  type Language,
} from "@/lib/i18n/config";

export const SUPPORTED_LOCALES = SUPPORTED_LANGUAGES;
export const LOCALE_NAMES = LANGUAGE_NAMES;
export type HomeLocale = Language;

export type HomeCopy = {
  controls: {
    language: string;
    menu: string;
    close: string;
    theme: { label: string; system: string; light: string; dark: string };
  };
  nav: {
    information: string;
    course: string;
    food: string;
    market: string;
    community: string;
    publish: string;
    login: string;
    register: string;
    profile: string;
  };
  hero: {
    location: string;
    commons: string;
    eyebrow: string;
    taglineLead: string;
    taglineAccent: string;
    description: string;
    explore: string;
    join: string;
    portalLabel: string;
    portalStatus: string;
    transitionLead: string;
    transitionAccent: string;
  };
  story: {
    chapter: string;
    kicker: string;
    eyebrow: string;
    titleParts: readonly [string, string, string];
    body: string;
    notes: readonly { code: string; text: string }[];
    categories: readonly string[];
  };
  course: {
    chapter: string;
    titleLead: string;
    titleAccent: string;
    disclaimer: string;
    items: readonly { id: string; name: string; nameEn: string; meta: string; note: string }[];
  };
  food: {
    chapter: string;
    titleLead: string;
    titleAccent: string;
    posterLabel: string;
    posterMain: string;
    posterAccent: string;
    description: string;
    stalls: readonly { index: string; title: string; desc: string; tag: string }[];
  };
  market: {
    chapter: string;
    titleLead: string;
    titleAccent: string;
    description: string;
    preview: string;
    items: readonly { index: string; title: string; en: string; desc: string }[];
  };
  community: {
    chapter: string;
    titleLead: string;
    titleAccent: string;
    description: string;
    rows: readonly [readonly string[], readonly string[]];
    principles: readonly string[];
  };
  final: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    description: string;
    explore: string;
    publish: string;
    marquee: readonly string[];
  };
};

const zhCN: HomeCopy = {
  controls: { language: "语言", menu: "打开菜单", close: "关闭菜单", theme: { label: "外观", system: "跟随系统", light: "浅色", dark: "深色" } },
  nav: { information: "信息", course: "选课", food: "干饭", market: "校园经济", community: "社区", publish: "发布内容", login: "登录", register: "注册", profile: "个人中心" },
  hero: {
    location: "广外 · 23.1345° N", commons: "校园信息共同体", eyebrow: "Yutu Portal / 屿途信息之门",
    taglineLead: "让校园里的真实信息，", taglineAccent: "重新流动起来。",
    description: "从一条课程经验到一次校园互助，把散落的信息连成每个人都能抵达的路。",
    explore: "进入信息流", join: "加入共建", portalLabel: "真实经验入口", portalStatus: "连接中 · GDUFS",
    transitionLead: "分散的经验，", transitionAccent: "正在成为共同的路。",
  },
  story: {
    chapter: "01 — 分散的信息", kicker: "从碎片到共享知识", eyebrow: "校园信息不是噪音",
    titleParts: ["散落的校园经验，", "应该成为", "共同的路。"],
    body: "把聊天记录、口头经验与个人笔记里的有效信息沉淀下来，让它被找到、被补充，也被下一位同学再次使用。",
    notes: [
      { code: "C-014", text: "选课群里一闪而过的老师评价" }, { code: "F-072", text: "饭点前才想起问：今天吃什么" },
      { code: "M-031", text: "毕业季散在朋友圈里的闲置" }, { code: "S-008", text: "临时通知里错过的校园服务" },
    ], categories: ["选课", "干饭", "交易", "社区"],
  },
  course: {
    chapter: "02 — 选课指南", titleLead: "选课，不再", titleAccent: "开盲盒。", disclaimer: "以下均为产品展示用示例内容",
    items: [
      { id: "MATH101", name: "高等数学", nameEn: "Advanced Mathematics", meta: "林老师 · 工作量中高 · 评分示意 4.6", note: "作业强度大但反馈具体。把每周习题整理成自己的错题本，期末会轻松很多。" },
      { id: "CS201", name: "数据结构与算法", nameEn: "Data Structures", meta: "陈老师 · 讨论占比高 · 评分示意 4.8", note: "小组项目要早点找节奏。老师反馈很具体，愿意投入的话收获极大。" },
      { id: "SOC118", name: "城市与社会观察", nameEn: "Urban Studies", meta: "周老师 · 阅读节奏稳定 · 评分示意 4.3", note: "适合和其他硬课搭配。讨论课占一半，期末压力不会突然爆炸。" },
    ],
  },
  food: {
    chapter: "03 — 干饭指南", titleLead: "干饭，是校园里", titleAccent: "最诚实的评审现场。", posterLabel: "今日食堂 · 示例", posterMain: "食堂", posterAccent: "二楼",
    description: "把窗口、小店和真实口味串起来。吃什么不是小事，以下均为产品展示用示例内容。",
    stalls: [
      { index: "01", title: "热汤米饭", desc: "二楼靠窗窗口。晚课前稳定不踩雷。", tag: "今日推荐 · 示例" },
      { index: "02", title: "午高峰", desc: "别硬等，换窗口更快。", tag: "避雷提醒 · 示例" },
      { index: "03", title: "拼单", desc: "两个人拼一份刚好，分量足，晚一点会卖完。", tag: "真实评价 · 示例" },
      { index: "04", title: "校外小店", desc: "同学推荐的套餐、价格和踩雷点。", tag: "探店笔记 · 示例" },
    ],
  },
  market: {
    chapter: "04 — 校园经济", titleLead: "校园里的需求，", titleAccent: "应该被看见。", description: "从一笔闲置流转到一个活动入口——生态正在生长，这里是预告。", preview: "展示入口 · 敬请期待",
    items: [
      { index: "01", title: "二手交易", en: "Marketplace", desc: "课本、数码、日用品，让闲置在同校流转。" },
      { index: "02", title: "校园服务", en: "Services", desc: "代取、拼车、临时协作，需求有明确去处。" },
      { index: "03", title: "校园活动", en: "Events", desc: "讲座、社团、比赛、招募，重要信息不被刷走。" },
      { index: "04", title: "校园猫咪", en: "Campus Cats", desc: "记录熟悉的小身影，也记录校园共同记忆。" },
    ],
  },
  community: {
    chapter: "05 — 社区", titleLead: "一座校园，", titleAccent: "一起建设。", description: "YutuHub 不制造热闹。它保存真实经验，让同校的人更容易互相帮到。",
    rows: [["课程经验", "校园美食", "二手交易", "课程经验", "校园美食"], ["校园服务", "学生社区", "真实信息", "校园服务", "学生社区"]],
    principles: ["真实经验", "匿名分享", "同校连接", "共同建设"],
  },
  final: { eyebrow: "一座校园，共享路径", titleLead: "校园，", titleAccent: "重新连接。", description: "每一条真实经验，都会成为下一个人的路标。", explore: "开始探索", publish: "发布第一条内容", marquee: ["YuTuHub", "校园经验共同体", "让真实信息流动起来", "Campus Commons"] },
};

const en: HomeCopy = {
  controls: { language: "Language", menu: "Open menu", close: "Close menu", theme: { label: "Appearance", system: "System", light: "Light", dark: "Dark" } },
  nav: { information: "Signals", course: "Courses", food: "Food", market: "Campus life", community: "Community", publish: "Publish", login: "Log in", register: "Join", profile: "Profile" },
  hero: { location: "GDUFS · 23.1345° N", commons: "Campus information commons", eyebrow: "Yutu Portal / Gateway to campus knowledge", taglineLead: "Let real campus knowledge", taglineAccent: "move again.", description: "From one course tip to a timely helping hand, we turn scattered knowledge into routes everyone can follow.", explore: "Enter the flow", join: "Build with us", portalLabel: "Gateway to lived knowledge", portalStatus: "Linking · GDUFS", transitionLead: "Scattered experience", transitionAccent: "becomes a shared route." },
  story: { chapter: "01 — Scattered signals", kicker: "From fragments to commons", eyebrow: "Campus information is not noise", titleParts: ["Scattered campus experience", "should become", "a shared route."], body: "Bring useful details out of chats, conversations, and private notes so they can be found, improved, and used again by the next student.", notes: [{ code: "C-014", text: "A teacher review that vanished in the course chat" }, { code: "F-072", text: "The last-minute question: what should we eat?" }, { code: "M-031", text: "Graduation-season items lost in social feeds" }, { code: "S-008", text: "Campus services missed in a passing notice" }], categories: ["COURSES", "FOOD", "MARKET", "COMMUNITY"] },
  course: { chapter: "02 — Course guide", titleLead: "Choose courses without", titleAccent: "guesswork.", disclaimer: "All entries below are illustrative product content", items: [{ id: "MATH101", name: "Advanced Mathematics", nameEn: "Foundations & problem solving", meta: "Prof. Lin · Medium-high workload · Demo rating 4.6", note: "The workload is real, but the feedback is precise. A weekly error log makes finals much easier." }, { id: "CS201", name: "Data Structures", nameEn: "Algorithms in practice", meta: "Prof. Chen · Discussion-led · Demo rating 4.8", note: "Find a rhythm with your team early. The feedback is concrete, and the return on effort is excellent." }, { id: "SOC118", name: "Urban Studies", nameEn: "City & society", meta: "Prof. Zhou · Steady reading pace · Demo rating 4.3", note: "A good match for heavier courses. Discussion carries half the class, so finals do not arrive as a shock." }] },
  food: { chapter: "03 — Food guide", titleLead: "Eating is campus life’s", titleAccent: "most honest review.", posterLabel: "Today’s canteen · Demo", posterMain: "Canteen", posterAccent: "Level 2", description: "Connect stalls, nearby shops, and honest tastes. Choosing lunch matters; all entries are illustrative.", stalls: [{ index: "01", title: "Rice & hot soup", desc: "Window-side stall upstairs. Reliable before an evening class.", tag: "Today’s pick · Demo" }, { index: "02", title: "Lunch rush", desc: "Do not wait forever; another counter is faster.", tag: "Timing tip · Demo" }, { index: "03", title: "Share a set", desc: "Right for two, generous, and often sold out late.", tag: "Student review · Demo" }, { index: "04", title: "Off-campus finds", desc: "Student-recommended sets, prices, and honest warnings.", tag: "Food note · Demo" }] },
  market: { chapter: "04 — Campus exchange", titleLead: "Campus needs", titleAccent: "deserve to be seen.", description: "From a second-hand exchange to a way into campus events—the ecosystem is taking shape. Here is a preview.", preview: "Preview · Coming soon", items: [{ index: "01", title: "Marketplace", en: "Second-hand exchange", desc: "Keep books, devices, and daily goods moving within campus." }, { index: "02", title: "Campus services", en: "Services", desc: "Pickups, shared rides, and quick collaboration with a clear destination." }, { index: "03", title: "Events", en: "Campus events", desc: "Talks, clubs, competitions, and calls that do not disappear in a feed." }, { index: "04", title: "Campus cats", en: "Shared memories", desc: "Remember familiar paws—and the campus memory around them." }] },
  community: { chapter: "05 — Community", titleLead: "One campus,", titleAccent: "built together.", description: "YutuHub does not manufacture noise. It preserves lived experience so people on the same campus can help each other more easily.", rows: [["COURSE NOTES", "CAMPUS FOOD", "MARKETPLACE", "COURSE NOTES", "CAMPUS FOOD"], ["CAMPUS SERVICES", "STUDENT COMMUNITY", "REAL KNOWLEDGE", "CAMPUS SERVICES", "STUDENT COMMUNITY"]], principles: ["Lived experience", "Anonymous sharing", "Campus connection", "Built together"] },
  final: { eyebrow: "One campus, shared routes", titleLead: "Campus,", titleAccent: "reconnected.", description: "Every honest experience can become a signpost for the next student.", explore: "Start exploring", publish: "Share your first note", marquee: ["YuTuHub", "Campus experience commons", "Let real knowledge move", "Campus Commons"] },
};

const ja: HomeCopy = {
  ...en,
  controls: { language: "言語", menu: "メニューを開く", close: "メニューを閉じる", theme: { label: "外観", system: "システム", light: "ライト", dark: "ダーク" } },
  nav: { information: "情報", course: "履修", food: "食事", market: "キャンパス", community: "コミュニティ", publish: "投稿する", login: "ログイン", register: "登録", profile: "プロフィール" },
  hero: { location: "広東外大 · 23.1345° N", commons: "キャンパス情報コモンズ", eyebrow: "Yutu Portal / キャンパス知への入口", taglineLead: "キャンパスの確かな情報を、", taglineAccent: "もう一度めぐらせる。", description: "ひとつの履修体験から助け合いまで。散らばった知恵を、誰もがたどれる道へ変えます。", explore: "情報の流れへ", join: "一緒につくる", portalLabel: "実体験への入口", portalStatus: "接続中 · GDUFS", transitionLead: "散らばった経験が、", transitionAccent: "みんなの道になる。" },
  story: { chapter: "01 — 散らばる情報", kicker: "断片から共有知へ", eyebrow: "キャンパス情報はノイズではない", titleParts: ["散らばったキャンパスの経験は、", "みんなで使える", "道になる。"], body: "チャットや会話、個人メモにある有用な情報を残し、見つけ、補い、次の学生がまた使えるようにします。", notes: [{ code: "C-014", text: "履修チャットですぐ流れた先生の評判" }, { code: "F-072", text: "食事前に慌てて聞く「今日は何を食べる？」" }, { code: "M-031", text: "卒業シーズンの投稿に埋もれた不用品" }, { code: "S-008", text: "一時的な通知で見逃した学内サービス" }], categories: ["履修", "食事", "取引", "コミュニティ"] },
  course: { ...en.course, chapter: "02 — 履修ガイド", titleLead: "履修選びを、", titleAccent: "運任せにしない。", disclaimer: "以下はすべて製品紹介用のサンプルです", items: [{ id: "MATH101", name: "高等数学", nameEn: "Advanced Mathematics", meta: "林先生 · 課題量やや多め · サンプル評価 4.6", note: "課題は多めですが、フィードバックは具体的。毎週の間違いをまとめると期末が楽になります。" }, { id: "CS201", name: "データ構造とアルゴリズム", nameEn: "Data Structures", meta: "陳先生 · ディスカッション中心 · サンプル評価 4.8", note: "グループ課題は早めにリズムを作るのが大切。投入した分だけ大きな学びがあります。" }, { id: "SOC118", name: "都市と社会", nameEn: "Urban Studies", meta: "周先生 · 安定した読書量 · サンプル評価 4.3", note: "重い科目との組み合わせに向いています。討論が半分なので、期末だけ急に重くなりません。" }] },
  food: { ...en.food, chapter: "03 — 食事ガイド", titleLead: "食事はキャンパスで", titleAccent: "いちばん正直なレビュー。", posterLabel: "今日の食堂 · サンプル", posterMain: "食堂", posterAccent: "2階", description: "窓口や店、本音の味覚をつなぎます。何を食べるかは大切。以下は紹介用サンプルです。", stalls: [{ index: "01", title: "温かい汁物とご飯", desc: "2階の窓側。夜の授業前にも安心。", tag: "今日のおすすめ · サンプル" }, { index: "02", title: "昼のピーク", desc: "無理に待たず、別の窓口へ。", tag: "混雑メモ · サンプル" }, { index: "03", title: "シェアセット", desc: "2人にちょうどよく、遅い時間は売り切れがち。", tag: "学生レビュー · サンプル" }, { index: "04", title: "学外の店", desc: "学生おすすめのセット、価格、注意点。", tag: "食べ歩きメモ · サンプル" }] },
  market: { ...en.market, chapter: "04 — キャンパス循環", titleLead: "学内のニーズは、", titleAccent: "見えるべきだ。", description: "不用品の循環からイベントの入口まで。育ちつつある生態系の予告です。", preview: "プレビュー · 近日公開", items: [{ index: "01", title: "中古取引", en: "Marketplace", desc: "教科書、デジタル機器、日用品を学内で循環させます。" }, { index: "02", title: "学内サービス", en: "Services", desc: "受け取り、相乗り、短期協力を必要な人へ。" }, { index: "03", title: "学内イベント", en: "Events", desc: "講演、サークル、大会、募集を流さない。" }, { index: "04", title: "キャンパス猫", en: "Campus Cats", desc: "見慣れた姿と、みんなの記憶を残します。" }] },
  community: { ...en.community, chapter: "05 — コミュニティ", titleLead: "ひとつのキャンパスを、", titleAccent: "一緒につくる。", description: "YutuHub は騒がしさを作りません。実体験を残し、同じキャンパスの人同士が助け合いやすくします。", rows: [["履修経験", "キャンパスごはん", "中古取引", "履修経験", "キャンパスごはん"], ["学内サービス", "学生コミュニティ", "確かな情報", "学内サービス", "学生コミュニティ"]], principles: ["実体験", "匿名共有", "学内のつながり", "共同でつくる"] },
  final: { eyebrow: "ひとつのキャンパス、共有する道", titleLead: "キャンパスを、", titleAccent: "もう一度つなぐ。", description: "一つひとつの確かな経験が、次の人の道しるべになります。", explore: "探索を始める", publish: "最初の情報を投稿", marquee: ["YuTuHub", "キャンパス経験コモンズ", "確かな情報をめぐらせる", "Campus Commons"] },
};

const ko: HomeCopy = {
  ...en,
  controls: { language: "언어", menu: "메뉴 열기", close: "메뉴 닫기", theme: { label: "화면", system: "시스템", light: "라이트", dark: "다크" } },
  nav: { information: "정보", course: "수강", food: "식사", market: "캠퍼스", community: "커뮤니티", publish: "게시하기", login: "로그인", register: "가입", profile: "프로필" },
  hero: { location: "광둥외대 · 23.1345° N", commons: "캠퍼스 정보 커먼즈", eyebrow: "Yutu Portal / 캠퍼스 지식의 문", taglineLead: "캠퍼스의 진짜 정보를", taglineAccent: "다시 흐르게.", description: "한 줄의 수강 경험부터 작은 도움까지, 흩어진 지식을 누구나 따라갈 수 있는 길로 만듭니다.", explore: "정보 흐름으로", join: "함께 만들기", portalLabel: "실제 경험으로 가는 문", portalStatus: "연결 중 · GDUFS", transitionLead: "흩어진 경험이", transitionAccent: "모두의 길이 됩니다." },
  story: { chapter: "01 — 흩어진 신호", kicker: "조각에서 공동 지식으로", eyebrow: "캠퍼스 정보는 소음이 아닙니다", titleParts: ["흩어진 캠퍼스 경험은", "모두가 쓰는", "길이 되어야 합니다."], body: "채팅, 대화, 개인 메모의 유용한 정보를 남겨 누구나 찾고 보완하며 다음 학생이 다시 쓸 수 있게 합니다.", notes: [{ code: "C-014", text: "수강 채팅에서 금세 사라진 교수 평가" }, { code: "F-072", text: "식사 직전에 묻는 ‘오늘 뭐 먹지?’" }, { code: "M-031", text: "졸업철 피드에 흩어진 중고 물품" }, { code: "S-008", text: "짧은 공지에서 놓친 캠퍼스 서비스" }], categories: ["수강", "식사", "거래", "커뮤니티"] },
  course: { ...en.course, chapter: "02 — 수강 가이드", titleLead: "수강 신청을", titleAccent: "운에 맡기지 마세요.", disclaimer: "아래 내용은 모두 제품 소개용 예시입니다", items: [{ id: "MATH101", name: "고등수학", nameEn: "Advanced Mathematics", meta: "린 교수 · 과제 중상 · 예시 평점 4.6", note: "과제는 많지만 피드백이 구체적입니다. 매주 오답을 정리하면 기말이 훨씬 수월해집니다." }, { id: "CS201", name: "자료구조와 알고리즘", nameEn: "Data Structures", meta: "천 교수 · 토론 비중 높음 · 예시 평점 4.8", note: "팀 프로젝트는 일찍 호흡을 맞추세요. 피드백이 구체적이고 노력한 만큼 크게 배웁니다." }, { id: "SOC118", name: "도시와 사회", nameEn: "Urban Studies", meta: "저우 교수 · 꾸준한 읽기 · 예시 평점 4.3", note: "무거운 전공과 함께 듣기 좋습니다. 토론이 절반이라 기말 부담이 갑자기 커지지 않습니다." }] },
  food: { ...en.food, chapter: "03 — 식사 가이드", titleLead: "한 끼는 캠퍼스의", titleAccent: "가장 솔직한 리뷰.", posterLabel: "오늘의 식당 · 예시", posterMain: "학생식당", posterAccent: "2층", description: "창구와 주변 식당, 솔직한 입맛을 연결합니다. 무엇을 먹을지는 중요한 일입니다.", stalls: [{ index: "01", title: "따뜻한 국과 밥", desc: "2층 창가 쪽. 저녁 수업 전에도 안정적입니다.", tag: "오늘의 추천 · 예시" }, { index: "02", title: "점심 피크", desc: "무작정 기다리지 말고 다른 창구로 가세요.", tag: "혼잡 팁 · 예시" }, { index: "03", title: "나눔 세트", desc: "두 명에게 알맞고 늦으면 품절됩니다.", tag: "학생 리뷰 · 예시" }, { index: "04", title: "학교 밖 맛집", desc: "학생 추천 메뉴와 가격, 주의점을 모았습니다.", tag: "맛집 노트 · 예시" }] },
  market: { ...en.market, chapter: "04 — 캠퍼스 순환", titleLead: "캠퍼스의 필요는", titleAccent: "보여야 합니다.", description: "중고 거래부터 행사 입구까지, 자라나는 생태계를 미리 만나보세요.", preview: "미리보기 · 곧 공개", items: [{ index: "01", title: "중고 거래", en: "Marketplace", desc: "교재, 디지털 기기, 생활용품이 교내에서 순환합니다." }, { index: "02", title: "캠퍼스 서비스", en: "Services", desc: "대리 수령, 카풀, 짧은 협업을 필요한 곳으로 연결합니다." }, { index: "03", title: "캠퍼스 행사", en: "Events", desc: "강연, 동아리, 대회, 모집 정보를 놓치지 않습니다." }, { index: "04", title: "캠퍼스 고양이", en: "Campus Cats", desc: "익숙한 작은 모습과 공동의 기억을 기록합니다." }] },
  community: { ...en.community, chapter: "05 — 커뮤니티", titleLead: "하나의 캠퍼스를", titleAccent: "함께 만듭니다.", description: "YutuHub는 소음을 만들지 않습니다. 실제 경험을 남겨 같은 캠퍼스 사람들이 더 쉽게 서로 돕게 합니다.", rows: [["수강 경험", "캠퍼스 음식", "중고 거래", "수강 경험", "캠퍼스 음식"], ["캠퍼스 서비스", "학생 커뮤니티", "진짜 정보", "캠퍼스 서비스", "학생 커뮤니티"]], principles: ["실제 경험", "익명 공유", "교내 연결", "함께 만들기"] },
  final: { eyebrow: "하나의 캠퍼스, 함께 쓰는 길", titleLead: "캠퍼스를", titleAccent: "다시 연결합니다.", description: "모든 진짜 경험은 다음 사람의 이정표가 됩니다.", explore: "둘러보기", publish: "첫 정보 공유하기", marquee: ["YuTuHub", "캠퍼스 경험 커먼즈", "진짜 정보를 흐르게", "Campus Commons"] },
};

const es: HomeCopy = {
  ...en,
  controls: { language: "Idioma", menu: "Abrir menú", close: "Cerrar menú", theme: { label: "Apariencia", system: "Sistema", light: "Claro", dark: "Oscuro" } },
  nav: { information: "Señales", course: "Asignaturas", food: "Comida", market: "Campus", community: "Comunidad", publish: "Publicar", login: "Entrar", register: "Unirse", profile: "Perfil" },
  hero: { location: "GDUFS · 23.1345° N", commons: "Bien común de información universitaria", eyebrow: "Yutu Portal / Puerta al conocimiento del campus", taglineLead: "Que la información real del campus", taglineAccent: "vuelva a fluir.", description: "De un consejo sobre una asignatura a una ayuda a tiempo: convertimos saberes dispersos en caminos que todos pueden seguir.", explore: "Entrar en el flujo", join: "Construir juntos", portalLabel: "Puerta a experiencias reales", portalStatus: "Conectando · GDUFS", transitionLead: "La experiencia dispersa", transitionAccent: "se vuelve un camino común." },
  story: { chapter: "01 — Señales dispersas", kicker: "De fragmentos a saber común", eyebrow: "La información del campus no es ruido", titleParts: ["Las experiencias dispersas", "deberían convertirse en", "un camino común."], body: "Rescatamos lo útil de chats, conversaciones y notas para que pueda encontrarse, mejorarse y servir de nuevo al siguiente estudiante.", notes: [{ code: "C-014", text: "Una opinión docente perdida en el chat de clase" }, { code: "F-072", text: "La pregunta de última hora: ¿qué comemos hoy?" }, { code: "M-031", text: "Objetos de graduación perdidos en las redes" }, { code: "S-008", text: "Servicios del campus ocultos en un aviso fugaz" }], categories: ["ASIGNATURAS", "COMIDA", "MERCADO", "COMUNIDAD"] },
  course: { ...en.course, chapter: "02 — Guía de asignaturas", titleLead: "Elige asignaturas sin", titleAccent: "jugar a ciegas.", disclaimer: "Todo el contenido siguiente es ilustrativo", items: [{ id: "MATH101", name: "Matemáticas avanzadas", nameEn: "Advanced Mathematics", meta: "Prof. Lin · Carga media-alta · Nota de muestra 4,6", note: "Hay bastante trabajo, pero la devolución es precisa. Un registro semanal de errores facilita mucho los exámenes." }, { id: "CS201", name: "Estructuras de datos", nameEn: "Data Structures", meta: "Prof. Chen · Mucho debate · Nota de muestra 4,8", note: "Encuentra pronto el ritmo del equipo. La orientación es concreta y el esfuerzo se recompensa." }, { id: "SOC118", name: "Ciudad y sociedad", nameEn: "Urban Studies", meta: "Prof. Zhou · Lectura constante · Nota de muestra 4,3", note: "Combina bien con materias exigentes. La mitad es debate, así que el final no llega de golpe." }] },
  food: { ...en.food, chapter: "03 — Guía de comida", titleLead: "Comer es la reseña", titleAccent: "más sincera del campus.", posterLabel: "Comedor de hoy · Ejemplo", posterMain: "Comedor", posterAccent: "Planta 2", description: "Conectamos puestos, locales cercanos y opiniones sinceras. Elegir qué comer importa; estos datos son ilustrativos.", stalls: [{ index: "01", title: "Arroz y sopa caliente", desc: "Puesto junto a la ventana. Seguro antes de clase.", tag: "Recomendación · Ejemplo" }, { index: "02", title: "Hora punta", desc: "No esperes de más: otra ventanilla va más rápido.", tag: "Aviso · Ejemplo" }, { index: "03", title: "Menú para compartir", desc: "Perfecto para dos y suele agotarse tarde.", tag: "Reseña real · Ejemplo" }, { index: "04", title: "Fuera del campus", desc: "Menús, precios y advertencias de estudiantes.", tag: "Nota gastronómica · Ejemplo" }] },
  market: { ...en.market, chapter: "04 — Intercambio universitario", titleLead: "Las necesidades del campus", titleAccent: "merecen verse.", description: "De intercambiar un objeto a entrar en un evento: el ecosistema está creciendo. Este es un adelanto.", preview: "Adelanto · Próximamente", items: [{ index: "01", title: "Segunda mano", en: "Marketplace", desc: "Libros, dispositivos y objetos siguen circulando en el campus." }, { index: "02", title: "Servicios", en: "Campus services", desc: "Recogidas, viajes compartidos y colaboraciones rápidas." }, { index: "03", title: "Actividades", en: "Events", desc: "Charlas, clubes, concursos y convocatorias que no se pierden." }, { index: "04", title: "Gatos del campus", en: "Campus Cats", desc: "Guardamos sus pequeñas historias y la memoria común." }] },
  community: { ...en.community, chapter: "05 — Comunidad", titleLead: "Un campus,", titleAccent: "construido en común.", description: "YutuHub no fabrica ruido. Conserva experiencias reales para que quienes comparten campus puedan ayudarse mejor.", rows: [["EXPERIENCIAS DE CLASE", "COMIDA", "SEGUNDA MANO", "EXPERIENCIAS DE CLASE", "COMIDA"], ["SERVICIOS", "COMUNIDAD", "INFORMACIÓN REAL", "SERVICIOS", "COMUNIDAD"]], principles: ["Experiencia real", "Aporte anónimo", "Conexión local", "Construcción común"] },
  final: { eyebrow: "Un campus, caminos compartidos", titleLead: "El campus,", titleAccent: "reconectado.", description: "Cada experiencia sincera puede orientar al siguiente estudiante.", explore: "Empezar a explorar", publish: "Comparte tu primera nota", marquee: ["YuTuHub", "Experiencias en común", "Que fluya la información real", "Campus Commons"] },
};

const fr: HomeCopy = {
  ...en,
  controls: { language: "Langue", menu: "Ouvrir le menu", close: "Fermer le menu", theme: { label: "Apparence", system: "Système", light: "Clair", dark: "Sombre" } },
  nav: { information: "Signaux", course: "Cours", food: "Manger", market: "Campus", community: "Communauté", publish: "Publier", login: "Connexion", register: "Rejoindre", profile: "Profil" },
  hero: { location: "GDUFS · 23.1345° N", commons: "Communs de l’information étudiante", eyebrow: "Yutu Portal / Porte du savoir étudiant", taglineLead: "Faire circuler à nouveau", taglineAccent: "les vraies informations du campus.", description: "D’un conseil de cours à un coup de main, nous transformons des savoirs dispersés en chemins accessibles à tous.", explore: "Entrer dans le flux", join: "Construire ensemble", portalLabel: "Porte vers le vécu", portalStatus: "Connexion · GDUFS", transitionLead: "L’expérience dispersée", transitionAccent: "devient un chemin commun." },
  story: { chapter: "01 — Signaux dispersés", kicker: "Des fragments au bien commun", eyebrow: "L’information du campus n’est pas du bruit", titleParts: ["Les expériences dispersées", "doivent devenir", "un chemin commun."], body: "Faisons sortir l’utile des discussions et notes privées pour qu’il soit trouvé, enrichi et réutilisé par l’étudiant suivant.", notes: [{ code: "C-014", text: "Un avis sur un professeur perdu dans le chat" }, { code: "F-072", text: "La question tardive : on mange quoi aujourd’hui ?" }, { code: "M-031", text: "Des objets de fin d’études noyés dans les fils" }, { code: "S-008", text: "Des services manqués dans une annonce passagère" }], categories: ["COURS", "REPAS", "ÉCHANGES", "COMMUNAUTÉ"] },
  course: { ...en.course, chapter: "02 — Guide des cours", titleLead: "Choisir ses cours sans", titleAccent: "tirer au sort.", disclaimer: "Tous les contenus ci-dessous sont des exemples", items: [{ id: "MATH101", name: "Mathématiques avancées", nameEn: "Advanced Mathematics", meta: "Pr Lin · Charge assez forte · Note démo 4,6", note: "Le travail est dense, mais les retours sont précis. Un carnet d’erreurs hebdomadaire facilite les examens." }, { id: "CS201", name: "Structures de données", nameEn: "Data Structures", meta: "Pr Chen · Discussions fréquentes · Note démo 4,8", note: "Trouvez tôt le rythme du groupe. Les retours sont concrets et l’investissement est très payant." }, { id: "SOC118", name: "Ville et société", nameEn: "Urban Studies", meta: "Pr Zhou · Lecture régulière · Note démo 4,3", note: "S’accorde bien aux cours exigeants. La moitié est en discussion, sans surprise brutale à la fin." }] },
  food: { ...en.food, chapter: "03 — Guide gourmand", titleLead: "Manger est l’avis", titleAccent: "le plus sincère du campus.", posterLabel: "Cantine du jour · Démo", posterMain: "Cantine", posterAccent: "2e étage", description: "Relions comptoirs, bonnes adresses et goûts sincères. Bien manger compte ; ces contenus sont illustratifs.", stalls: [{ index: "01", title: "Riz et soupe chaude", desc: "Comptoir près de la fenêtre. Fiable avant le cours du soir.", tag: "Choix du jour · Démo" }, { index: "02", title: "Coup de feu", desc: "N’attendez pas : un autre comptoir ira plus vite.", tag: "Conseil · Démo" }, { index: "03", title: "Menu à partager", desc: "Idéal à deux, généreux, souvent épuisé tard.", tag: "Avis étudiant · Démo" }, { index: "04", title: "Adresses voisines", desc: "Menus, prix et avertissements recommandés par les étudiants.", tag: "Carnet gourmand · Démo" }] },
  market: { ...en.market, chapter: "04 — Échanges du campus", titleLead: "Les besoins du campus", titleAccent: "méritent d’être vus.", description: "D’un objet qui change de main à l’entrée d’un événement : l’écosystème grandit. En voici un aperçu.", preview: "Aperçu · Bientôt", items: [{ index: "01", title: "Seconde main", en: "Marketplace", desc: "Livres, appareils et objets du quotidien circulent sur le campus." }, { index: "02", title: "Services", en: "Campus services", desc: "Retraits, covoiturage et entraide ponctuelle au bon endroit." }, { index: "03", title: "Événements", en: "Events", desc: "Conférences, clubs, concours et appels qui ne disparaissent plus." }, { index: "04", title: "Chats du campus", en: "Campus Cats", desc: "Gardons leurs petites histoires et notre mémoire commune." }] },
  community: { ...en.community, chapter: "05 — Communauté", titleLead: "Un campus,", titleAccent: "construit ensemble.", description: "YutuHub ne fabrique pas de bruit. Il conserve le vécu pour faciliter l’entraide entre personnes du même campus.", rows: [["EXPÉRIENCES DE COURS", "REPAS", "SECONDE MAIN", "EXPÉRIENCES DE COURS", "REPAS"], ["SERVICES", "COMMUNAUTÉ", "INFORMATIONS VÉCUES", "SERVICES", "COMMUNAUTÉ"]], principles: ["Expérience vécue", "Partage anonyme", "Lien local", "Construction commune"] },
  final: { eyebrow: "Un campus, des chemins partagés", titleLead: "Le campus,", titleAccent: "reconnecté.", description: "Chaque expérience sincère peut guider l’étudiant suivant.", explore: "Commencer à explorer", publish: "Partager une première note", marquee: ["YuTuHub", "Expériences en commun", "Faire circuler le vrai", "Campus Commons"] },
};

const ru: HomeCopy = {
  ...en,
  controls: { language: "Язык", menu: "Открыть меню", close: "Закрыть меню", theme: { label: "Оформление", system: "Система", light: "Светлая", dark: "Тёмная" } },
  nav: { information: "Сигналы", course: "Курсы", food: "Еда", market: "Кампус", community: "Сообщество", publish: "Опубликовать", login: "Войти", register: "Регистрация", profile: "Профиль" },
  hero: { location: "GDUFS · 23.1345° N", commons: "Общее знание кампуса", eyebrow: "Yutu Portal / Вход в знание кампуса", taglineLead: "Вернём в движение", taglineAccent: "правдивую информацию кампуса.", description: "От совета по курсу до своевременной помощи: мы превращаем разрозненный опыт в маршруты, доступные каждому.", explore: "Войти в поток", join: "Создавать вместе", portalLabel: "Вход к живому опыту", portalStatus: "Соединение · GDUFS", transitionLead: "Разрозненный опыт", transitionAccent: "становится общим маршрутом." },
  story: { chapter: "01 — Разрозненные сигналы", kicker: "От фрагментов к общему знанию", eyebrow: "Информация кампуса — не шум", titleParts: ["Разрозненный опыт кампуса", "должен стать", "общим маршрутом."], body: "Сохраняем полезное из чатов, разговоров и личных заметок, чтобы его могли найти, дополнить и снова использовать.", notes: [{ code: "C-014", text: "Отзыв о преподавателе, затерявшийся в чате" }, { code: "F-072", text: "Вопрос в последний момент: что сегодня поесть?" }, { code: "M-031", text: "Вещи выпускников, потерявшиеся в ленте" }, { code: "S-008", text: "Сервисы кампуса, пропущенные в уведомлении" }], categories: ["КУРСЫ", "ЕДА", "ОБМЕН", "СООБЩЕСТВО"] },
  course: { ...en.course, chapter: "02 — Гид по курсам", titleLead: "Выбирайте курсы", titleAccent: "не вслепую.", disclaimer: "Все записи ниже — демонстрационные примеры", items: [{ id: "MATH101", name: "Высшая математика", nameEn: "Advanced Mathematics", meta: "Проф. Линь · Нагрузка выше средней · Оценка 4,6", note: "Заданий много, но обратная связь точная. Еженедельный список ошибок заметно упрощает экзамен." }, { id: "CS201", name: "Структуры данных", nameEn: "Data Structures", meta: "Проф. Чэнь · Много обсуждений · Оценка 4,8", note: "Найдите командный ритм заранее. Комментарии конкретны, а вложенные усилия хорошо окупаются." }, { id: "SOC118", name: "Город и общество", nameEn: "Urban Studies", meta: "Проф. Чжоу · Ровное чтение · Оценка 4,3", note: "Хорошо сочетается со сложными предметами. Половина занятий — обсуждения, без внезапной нагрузки в конце." }] },
  food: { ...en.food, chapter: "03 — Гид по еде", titleLead: "Еда — это самый", titleAccent: "честный отзыв кампуса.", posterLabel: "Сегодня в столовой · Пример", posterMain: "Столовая", posterAccent: "2 этаж", description: "Объединяем окна, соседние кафе и честные вкусы. Выбор еды важен; все данные здесь демонстрационные.", stalls: [{ index: "01", title: "Рис и горячий суп", desc: "Окно у окна на втором этаже. Надёжно перед вечерней парой.", tag: "Выбор дня · Пример" }, { index: "02", title: "Обеденный час пик", desc: "Не стойте зря — другое окно быстрее.", tag: "Совет · Пример" }, { index: "03", title: "Набор на двоих", desc: "Как раз на двоих, порция большая, поздно заканчивается.", tag: "Отзыв · Пример" }, { index: "04", title: "Рядом с кампусом", desc: "Наборы, цены и честные предупреждения студентов.", tag: "Заметка · Пример" }] },
  market: { ...en.market, chapter: "04 — Обмен в кампусе", titleLead: "Потребности кампуса", titleAccent: "должны быть видны.", description: "От передачи вещей до входа на событие — экосистема растёт. Вот её предварительный вид.", preview: "Предпросмотр · Скоро", items: [{ index: "01", title: "Вторичный рынок", en: "Marketplace", desc: "Учебники, техника и бытовые вещи продолжают служить в кампусе." }, { index: "02", title: "Сервисы", en: "Campus services", desc: "Получение заказов, совместные поездки и быстрая взаимопомощь." }, { index: "03", title: "События", en: "Events", desc: "Лекции, клубы, соревнования и наборы, которые не пропадут в ленте." }, { index: "04", title: "Коты кампуса", en: "Campus Cats", desc: "Сохраняем знакомые мордочки и общую память кампуса." }] },
  community: { ...en.community, chapter: "05 — Сообщество", titleLead: "Один кампус,", titleAccent: "созданный вместе.", description: "YutuHub не производит шум. Он хранит живой опыт, чтобы людям одного кампуса было проще помогать друг другу.", rows: [["ОПЫТ КУРСОВ", "ЕДА КАМПУСА", "ОБМЕН ВЕЩАМИ", "ОПЫТ КУРСОВ", "ЕДА КАМПУСА"], ["СЕРВИСЫ", "СООБЩЕСТВО", "ПРАВДИВАЯ ИНФОРМАЦИЯ", "СЕРВИСЫ", "СООБЩЕСТВО"]], principles: ["Живой опыт", "Анонимный обмен", "Связь в кампусе", "Создаём вместе"] },
  final: { eyebrow: "Один кампус, общие маршруты", titleLead: "Кампус,", titleAccent: "связанный заново.", description: "Каждый честный опыт может стать ориентиром для следующего студента.", explore: "Начать исследовать", publish: "Поделиться первой заметкой", marquee: ["YuTuHub", "Общий опыт кампуса", "Вернём правду в движение", "Campus Commons"] },
};

export const HOME_COPY = { "zh-CN": zhCN, en, ja, ko, es, fr, ru } satisfies Record<HomeLocale, HomeCopy>;
export const matchHomeLocale = matchLanguage;
