export type BlogCategory = "research" | "projects" | "documents" | "notes";
export type BlogPost = {
  slug: string;
  href: string;
  title: { en: string; zh: string };
  summary: { en: string; zh: string };
  category: BlogCategory;
  date?: string;
  image?: string;
  tags: { en: string; zh: string }[];
  external?: boolean;
  download?: string;
  paper?: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "agenticasr",
    href: "/blog/agenticasr/",
    title: { en: "AgenticASR", zh: "AgenticASR" },
    summary: {
      en: "Beyond verbatim transcription: refining bilingual speech into clean text while preserving the speaker’s final intent.",
      zh: "不止于逐字转写：将双语语音整理为清晰文本，同时保留说话者的最终意图。",
    },
    category: "research",
    date: "2026-07-30",
    image: "/agenticasr/teaser.png",
    tags: [
      { en: "Speech Refinement", zh: "语音整理" },
      { en: "Intent Preservation", zh: "意图保留" },
      { en: "Bilingual Recognition", zh: "双语识别" },
    ],
    paper: "https://arxiv.org/abs/2607.28175",
  },
  {
    slug: "auk-release",
    href: "https://auk-project.github.io/",
    title: { en: "AuK 🍌 — Audio Banana goes open source", zh: "AuK 🍌 — Audio Banana 开源了" },
    summary: {
      en: "AuK is open source. Explore the project and try speech generation and editing.",
      zh: "参与的 AuK 开源了，来体验语音生成与编辑。",
    },
    category: "notes",
    date: "2026-09-09",
    tags: [
      { en: "Speech Generation", zh: "语音生成" },
      { en: "Audio Editing", zh: "音频编辑" },
      { en: "Fast Inference", zh: "推理加速" },
    ],
    external: true,
  },
  {
    slug: "tcs-review",
    href: "/blog/tcs-review/",
    title: { en: "TCS — Review & Cheatlist", zh: "TCS — 理论计算机科学复习与速查" },
    summary: {
      en: "Open-source Theoretical Computer Science review notes and a compact cheat list. A 71-page PDF to study, revisit, and keep close at hand.",
      zh: "开源理论计算机科学复习笔记与精简速查表。71 页 PDF，便于系统学习、考前回顾与离线查阅。",
    },
    category: "documents",
    date: "2026-05-27",
    tags: [
      { en: "Recurrences", zh: "递推关系" },
      { en: "Randomized Algorithms", zh: "随机算法" },
      { en: "Complexity Analysis", zh: "复杂度分析" },
    ],
    download: "/files/TCS_SUM.pdf",
  },
  {
    slug: "robotic-navigation",
    href: "https://github.com/AnXMuy/RoboticNavigationXJTU26",
    title: { en: "Robotic Navigation · Course Project", zh: "机器人导航实践 · 课程项目" },
    summary: {
      en: "A robotic navigation course project with source code and implementation notes.",
      zh: "机器人导航课程项目与实现笔记，从代码出发理解实践过程。",
    },
    category: "projects",
    tags: [
      { en: "Robot Navigation", zh: "机器人导航" },
      { en: "Navigation Experiments", zh: "导航实验" },
      { en: "Course Project", zh: "课程项目" },
    ],
    external: true,
  },
];
