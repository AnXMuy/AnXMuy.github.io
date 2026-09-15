export const education = [
  {
    date: "2023.09 - Present",
    title: "Artificial Intelligence Experimental Class",
    detail: "Outstanding Talent Program, Xi'an Jiaotong University",
    meta: "Cumulative score: 92.26/100 (first five semesters); 94.78/100 (first six semesters). Rank: 5/66 in both periods.",
  },
  {
    date: "2021.09 - 2023.06",
    title: "Young Gifted Program",
    detail: "Xi'an Jiaotong University",
  },
] as const;

export const internships = [
  {
    date: "2024.09 - Present",
    title: "Xi'an Jiaotong University",
    detail: "School of Computer Science",
    meta: "Mentor: Xiangyong Cao · Associate Professor · PhD Supervisor",
  },
  {
    date: "2025.12 - Present",
    title: "Shanghai Innovation Institute · Shanghai Jiao Tong University",
    detail: "X-LANCE Lab",
    meta: "Mentor: Xie Chen · Associate Professor · PhD Supervisor",
    metaHref: "https://chenxie95.github.io/zh",
  },
] as const;

export const honors = [
  { date: "2025.10", title: "National Scholarship" },
  { date: "2025.10", title: "Outstanding Student", detail: "Xi'an Jiaotong University" },
  { date: "2024.11", title: "Shuiyou First-Class Scholarship", detail: "Top 4 in the university" },
  { date: "2024.11", title: "Outstanding Student", detail: "Xi'an Jiaotong University" },
  { date: "2023.11", title: "Third-Class Scholarship", detail: "Xi'an Jiaotong University" },
] as const;

export const competitionGroups = [
  {
    title: "AI & Programming",
    items: [
      { date: "2025", title: "Second Prize", detail: "National Laser Radar Conference Point Cloud Intelligent Analysis Competition" },
      { date: "2025", title: "Silver Medal", detail: "ICPC Shaanxi Provincial Programming Contest" },
      { date: "2024", title: "Third Prize", detail: "China Mobile AI+ University Innovation Program, AI Track" },
      { date: "2024", title: "Bronze Medal", detail: "ICPC Shaanxi Provincial Programming Contest" },
    ],
  },
  {
    title: "Mathematical Modeling",
    items: [
      { date: "2023 - 2025", title: "3x First Prize", detail: "National College Student Mathematical Modeling Competition, Shaanxi Division" },
      { date: "2024", title: "Meritorious Winner", detail: "Mathematical Contest in Modeling, USA" },
      { date: "2023", title: "Honorable Prize", detail: "Mathematical Contest in Modeling, USA" },
    ],
  },
] as const;

export const resumeTargets = [
  "PhD application in multimodal large language models and human-computer interaction",
  "AI research internship / research engineer roles involving multimodal agents, evaluation, and dataset construction",
] as const;

export const skills = [
  "Multimodal learning",
  "Agentic speech recognition",
  "Remote sensing image interpretation",
  "Open-vocabulary perception",
  "Benchmark and dataset construction",
  "LLM-assisted evaluation",
  "Python",
  "PyTorch",
  "Research prototyping",
] as const;
