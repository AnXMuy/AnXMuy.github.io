import { T } from "@/components/language-provider";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { AgentRive } from "@/components/agent-rive";
import { Reveal } from "@/components/reveal";
import { site } from "@/data/site";

export function ProfileHero() {
  return (
    <section className="profile-hero" aria-labelledby="profile-name">
      <div className="hero-grid" aria-hidden="true" />
      <Reveal className="portrait-wrap">
        <div className="portrait-frame">
          <Image
            src={site.avatar}
            alt="Portrait of Zixuan Jiang"
            width={864}
            height={864}
            priority
            sizes="(max-width: 640px) 144px, 176px"
          />
        </div>
      </Reveal>

      <Reveal className="identity-block" delay={0.08}>
        <p className="hero-kicker"><T>{"Multimodal LLMs · Human–Computer Interaction"}</T></p>
        <h1 id="profile-name">
          Zixuan Jiang <span>(Andrew)</span>
        </h1>
      </Reveal>

      <AgentRive />

      <Reveal className="profile-news" delay={0.22}>
        <div className="profile-news-heading">
          <span><T>{"News"}</T></span>
          <div aria-hidden="true" />
        </div>
        <div className="profile-news-list">
          <article className="profile-news-item">
            <time dateTime="2026-09-09">2026.09.09</time>
            <p>
              <strong>AuK 🍌</strong> <T>{"is now open source: unified speech generation and editing, with AuK-Flash and AuK-VAE."}</T>{" "}
              <a href="https://arxiv.org/abs/2609.08936" target="_blank" rel="noreferrer"><T>{"Paper"}</T> <ArrowUpRight aria-hidden="true" /></a>{" "}
              <a href="https://github.com/Tencent-Hunyuan/AuK" target="_blank" rel="noreferrer"><T>{"Code"}</T> <ArrowUpRight aria-hidden="true" /></a>{" "}
              <a href="https://auk-project.github.io/" target="_blank" rel="noreferrer"><T>{"Project Page"}</T> <ArrowUpRight aria-hidden="true" /></a>{" "}
              <a href="https://huggingface.co/papers/2609.08936" target="_blank" rel="noreferrer"><T>{"HF Daily Paper"}</T> <ArrowUpRight aria-hidden="true" /></a>
            </p>
          </article>
          <article className="profile-news-item">
            <time dateTime="2026-07-30">2026.07.30</time>
            <p>
              <strong>AgenticASR</strong> <T>{"is now on arXiv, with the code and AASR-Bench released."}</T> <a href="https://arxiv.org/abs/2607.28175" target="_blank" rel="noreferrer"><T>{"Paper"}</T> <ArrowUpRight aria-hidden="true" /></a> <a href="https://github.com/AnXMuy/AgenticASR" target="_blank" rel="noreferrer"><T>{"Code"}</T> <ArrowUpRight aria-hidden="true" /></a> <a href="https://huggingface.co/datasets/Andrew0425/AASR-Bench" target="_blank" rel="noreferrer">AASR-Bench <ArrowUpRight aria-hidden="true" /></a>
            </p>
          </article>
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
            <time dateTime="2025-09-30">2025.09.30</time>
            <p>
              <strong>DescribeEarth</strong> <T>{"was made public with open-source code, dataset, and benchmark."}</T> <a href="https://arxiv.org/abs/2509.25654" target="_blank" rel="noreferrer"><T>{"Paper"}</T> <ArrowUpRight aria-hidden="true" /></a> <a href="https://github.com/earth-insights/DescribeEarth" target="_blank" rel="noreferrer"><T>{"Code"}</T> <ArrowUpRight aria-hidden="true" /></a> <a href="https://huggingface.co/datasets/earth-insights/DE-Dataset" target="_blank" rel="noreferrer"><T>{"Dataset"}</T> <ArrowUpRight aria-hidden="true" /></a> <a href="https://huggingface.co/datasets/earth-insights/DE-Benchmark" target="_blank" rel="noreferrer"><T>{"Benchmark"}</T> <ArrowUpRight aria-hidden="true" /></a>
            </p>
          </article>
        </div>
      </Reveal>
    </section>
  );
}
