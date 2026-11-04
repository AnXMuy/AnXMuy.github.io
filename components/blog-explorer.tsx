"use client";

import Link from "next/link";
import { ArrowUpRight, ArrowRight, Search, Waves, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { blogPosts, type BlogCategory, type BlogPost } from "@/data/blog";

const categories = [
  { id: "all", en: "All posts", zh: "全部" },
  { id: "research", en: "Research notes", zh: "研究笔记" },
  { id: "projects", en: "Projects", zh: "项目" },
  { id: "documents", en: "Documents", zh: "文档" },
  { id: "notes", en: "Occasional notes", zh: "随记" },
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
      <p className="blog-result-count" role="status">{text(`${filtered.length} ${filtered.length === 1 ? "entry" : "entries"}`, `${filtered.length} 条内容`)}</p>
      <div className="blog-list">
        {filtered.map((post) => <article className="blog-row" key={post.slug}>
          <PostLink post={post} className="blog-row-link">
            <div className="blog-row-meta"><span>{categories.find((item) => item.id === post.category)?.[language]}</span><span>{post.date || (isRepositoryPost(post) ? "GitHub" : text("External page", "外部页面"))}</span></div>
            <div className="blog-row-content"><div><h2>{post.title[language]}</h2><p>{post.summary[language]}</p></div><ArrowUpRight className="blog-row-arrow" size={19} aria-hidden="true" /></div>
          </PostLink>
        </article>)}
      </div>
      {filtered.length === 0 && <div className="blog-empty"><Waves size={36} strokeWidth={1} /><h2>{text(query.trim() ? "No matching posts" : "Nothing here yet", query.trim() ? "没有找到相关内容" : "这个分类还没有内容")}</h2><p>{text(query.trim() ? "Try another keyword, or browse all posts." : "There are no posts in this section yet.", query.trim() ? "可以换个关键词，或查看全部内容。" : "这个分类目前还没有发布内容。")}</p><button type="button" onClick={() => { setCategory("all"); setQuery(""); }}>{text("View all posts", "查看全部内容")}<ArrowRight size={16} /></button></div>}
      <aside className="blog-colophon"><Waves size={24} strokeWidth={1.3} /><div><strong>{text("Notes from the workbench.", "案头笔记。")}</strong><p>{text("Research, coursework, and the practical details that rarely make it into a paper.", "记录科研、课程与实践中那些通常不会写进论文的细节。")}</p></div><span>ANDREW’S NOTEBOOK</span></aside>
    </div>
  );
}
