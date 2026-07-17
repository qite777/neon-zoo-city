import { Archetype, QuizCTA, QuizQuestion } from "@/types/quiz";

export const QUIZ_TITLE = "测测你的 OPC 人格";
export const QUIZ_SUBTITLE = "在 Neon Zoo City，你更像哪种城市建造者？";

export const QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    question: "当你有一个新点子时，你的第一反应是？",
    options: [
      { label: "立刻画个框架 / 流程图，把它系统化", score: { builder: 1 } },
      { label: "先找人聊聊，看看有没有类似案例或资源", score: { scout: 1 } },
      { label: "想一个吸引人的名字、故事和传播角度", score: { curator: 1 } },
      { label: "记下来，等时机和条件成熟再动", score: { keeper: 1 } },
    ],
  },
  {
    id: "q2",
    question: "在一人公司里，你最能接受的节奏是？",
    options: [
      { label: "长期主义，用时间把产品/系统磨深", score: { builder: 1 } },
      { label: "快速试错，边跑边调整方向", score: { scout: 1 } },
      { label: "跟着灵感和热点走，保持表达欲", score: { curator: 1 } },
      { label: "稳定输出，不追风口，守住基本盘", score: { keeper: 1 } },
    ],
  },
  {
    id: "q3",
    question: "遇到卡住的问题，你通常会？",
    options: [
      { label: "查资料、建文档，自己死磕到底", score: { builder: 1 } },
      { label: "去社群里问，换圈子找答案", score: { scout: 1 } },
      { label: "把问题写成内容发出去，等反馈", score: { curator: 1 } },
      { label: "先放一放，让时间自然给出解法", score: { keeper: 1 } },
    ],
  },
  {
    id: "q4",
    question: "你更倾向哪种变现方式？",
    options: [
      { label: "卖系统、课程、工具或解决方案", score: { builder: 1 } },
      { label: "赚信息差、撮合资源或做分销", score: { scout: 1 } },
      { label: "靠内容、品牌和影响力变现", score: { curator: 1 } },
      { label: "靠长期关系和信任持续转化", score: { keeper: 1 } },
    ],
  },
  {
    id: "q5",
    question: "如果组队做项目，你最需要谁补你的短板？",
    options: [
      { label: "能往外跑、拉资源、找新机会的人", score: { scout: 1 } },
      { label: "能把想法系统化、落地成产品的人", score: { builder: 1 } },
      { label: "能稳定推进、维护关系、守住节奏的人", score: { keeper: 1 } },
      { label: "能制造声量、讲好故事的人", score: { curator: 1 } },
    ],
  },
  {
    id: "q6",
    question: "你的一天通常怎么开始？",
    options: [
      { label: "列 TODO，按优先级推进", score: { builder: 1 } },
      { label: "刷社群 / 行业动态，找新机会", score: { scout: 1 } },
      { label: "写东西 / 做内容，先表达", score: { curator: 1 } },
      { label: "处理消息、维护关系和节奏", score: { keeper: 1 } },
    ],
  },
  {
    id: "q7",
    question: "你最害怕的状态是？",
    options: [
      { label: "想法很多，但系统一直没搭起来", score: { builder: 1 } },
      { label: "没有新输入，原地打转", score: { scout: 1 } },
      { label: "表达没人看，没有反馈", score: { curator: 1 } },
      { label: "关系断裂、节奏失控", score: { keeper: 1 } },
    ],
  },
  {
    id: "q8",
    question: "五年后，你希望别人怎么介绍你？",
    options: [
      { label: "他做了一个很稳的产品 / 系统", score: { builder: 1 } },
      { label: "他总能发现别人看不到的机会", score: { scout: 1 } },
      { label: "他的内容和观点影响了一群人", score: { curator: 1 } },
      { label: "他连接并陪伴了很多人成长", score: { keeper: 1 } },
    ],
  },
];

export const ARCHETYPES: Record<Archetype["slug"], Archetype> = {
  builder: {
    slug: "builder",
    name: "城市建筑师",
    nameEn: "City Architect",
    color: "#00F0FF",
    icon: "🏗",
    image: "/characters/noctis.jpg",
    description:
      "你是把抽象想法变成可运行系统的人。你相信结构、流程和长期复利，擅长把一人公司从点子沉淀为产品。",
    superpower: "系统化落地",
    teamFit: "你需要一位街角远征者帮你打开外部机会，避免闷头建造。",
    watchOut: "别追求完美版本而迟迟不上线。",
  },
  scout: {
    slug: "scout",
    name: "街角远征者",
    nameEn: "Street Scout",
    color: "#FF9500",
    icon: "🧭",
    image: "/characters/sprint.jpg",
    description:
      "你是城市的触角，擅长发现新机会、连接人和资源。你的优势是快、准、广，总能在信息中嗅到下一步行动。",
    superpower: "机会嗅觉",
    teamFit: "你需要一位城市建筑师帮你把机会变成可复用的系统。",
    watchOut: "别因为追逐新机会而留下一堆半拉子工程。",
  },
  curator: {
    slug: "curator",
    name: "光影策展人",
    nameEn: "Light Curator",
    color: "#FF3CAC",
    icon: "🎬",
    image: "/characters/vex.jpg",
    description:
      "你是故事的导演，擅长用内容、审美和叙事把复杂经历转译成别人愿意看、愿意转发的表达。",
    superpower: "叙事与传播",
    teamFit: "你需要一位时间守望者帮你稳住节奏，把热度沉淀成长期关系。",
    watchOut: "别为了发声而忽视产品本身的交付。",
  },
  keeper: {
    slug: "keeper",
    name: "时间守望者",
    nameEn: "Time Keeper",
    color: "#39FF14",
    icon: "🌿",
    image: "/characters/slate.jpg",
    description:
      "你是关系的守护者，擅长长期陪伴、节奏管理和复盘沉淀。你相信慢即是快，信任是复利。",
    superpower: "关系与节奏",
    teamFit: "你需要一位光影策展人帮你扩大声量，把你的陪伴价值让更多人看见。",
    watchOut: "别过于保守而错过关键窗口期。",
  },
};

export const GLOBAL_CTA: QuizCTA = {
  label: "扫码加入 OPC 创作者社群",
  description: "把你的结果发到群里，找到互补的队友。",
  qrImage: "/quiz/qr-wechat.png",
  wechatId: "Lilia-OPC",
  link: "mailto:1510760873@qq.com",
};
