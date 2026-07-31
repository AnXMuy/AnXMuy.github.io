import Image from "next/image";
import { ArrowUpRight, ExternalLink, GraduationCap, Mail, MapPin, Network } from "lucide-react";
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
        <p className="hero-kicker">AI Researcher · Multimodal Intelligence</p>
        <h1 id="profile-name">
          Zixuan Jiang <span>(Andrew)</span>
        </h1>
        <p className="hero-summary">Interested in multimodal intelligence, audio interaction</p>
      </Reveal>

      <Reveal className="identity-links" delay={0.16}>
        <span><MapPin aria-hidden="true" />{site.location}</span>
        <a href={`mailto:${site.email}`}><Mail aria-hidden="true" />Email</a>
        <a href={site.links.scholar} target="_blank" rel="noreferrer">
          <GraduationCap aria-hidden="true" />Scholar<ExternalLink className="external-mark" aria-hidden="true" />
        </a>
        <a href={site.links.orcid} target="_blank" rel="noreferrer">
          <Network aria-hidden="true" />ORCID<ExternalLink className="external-mark" aria-hidden="true" />
        </a>
      </Reveal>

      <Reveal className="profile-news" delay={0.22}>
        <div className="profile-news-heading">
          <span>News</span>
          <div aria-hidden="true" />
        </div>
        <div className="profile-news-list">
          <article className="profile-news-item">
            <time dateTime="2026-07-30">2026.07.30</time>
            <p>
              <strong>AgenticASR</strong> is now on arXiv, with the code and AASR-Bench released. <a href="https://arxiv.org/abs/2607.28175" target="_blank" rel="noreferrer">Paper <ArrowUpRight aria-hidden="true" /></a> <a href="https://github.com/AnXMuy/AgenticASR" target="_blank" rel="noreferrer">Code <ArrowUpRight aria-hidden="true" /></a> <a href="https://huggingface.co/datasets/Andrew0425/AASR-Bench" target="_blank" rel="noreferrer">AASR-Bench <ArrowUpRight aria-hidden="true" /></a>
            </p>
          </article>
          <article className="profile-news-item">
            <time dateTime="2026-07-29">2026.07.29</time>
            <p>
              <strong>OVEarth-Bench</strong> was released on arXiv with a project page for open-vocabulary Earth observation evaluation. <a href="https://arxiv.org/abs/2607.27278" target="_blank" rel="noreferrer">Paper <ArrowUpRight aria-hidden="true" /></a> <a href="https://earth-insights.github.io/OVEarth-bench" target="_blank" rel="noreferrer">Project <ArrowUpRight aria-hidden="true" /></a>
            </p>
          </article>
          <article className="profile-news-item">
            <time dateTime="2026-07-28">2026.07.28</time>
            <p>
              The <strong>VibeXASR</strong> project, in collaboration with Jun Guo, Tao Liu, and Chonghao Cai, won the Grand Prize at the Speech OPC Innovation &amp; Entrepreneurship Competition. <a href="https://vibexasr.speech.wiki/" target="_blank" rel="noreferrer">Project <ArrowUpRight aria-hidden="true" /></a>
            </p>
          </article>
          <article className="profile-news-item">
            <time dateTime="2025-09-30">2025.09.30</time>
            <p>
              <strong>DescribeEarth</strong> was made public with open-source code, dataset, and benchmark. <a href="https://arxiv.org/abs/2509.25654" target="_blank" rel="noreferrer">Paper <ArrowUpRight aria-hidden="true" /></a> <a href="https://github.com/earth-insights/DescribeEarth" target="_blank" rel="noreferrer">Code <ArrowUpRight aria-hidden="true" /></a> <a href="https://huggingface.co/datasets/earth-insights/DE-Dataset" target="_blank" rel="noreferrer">Dataset <ArrowUpRight aria-hidden="true" /></a> <a href="https://huggingface.co/datasets/earth-insights/DE-Benchmark" target="_blank" rel="noreferrer">Benchmark <ArrowUpRight aria-hidden="true" /></a>
            </p>
          </article>
        </div>
      </Reveal>
    </section>
  );
}
