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
      en: "Refining English and Chinese speech into clean text without losing the speaker’s final intent.",
      zh: "将英语和中文语音整理为清晰文本，同时保留说话者的最终意图。",
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
      en: "AuK is now open source. The project page includes demos for speech generation and editing.",
      zh: "AuK 已开源，项目主页提供了语音生成与编辑的示例。",
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
      en: "Open-source review notes and a compact cheat sheet for Theoretical Computer Science, bundled into a 71-page PDF for study and offline reference.",
      zh: "开源的理论计算机科学复习笔记与精简速查表，合订为 71 页 PDF，便于系统复习和离线查阅。",
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
    slug: "modern-control-engineering",
    href: "/blog/modern-control-engineering/",
    title: {
      en: "Analysis and Design of a Double Inverted Pendulum System",
      zh: "二级倒立摆系统分析与设计",
    },
    summary: {
      en: "Modern Control Engineering final project: state-space modeling, stability analysis, state-feedback control, and observer design for a double inverted pendulum in MATLAB and Simulink.",
      zh: "《现代控制工程》课程大作业：在 MATLAB 与 Simulink 中完成二级倒立摆的状态空间建模、稳定性分析、状态反馈控制与观测器设计。",
    },
    category: "documents",
    date: "2025-05-19",
    tags: [
      { en: "State-Space Modeling", zh: "状态空间建模" },
      { en: "State Feedback", zh: "状态反馈" },
      { en: "Observer Design", zh: "观测器设计" },
    ],
    download: "/files/modern-control-engineering-project.pdf",
  },
  {
    slug: "robotic-navigation",
    href: "https://github.com/AnXMuy/RoboticNavigationXJTU26",
    title: { en: "Robotic Navigation · Course Project", zh: "机器人导航实践 · 课程项目" },
    summary: {
      en: "Source code and implementation notes from a robotics navigation course project.",
      zh: "机器人导航课程项目的源码与实现笔记。",
    },
    category: "projects",
    tags: [
      { en: "Robot Navigation", zh: "机器人导航" },
      { en: "Navigation Experiments", zh: "导航实验" },
      { en: "Course Project", zh: "课程项目" },
    ],
    external: true,
  },
  {
    slug: "ai-chip-design",
    href: "https://github.com/AnXMuy/AI_ChipDesign_Assignment",
    title: { en: "Introduction to AI Chip Design · Course Project", zh: "AI芯片设计导论 · 课程项目" },
    summary: {
      en: "Course assignments and implementation notes for an introduction to AI chip design.",
      zh: "AI 芯片设计导论课程作业与实现记录。",
    },
    category: "projects",
    tags: [
      { en: "AI Chip Design", zh: "AI芯片设计" },
      { en: "Hardware Acceleration", zh: "硬件加速" },
      { en: "Course Project", zh: "课程项目" },
    ],
    external: true,
  },
];
