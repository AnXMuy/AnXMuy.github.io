"use client";

import { Shell } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { useExperience } from "@/components/experience-provider";

const notes = [
  { en: "Simplicity does not precede complexity, but follows it.", zh: "简单并非先于复杂，而是在复杂之后。", number: 31 },
  { en: "One man's constant is another man's variable.", zh: "一个人的常量，是另一个人的变量。", number: 1 },
] as const;

export function SeaNote() {
  const { language } = useLanguage();
  const { motionEnabled } = useExperience();
  const [index, setIndex] = useState(0);
  const [turn, setTurn] = useState(0);

  function pickNote() {
    setIndex((current) => (current + 1 + Math.floor(Math.random() * (notes.length - 1))) % notes.length);
    setTurn((current) => current + 1);
  }

  return (
    <div className="sea-note">
      <button type="button" onClick={pickNote} aria-label={language === "zh" ? "换一句计算机名言" : "Show another computing quote"}><Shell size={15} aria-hidden="true" /><span>{language === "zh" ? "计算机拾句 · 换一句" : "Computing notes · shuffle"}</span></button>
      <div className="sea-note-message" aria-live="polite" aria-atomic="true">
        <motion.p key={turn} initial={motionEnabled && turn > 0 ? { opacity: 0.4, y: 4 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: motionEnabled ? 0.35 : 0 }}>{notes[index][language]}</motion.p>
        <a className="quote-source" href="https://www.cs.yale.edu/homes/perlis-alan/quotes.html" target="_blank" rel="noreferrer">Alan Perlis · Epigrams on Programming #{notes[index].number}{language === "zh" ? " · 译文" : ""}</a>
      </div>
    </div>
  );
}
