export const site = {
  name: "Zixuan Jiang",
  preferredName: "Andrew",
  initials: "ZJ",
  description: "Zixuan Jiang's academic homepage. Research areas: audio-visual intelligence, multimodal perception and representation, and human–AI interaction.",
  email: "zixuanjiang2006@gmail.com",
  backupEmail: "andrewjiang@stu.xjtu.edu.cn",
  location: "Xi'an, China",
  institution: "Xi'an Jiaotong University",
  avatar: "/images/prof_pic.png",
  cv: "/images/CV.pdf",
  cvChinese: "/images/CV-zh.pdf",
  links: {
    github: "https://github.com/AnXMuy",
    scholar: "https://scholar.google.com/citations?user=q38x_T8AAAAJ",
    researchGate: "https://www.researchgate.net/profile/Zixuan-Jiang-8?ev=hdr_xprf",
    orcid: "https://orcid.org/0009-0008-2706-553X",
    xiaohongshu: "https://www.xiaohongshu.com/user/profile/68ce2ceb00000000210237e2",
  },
} as const;

export const exploreRoutes = [
  {
    href: "/publications/",
    label: "Publications",
    description: "Featured papers and research series",
    index: "01",
    icon: "book",
  },
  {
    href: "/competitions/",
    label: "Competitions",
    description: "AI, programming, and mathematical modeling",
    index: "02",
    icon: "trophy",
  },
  {
    href: "/honors-awards/",
    label: "Honors & Awards",
    description: "Scholarships and university honors",
    index: "03",
    icon: "award",
  },
  {
    label: "Blog",
    description: "Notes, documents, and projects",
    href: "/blog/",
    index: "04",
    icon: "notebook",
  },
] as const;
