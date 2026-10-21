import { Localized, T } from "@/components/language-provider";
import { ArrowUpRight } from "lucide-react";
import { describeEarthVenueNote } from "@/data/publications";

export function News() {
  return (
    <div className="profile-news-list">
      <article className="profile-news-item">
        <time dateTime="2026-10-16">2026.10.16</time>
        <Localized
          en={<p>I received the <strong>National Scholarship</strong> for the second time!</p>}
          zh={<p>第二次获得<strong>国家奖学金</strong>！</p>}
        />
      </article>
      <article className="profile-news-item">
        <time dateTime="2026-09-24">2026.09.24</time>
        <Localized
          en={<p>
            I have been officially admitted to the Computer Science PhD program at{" "}
            <a href="https://www.sii.edu.cn/" target="_blank" rel="noreferrer">Shanghai Innovation Institute<ArrowUpRight aria-hidden="true" /></a>{" "}
            and{" "}
            <a href="https://cs.sjtu.edu.cn/" target="_blank" rel="noreferrer">School of Computer Science, Shanghai Jiao Tong University<ArrowUpRight aria-hidden="true" /></a>, starting in September 2027.
          </p>}
          zh={<p>
            正式被<a href="https://www.sii.edu.cn/" target="_blank" rel="noreferrer">上海创智学院<ArrowUpRight aria-hidden="true" /></a>与<a href="https://cs.sjtu.edu.cn/" target="_blank" rel="noreferrer">上海交通大学计算机学院<ArrowUpRight aria-hidden="true" /></a>录取为计算机科学博士，将于 2027 年 9 月入学。
          </p>}
        />
      </article>
      <article className="profile-news-item">
        <time dateTime="2026-09-12">2026.09.12</time>
        <p>
          <a href="https://www.sciencedirect.com/science/article/pii/S092427162600465X" target="_blank" rel="noreferrer"><strong>DescribeEarth: Detailed localized captioning for remote sensing images</strong><ArrowUpRight aria-hidden="true" /></a>{" "}
          <T zh="终稿现已发表于">is now published in</T>{" "}
          <a href="https://www.sciencedirect.com/journal/isprs-journal-of-photogrammetry-and-remote-sensing" target="_blank" rel="noreferrer">ISPRS P&amp;RS</a>{" "}(<T>{describeEarthVenueNote}</T>).
        </p>
      </article>
      <article className="profile-news-item">
        <time dateTime="2026-09-09">2026.09.09</time>
        <p>
          <strong>AuK</strong> <T>{"is now open source: unified speech generation and editing, with AuK-Flash and AuK-VAE."}</T>{" "}
          <a href="https://arxiv.org/abs/2609.08936" target="_blank" rel="noreferrer"><T>{"Paper"}</T> <ArrowUpRight aria-hidden="true" /></a>{" "}
          <a href="https://github.com/Tencent-Hunyuan/AuK" target="_blank" rel="noreferrer"><T>{"Code"}</T> <ArrowUpRight aria-hidden="true" /></a>{" "}
          <a href="https://auk-project.github.io/" target="_blank" rel="noreferrer"><T>{"Project Page"}</T> <ArrowUpRight aria-hidden="true" /></a>{" "}
        </p>
      </article>
      <article className="profile-news-item">
        <time dateTime="2026-07-30">2026.07.30</time>
        <p>
          <strong>AgenticASR</strong> <T>{"is now on arXiv, with the code and AASR-Bench released."}</T> <a href="https://arxiv.org/abs/2607.28175" target="_blank" rel="noreferrer"><T>{"Paper"}</T> <ArrowUpRight aria-hidden="true" /></a> <a href="https://github.com/AnXMuy/AgenticASR" target="_blank" rel="noreferrer"><T>{"Code"}</T> <ArrowUpRight aria-hidden="true" /></a> <a href="https://huggingface.co/datasets/Andrew0425/AASR-Bench" target="_blank" rel="noreferrer">AASR-Bench <ArrowUpRight aria-hidden="true" /></a>
        </p>
      </article>
      <details className="news-archive">
        <summary><T>{"Earlier updates"}</T></summary>
        <article className="profile-news-item">
          <time dateTime="2026-07-29">2026.07.29</time>
          <p>
            <strong>OVEarth-Bench</strong> <T>{"was released on arXiv with a project page for open-vocabulary Earth observation evaluation."}</T> <a href="https://arxiv.org/abs/2607.27278" target="_blank" rel="noreferrer"><T>{"Paper"}</T> <ArrowUpRight aria-hidden="true" /></a> <a href="https://earth-insights.github.io/OVEarth-bench" target="_blank" rel="noreferrer"><T>{"Project"}</T> <ArrowUpRight aria-hidden="true" /></a>
          </p>
        </article>
        <article className="profile-news-item">
          <time dateTime="2026-07-28">2026.07.28</time>
          <p>
            <T>{"The"}</T> <strong>VibeXASR</strong> <T>{"project, in collaboration with Jun Guo, Tao Liu, and Chonghao Cai, won the Grand Prize at the Speech OPC Innovation & Entrepreneurship Competition."}</T> <a href="https://vibexasr.speech.wiki/" target="_blank" rel="noreferrer"><T>{"Project"}</T> <ArrowUpRight aria-hidden="true" /></a>
          </p>
        </article>
        <article className="profile-news-item">
          <time dateTime="2026-04">2026.04</time>
          <p>
            <T>{"Our"}</T>{" "}
            <a href="https://www.cjig.cn/zh/article/doi/10.11834/jig.260163/" target="_blank" rel="noreferrer"><T>{"survey paper"}</T><ArrowUpRight aria-hidden="true" /></a>{" "}
            <T>{"on remote sensing open-vocabulary perception has been accepted by Journal of Image and Graphics (中国图象图形学报)."}</T>
          </p>
        </article>
        <article className="profile-news-item">
          <time dateTime="2025-09-30">2025.09.30</time>
          <p>
            <strong>DescribeEarth</strong> <T>{"was made public with open-source code, dataset, and benchmark."}</T> <a href="https://arxiv.org/abs/2509.25654" target="_blank" rel="noreferrer"><T>{"Paper"}</T> <ArrowUpRight aria-hidden="true" /></a> <a href="https://github.com/earth-insights/DescribeEarth" target="_blank" rel="noreferrer"><T>{"Code"}</T> <ArrowUpRight aria-hidden="true" /></a> <a href="https://huggingface.co/datasets/earth-insights/DE-Dataset" target="_blank" rel="noreferrer"><T>{"Dataset"}</T> <ArrowUpRight aria-hidden="true" /></a> <a href="https://huggingface.co/datasets/earth-insights/DE-Benchmark" target="_blank" rel="noreferrer"><T>{"Benchmark"}</T> <ArrowUpRight aria-hidden="true" /></a>
          </p>
        </article>
      </details>
    </div>
  );
}
