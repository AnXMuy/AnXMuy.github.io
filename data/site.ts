export const site = {
  name: "Zixuan Jiang",
  preferredName: "Andrew",
  initials: "ZJ",
  description: "Interested in multimodal intelligence, audio interaction",
  email: "andrewjiang@stu.xjtu.edu.cn",
  location: "Xi'an, China",
  institution: "Xi'an Jiaotong University",
  avatar: "/images/prof_pic.png",
  cv: "/images/CV.pdf",
  links: {
    github: "https://github.com/AnXMuy",
    scholar: "https://scholar.google.com/citations?user=hu8iqsMAAAAJ",
    researchGate: "https://www.researchgate.net/profile/Zixuan-Jiang-8?ev=hdr_xprf",
    orcid: "https://orcid.org/0009-0008-2706-553X",
  },
} as const;

export const exploreRoutes = [
  {
    href: "/publications/",
    label: "Publications",
    description: "Selected work and research series",
    index: "01",
    icon: "book",
  },
  {
    href: "/competitions/",
    label: "Competitions",
    description: "AI, programming, and modeling",
    index: "02",
    icon: "trophy",
  },
  {
    href: "/honors-awards/",
    label: "Honors & Awards",
    description: "Scholarships and distinctions",
    index: "03",
    icon: "award",
  },
  {
    label: "Blog",
    description: "Writing, resources, and builds",
    href: "/blog/",
    index: "04",
    icon: "notebook",
  },
] as const;
