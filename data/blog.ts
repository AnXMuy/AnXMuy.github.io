export type BlogCategory = "research" | "projects" | "documents" | "notes";
export type BlogPost = {
  slug: string;
  href: string;
  title: { en: string; zh: string };
  summary: { en: string; zh: string };
  category: BlogCategory;
  date?: string;
  image?: string;
  tags: string[];
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
    tags: ["ASR", "Agent", "arXiv"],
    paper: "https://arxiv.org/abs/2607.28175",
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
    tags: ["Theoretical Computer Science", "PDF"],
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
    tags: ["Robotics", "GitHub"],
    external: true,
  },
];
