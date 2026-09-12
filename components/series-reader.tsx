"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { AudioLines, Globe2, Waves } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { useExperience } from "@/components/experience-provider";

type SeriesPage = { id: string; title: string; count: number };
const icons = [Globe2, AudioLines, Waves];

export function SeriesReader({ pages, children }: { pages: SeriesPage[]; children: ReactNode[] }) {
  const { language, translate } = useLanguage();
  const { motionEnabled } = useExperience();
  const [active, setActive] = useState(0);
  const [enhanced, setEnhanced] = useState(false);
  const [direction, setDirection] = useState(1);
  const root = useRef<HTMLDivElement>(null);
  const scrollFrame = useRef<number | null>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const text = (en: string, zh: string) => language === "zh" ? zh : en;

  useEffect(() => {
    function restore() {
      const hash = window.location.hash.slice(1);
      const index = pages.findIndex((page) => hash === page.id || hash === `${page.id}-title`);
      setActive(index < 0 ? 0 : index);
      setEnhanced(true);
    }
    const frame = requestAnimationFrame(restore);
    window.addEventListener("hashchange", restore);
    return () => {
      cancelAnimationFrame(frame);
      if (scrollFrame.current !== null) cancelAnimationFrame(scrollFrame.current);
      window.removeEventListener("hashchange", restore);
    };
  }, [pages]);

  function select(index: number, focusTab = false) {
    if (index < 0 || index >= pages.length) return;
    if (index !== active) {
      setDirection(index > active ? 1 : -1);
      setActive(index);
      window.history.pushState(null, "", `#${pages[index].id}-title`);
    }
    if (focusTab) tabs.current[index]?.focus({ preventScroll: true });
    const top = root.current?.getBoundingClientRect().top;
    const headerHeight = document.querySelector(".site-header")?.getBoundingClientRect().height ?? 0;
    if (top !== undefined && top < headerHeight) {
      if (scrollFrame.current !== null) cancelAnimationFrame(scrollFrame.current);
      scrollFrame.current = requestAnimationFrame(() => {
        const updatedTop = root.current?.getBoundingClientRect().top;
        if (updatedTop !== undefined) window.scrollTo({ top: window.scrollY + updatedTop - headerHeight - 16, behavior: motionEnabled ? "smooth" : "auto" });
      });
    }
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % pages.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + pages.length) % pages.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = pages.length - 1;
    else return;
    event.preventDefault();
    select(next, true);
  }

  return (
    <div ref={root} className="series-reader" data-enhanced={enhanced} data-direction={direction}>
      <div className="series-controls" hidden={!enhanced}>
        <div className="series-reader-heading"><p>{text("Explore by research series", "按研究系列浏览")}</p></div>
        <div className="series-tabs" role="tablist" aria-label={text("Research series", "研究系列")}>
          {pages.map((page, index) => {
            const Icon = icons[index % icons.length];
            return (
              <button key={page.id} ref={(element) => { tabs.current[index] = element; }} id={`tab-${page.id}`} type="button" role="tab" aria-selected={index === active} aria-controls={`panel-${page.id}`} tabIndex={index === active ? 0 : -1} onClick={() => select(index)} onKeyDown={(event) => onKeyDown(event, index)}>
                <span className="series-tab-top"><Icon aria-hidden="true" /><span>{String(index + 1).padStart(2, "0")}</span></span>
                <strong>{translate(page.title)}</strong>
                <small>{page.count} {text(page.count === 1 ? "paper" : "papers", "篇论文")}</small>
              </button>
            );
          })}
        </div>
        <span className="series-announcement" role="status">{text("Series", "系列")} {active + 1} / {pages.length}: {translate(pages[active]?.title ?? "")}</span>
      </div>
      {pages.map((page, index) => (
        <div className="series-panel" key={page.id} id={`panel-${page.id}`} role={enhanced ? "tabpanel" : undefined} aria-labelledby={enhanced ? `tab-${page.id}` : undefined} tabIndex={enhanced ? 0 : undefined} hidden={enhanced && index !== active} data-active={enhanced && index === active}>
          {children[index]}
        </div>
      ))}
    </div>
  );
}
