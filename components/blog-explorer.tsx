"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, BookOpen, Download, Search, Waves, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { blogPosts, type BlogCategory, type BlogPost } from "@/data/blog";
import { GitHubStars } from "@/components/github-stars";

const categories = [
  { id: "all", en: "All writing", zh: "全部内容" },
  { id: "research", en: "Paper notes", zh: "论文分享" },
  { id: "projects", en: "Project", zh: "Project" },
  { id: "documents", en: "Documents", zh: "文档资料" },
  { id: "notes", en: "Notes", zh: "随手记" },
] as const;

function PostLink({ post, children, className }: { post: BlogPost; children: React.ReactNode; className?: string }) {
  return post.external
    ? <a href={post.href} className={className} target="_blank" rel="noreferrer">{children}</a>
    : <Link href={post.href} className={className}>{children}</Link>;
}

export function BlogExplorer() {
  const { language } = useLanguage();
  const [category, setCategory] = useState<BlogCategory | "all">("all");
  const [query, setQuery] = useState("");
  const searchInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    function focusSearch(event: KeyboardEvent) {
      const target = event.target;
      const editing = target instanceof HTMLElement && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));
      if (event.key === "/" && !event.ctrlKey && !event.metaKey && !event.altKey && !editing) {
        event.preventDefault();
        searchInput.current?.focus();
      }
    }
    window.addEventListener("keydown", focusSearch);
    return () => window.removeEventListener("keydown", focusSearch);
  }, []);
  const text = (en: string, zh: string) => language === "zh" ? zh : en;
  const filtered = blogPosts.filter((post) => (category === "all" || post.category === category) &&
    `${post.title.en} ${post.title.zh} ${post.summary.en} ${post.summary.zh} ${post.tags.join(" ")}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()));
  const featured = blogPosts[0];
  const showFeatured = category === "all" && !query.trim();
  const listed = showFeatured ? filtered.filter((post) => post.slug !== featured.slug) : filtered;

  return (
    <div className="blog-explorer">
      <div className="blog-toolbar">
        <div className="blog-filters" role="group" aria-label={text("Filter by topic", "按主题筛选")}>
          {categories.map((item) => <button key={item.id} type="button" aria-pressed={category === item.id} onClick={() => setCategory(item.id)}>{item[language]}<span>{item.id === "all" ? blogPosts.length : blogPosts.filter((post) => post.category === item.id).length}</span></button>)}
        </div>
        <div className="blog-search">
          <Search size={17} aria-hidden="true" />
          <input ref={searchInput} type="search" aria-keyshortcuts="/" aria-label={text("Search writing", "搜索文章")} placeholder={text("Find a note…", "搜索一篇笔记…")} value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === "Escape") { setQuery(""); searchInput.current?.blur(); } }} />
          {!query && <kbd aria-hidden="true">/</kbd>}
          {query && <button type="button" aria-label={text("Clear search", "清空搜索")} onClick={() => setQuery("")}><X size={16} /></button>}
        </div>
      </div>
      <p className="blog-result-count" role="status">{text(`${filtered.length} entries · A growing collection`, `${filtered.length} 篇内容 · 持续积累中`)}</p>
      {showFeatured && <article className="blog-featured">
        <div className="blog-featured-copy">
          <p className="blog-eyebrow">{text("FEATURED / PAPER NOTES", "精选 / 论文分享")}</p>
          <time dateTime={featured.date}>{featured.date}</time>
          <h2><PostLink post={featured}>{featured.title[language]}</PostLink></h2>
          <p>{featured.summary[language]}</p>
          <div className="blog-tags">{featured.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <div className="blog-featured-links"><PostLink className="blog-read" post={featured}>{text("Explore the project", "阅读项目介绍")}<ArrowRight size={17} /></PostLink><a href={featured.paper} target="_blank" rel="noreferrer">{text("Read paper", "阅读论文")}<ArrowUpRight size={15} /></a></div>
        </div>
        <PostLink post={featured} className="blog-featured-art"><span aria-hidden="true">01 / RESEARCH NOTES</span><Image src={featured.image!} alt="AgenticASR task overview" width={1396} height={420} sizes="(max-width: 760px) 90vw, 45vw" /><span className="blog-art-caption">AUDIO → INTENT → CLEAN TEXT</span></PostLink>
      </article>}
      <div className="blog-card-grid">
        {listed.map((post) => <article className="blog-card" key={post.slug}>
          <div className={`blog-card-art ${post.category}`} aria-hidden="true"><BookOpen size={36} strokeWidth={1} /><span>{post.category === "documents" ? "DOCUMENTS / RESOURCES" : post.category === "research" ? "PAPERS / RESEARCH" : post.category === "projects" ? "BUILD / EXPLORE" : "IDEAS / NOTES"}</span></div>
          <div className="blog-card-body">
            <p className="blog-eyebrow">{categories.find((item) => item.id === post.category)?.[language]} <span> / {post.date || "GitHub"}</span></p>
            <h2><PostLink post={post}>{post.title[language]}<ArrowUpRight size={19} aria-hidden="true" /></PostLink></h2>
            <p>{post.summary[language]}</p>
            <div className="blog-tags">{post.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            <div className="blog-card-bottom"><PostLink post={post}>{text(post.external ? "View repository" : "Read note", post.external ? "查看仓库" : "阅读全文")}<ArrowRight size={16} /></PostLink>{post.download && <a href={post.download} download><Download size={15} />PDF</a>}{post.external && <GitHubStars repositoryUrl={post.href} />}</div>
          </div>
        </article>)}
      </div>
      {filtered.length === 0 && <div className="blog-empty"><Waves size={36} strokeWidth={1} /><h2>{text(query.trim() ? "No notes found" : "A little space for future notes", query.trim() ? "暂时没有找到相关内容" : "留一点空白，记一些日常")}</h2><p>{text(query.trim() ? "Try another keyword, or explore all topics." : "No posts here yet. Small observations, everyday ideas, and personal reflections will live here.", query.trim() ? "试试其他关键词，或返回全部内容。" : "这里还没有发布内容。零散的想法、日常发现和阶段复盘，之后会记录在这里。")}</p><button type="button" onClick={() => { setCategory("all"); setQuery(""); }}>{text("Explore all writing", "浏览全部内容")}<ArrowRight size={16} /></button></div>}
      <aside className="blog-colophon"><Waves size={24} strokeWidth={1.3} /><div><strong>{text("Small notes, a longer journey.", "把沿途的思考，慢慢写下来。")}</strong><p>{text("Research, study, and the things learned in between. This collection grows one entry at a time.", "论文、学习，以及其间的经历与发现。这里会一篇一篇地更新。")}</p></div><span>ANDREW’S FIELD NOTES</span></aside>
    </div>
  );
}
