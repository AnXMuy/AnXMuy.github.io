"use client";

import Link from "next/link";
import { ArrowUpRight, ArrowRight, Search, Waves, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { blogPosts, type BlogCategory, type BlogPost } from "@/data/blog";

const categories = [
  { id: "all", en: "All writing", zh: "全部内容" },
  { id: "research", en: "Paper notes", zh: "论文分享" },
  { id: "projects", en: "Project", zh: "Project" },
  { id: "documents", en: "Documents", zh: "文档资料" },
  { id: "notes", en: "Paper notes", zh: "论文笔记" },
] as const;

function PostLink({ post, children, className }: { post: BlogPost; children: React.ReactNode; className?: string }) {
  return post.external
    ? <a href={post.href} className={className} target="_blank" rel="noreferrer">{children}</a>
    : <Link href={post.href} className={className}>{children}</Link>;
}

function isRepositoryPost(post: BlogPost) {
  return post.external && post.href.startsWith("https://github.com/");
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
    `${post.title.en} ${post.title.zh} ${post.summary.en} ${post.summary.zh} ${post.tags.flatMap((tag) => [tag.en, tag.zh]).join(" ")}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()));
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
      <div className="blog-list">
        {filtered.map((post) => <article className="blog-row" key={post.slug}>
          <PostLink post={post} className="blog-row-link">
            <div className="blog-row-meta"><span>{categories.find((item) => item.id === post.category)?.[language]}</span><span>{post.date || (isRepositoryPost(post) ? "GitHub" : text("External page", "外部页面"))}</span></div>
            <div className="blog-row-content"><div><h2>{post.title[language]}</h2><p>{post.summary[language]}</p></div><ArrowUpRight className="blog-row-arrow" size={19} aria-hidden="true" /></div>
          </PostLink>
        </article>)}
      </div>
      {filtered.length === 0 && <div className="blog-empty"><Waves size={36} strokeWidth={1} /><h2>{text(query.trim() ? "No notes found" : "A little space for future notes", query.trim() ? "暂时没有找到相关内容" : "留一点空白，记一些日常")}</h2><p>{text(query.trim() ? "Try another keyword, or explore all topics." : "No posts here yet. Small observations, everyday ideas, and personal reflections will live here.", query.trim() ? "试试其他关键词，或返回全部内容。" : "这里还没有发布内容。零散的想法、日常发现和阶段复盘，之后会记录在这里。")}</p><button type="button" onClick={() => { setCategory("all"); setQuery(""); }}>{text("Explore all writing", "浏览全部内容")}<ArrowRight size={16} /></button></div>}
      <aside className="blog-colophon"><Waves size={24} strokeWidth={1.3} /><div><strong>{text("Small notes, a longer journey.", "把沿途的思考，慢慢写下来。")}</strong><p>{text("Research, study, and the things learned in between. This collection grows one entry at a time.", "论文、学习，以及其间的经历与发现。这里会一篇一篇地更新。")}</p></div><span>ANDREW’S FIELD NOTES</span></aside>
    </div>
  );
}
