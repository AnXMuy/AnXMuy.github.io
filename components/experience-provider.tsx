"use client";

import { ArrowUp, Pause, Waves } from "lucide-react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useLanguage } from "@/components/language-provider";

const ExperienceContext = createContext({ motionEnabled: true });

export function useExperience() {
  return useContext(ExperienceContext);
}

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const { language } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showTools, setShowTools] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const motionEnabled = !reduceMotion && !paused;
  const experience = useMemo(() => ({ motionEnabled }), [motionEnabled]);
  const text = (en: string, zh: string) => language === "zh" ? zh : en;

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setProgress(Math.round(Math.min(1, Math.max(0, value)) * 100));
  });
  useMotionValueEvent(scrollY, "change", (value) => setShowTools(value > 260));

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try { setPaused(localStorage.getItem("homepage-motion") === "paused"); } catch {}
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.motion = motionEnabled ? "gentle" : "paused";
  }, [motionEnabled]);

  function toggleMotion() {
    const next = !paused;
    setPaused(next);
    try { localStorage.setItem("homepage-motion", next ? "paused" : "gentle"); } catch {}
  }

  const motionLabel = reduceMotion
    ? text("Reduced motion follows your system setting", "已跟随系统减少动态效果")
    : motionEnabled ? text("Pause gentle animations", "关闭轻动效") : text("Enable gentle animations", "开启轻动效");

  return (
    <ExperienceContext.Provider value={experience}>
      <motion.div className="reading-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
      {children}
      {showTools && (
        <motion.aside
          className="experience-dock"
          aria-label={text("Reading tools", "阅读工具")}
          initial={motionEnabled ? { opacity: 0, y: 6 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: motionEnabled ? 0.25 : 0 }}
        >
          <button type="button" className="reading-top" onClick={() => window.scrollTo({ top: 0, behavior: motionEnabled ? "smooth" : "auto" })} aria-label={text("Back to top", "回到顶部")} title={text(`Page progress: ${progress}%`, `页面进度：${progress}%`)}>
            <svg className="reading-ring" viewBox="0 0 44 44" aria-hidden="true">
              <circle cx="22" cy="22" r="18" />
              <circle cx="22" cy="22" r="18" pathLength="100" strokeDasharray="100" strokeDashoffset={100 - progress} />
            </svg>
            <ArrowUp size={16} aria-hidden="true" />
          </button>
          <span className="reading-percent" aria-hidden="true">{progress}%</span>
          <button type="button" className="motion-toggle" disabled={!!reduceMotion} aria-label={motionLabel} title={motionLabel} aria-pressed={paused || !!reduceMotion} onClick={toggleMotion}>
            {motionEnabled ? <Pause size={15} aria-hidden="true" /> : <Waves size={16} aria-hidden="true" />}
          </button>
        </motion.aside>
      )}
    </ExperienceContext.Provider>
  );
}
