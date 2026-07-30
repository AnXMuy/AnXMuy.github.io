export type PublicationResource = {
  label: string;
  href: string;
};

export type FeaturedPublication = {
  kind: "featured";
  id: string;
  venue: string;
  year: string;
  title: string;
  href: string;
  authors: string;
  image: string;
  imageAlt: string;
  resources: PublicationResource[];
  highlights: string[];
  media?: PublicationResource[];
};

export type StandardPublication = {
  kind: "standard";
  id: string;
  venue: string;
  year: string;
  title: string;
  href: string;
  authors: string;
  resources?: PublicationResource[];
};

export type PublicationSeries = {
  kind: "series";
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  items: PublicationNode[];
};

export type PublicationNode =
  | FeaturedPublication
  | StandardPublication
  | PublicationSeries;

export const publications: PublicationNode[] = [
  {
    kind: "series",
    id: "remote-sensing",
    title: "Remote Sensing Image Interpretation",
    eyebrow: "Research Series 01",
    description:
      "Open-vocabulary perception and detailed language grounding for understanding the Earth at scale.",
    items: [
      {
        kind: "featured",
        id: "describe-earth",
        venue: "arXiv",
        year: "2025",
        title: "DescribeEarth: Describe Anything for Remote Sensing Images",
        href: "https://arxiv.org/abs/2509.25654",
        authors:
          "Kaiyu Li*, Zixuan Jiang*, Xiangyong Cao†, Jiayu Wang, Yuchen Xiao, Deyu Meng, Zhi Wang",
        image: "/images/describeearth.png",
        imageAlt: "DescribeEarth method and sample results",
        resources: [
          { label: "Paper", href: "https://arxiv.org/abs/2509.25654" },
          { label: "Code", href: "https://github.com/earth-insights/DescribeEarth" },
          {
            label: "Dataset",
            href: "https://huggingface.co/datasets/earth-insights/DE-Dataset",
          },
          {
            label: "Benchmark",
            href: "https://huggingface.co/datasets/earth-insights/DE-Benchmark",
          },
        ],
        highlights: [
          "Introduces geo-spatial detailed localized captioning.",
          "Builds the first describe-anything model for remote sensing.",
          "Releases the associated dataset and evaluation benchmark.",
        ],
        media: [
          { label: "遥感与深度学习", href: "https://mp.weixin.qq.com/s/qhFIZ6QMmikZ9L7q3cKFaw" },
          { label: "码科智能", href: "https://mp.weixin.qq.com/s/FjmlKo0EkEzXhAk82AdeFQ" },
          { label: "CV炼丹术", href: "https://mp.weixin.qq.com/s/LfGuwxEoIwpEOZXAi6w0fg" },
        ],
      },
      {
        kind: "standard",
        id: "ntire-2026",
        venue: "CVPRW",
        year: "2026",
        title:
          "The Second Challenge on Cross-Domain Few-Shot Object Detection at NTIRE 2026: Methods and Results",
        href: "https://arxiv.org/abs/2604.11998",
        authors:
          "Xingyu Qiu, Yuqian Fu, Jiawei Geng, Bin Ren, ..., Kaiyu Li, Bowen Fu, Zixuan Jiang, Ke Li, Hui Qiao, Xiangyong Cao, ...",
      },
      {
        kind: "standard",
        id: "open-vocabulary-review",
        venue: "CJIG",
        year: "2026",
        title: "Advances in Open-Vocabulary Perception for Remote-Sensing Images",
        href: "https://www.cjig.cn/en/article/doi/10.11834/jig.260163/",
        authors: "Kaiyu Li, Xiangyong Cao†, Zixuan Jiang, Deyu Meng",
      },
      {
        kind: "standard",
        id: "annotation-free-ovs",
        venue: "arXiv",
        year: "2025",
        title: "Annotation-Free Open-Vocabulary Segmentation for Remote-Sensing Images",
        href: "https://arxiv.org/abs/2508.18067",
        authors:
          "Kaiyu Li, Xiangyong Cao†, Ruixun Liu, Shihong Wang, Zixuan Jiang, Zhi Wang, Deyu Meng",
      },
    ],
  },
  {
    kind: "series",
    id: "audio-intelligence",
    title: "Audio Intelligence",
    eyebrow: "Research Series 02",
    description:
      "Interactive speech systems and evaluation methods that move recognition beyond a single pass.",
    items: [
      {
        kind: "featured",
        id: "human-like-interactive-asr",
        venue: "arXiv",
        year: "2026",
        title:
          "Towards Human-Like Interactive Speech Recognition With Agentic Correction and Semantic Evaluation",
        href: "https://arxiv.org/abs/2605.29430",
        authors:
          "Zixuan Jiang*, Yanqiao Zhu*, Peng Wang*, Qinyuan Chen, Xinjian Zhao, Xipeng Qiu, Wupeng Wang, Zhifu Gao, Xiangang Li, Kai Yu, Xie Chen†",
        image: "/images/interactiveasr_teaser.png",
        imageAlt: "Interactive ASR system overview",
        resources: [
          { label: "Paper", href: "https://arxiv.org/abs/2605.29430" },
          { label: "Project Page", href: "https://interactiveasr.github.io/" },
          { label: "Live Demo", href: "https://i-asr.sjtuxlance.com/" },
        ],
        highlights: [
          "Extends one-pass ASR into an interactive system with user feedback and semantic correction.",
          "Introduces an agent-based framework for interactive speech recognition.",
          "Develops the S²ER metric and ISS simulation framework for semantic evaluation.",
        ],
      },
      {
        kind: "standard",
        id: "mmae",
        venue: "arXiv",
        year: "2026",
        title: "MMAE: A Massive Multitask Audio Editing Benchmark",
        href: "https://arxiv.org/abs/2606.07229",
        authors:
          "Ziyang Ma, Ruiqi Yan, Ruiyang Xu, Jie Fang, ..., Yanru Huo, Zixuan Jiang, Xiquan Li, Yalin Li, ..., Xie Chen",
        resources: [
          { label: "Code", href: "https://github.com/ddlBoJack/MMAE" },
          { label: "Dataset", href: "https://huggingface.co/datasets/BoJack/MMAE" },
        ],
      },
      {
        kind: "standard",
        id: "interactive-asr",
        venue: "arXiv",
        year: "2026",
        title:
          "Interactive ASR: Towards Human-Like Interaction and Semantic Coherence Evaluation for Agentic Speech Recognition",
        href: "https://arxiv.org/abs/2604.09121",
        authors:
          "Peng Wang*, Yanqiao Zhu*, Zixuan Jiang*, Qinyuan Chen, Xingjian Zhao, Xipeng Qiu, Wupeng Wang, Zhifu Gao, Xiangang Li, Kai Yu, Xie Chen†",
      },
    ],
  },
];
