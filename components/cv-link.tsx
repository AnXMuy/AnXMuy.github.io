"use client";

import { FileText } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { site } from "@/data/site";

export function CVLink() {
  const { language } = useLanguage();
  const label = language === "zh" ? "查看中文简历" : "View English CV";
  return (
    <a className="cv-link" href={language === "zh" ? site.cvChinese : site.cv} target="_blank" rel="noreferrer" title={label} aria-label={label} hrefLang={language === "zh" ? "zh-CN" : "en"}>
      <FileText aria-hidden="true" />
      <span>{language === "zh" ? "简历" : "CV"}</span>
    </a>
  );
}
