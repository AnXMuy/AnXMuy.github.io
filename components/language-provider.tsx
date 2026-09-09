"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { translations } from "@/data/translations";

export type Language = "en" | "zh";
const LanguageContext = createContext({ language: "en" as Language, setLanguage: (_language: Language) => { void _language; } });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, updateLanguage] = useState<Language>("en");
  const setLanguage = (value: Language) => {
    updateLanguage(value);
    document.documentElement.lang = value === "zh" ? "zh-CN" : "en";
    try { localStorage.setItem("homepage-language", value); } catch {}
  };

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      let saved: string | null = null;
      try { saved = localStorage.getItem("homepage-language"); } catch {}
      const value = saved === "zh" || saved === "en" ? saved : "en";
      updateLanguage(value);
      document.documentElement.lang = value === "zh" ? "zh-CN" : "en";
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  const translate = (text: string) => context.language === "zh" ? translations[text] ?? text.replace(/Present/g, "至今") : text;
  return { ...context, translate };
}

export function T({ children, zh }: { children: string; zh?: string }) {
  const { language, translate } = useLanguage();
  return <>{language === "zh" && zh ? zh : translate(children)}</>;
}

export function Localized({ en, zh }: { en: ReactNode; zh: ReactNode }) {
  const { language } = useLanguage();
  return <>{language === "zh" ? zh : en}</>;
}

export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();
  return (
    <div className="language-switch" role="group" aria-label="Language / 语言">
      <button type="button" lang="zh-CN" aria-pressed={language === "zh"} onClick={() => setLanguage("zh")}>中文</button>
      <button type="button" lang="en" aria-pressed={language === "en"} onClick={() => setLanguage("en")}>EN</button>
    </div>
  );
}
