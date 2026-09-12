"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { site } from "@/data/site";

export function CopyEmail() {
  const { language } = useLanguage();
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  const label = language === "zh" ? "复制邮箱" : "Copy email";
  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email);
      setStatus("copied");
    } catch { setStatus("error"); }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), 3000);
  }
  return (
    <span className="copy-email-control">
      <button type="button" onClick={copy} title={`${label}: ${site.email}`} aria-label={label}>
        {status === "copied" ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
      </button>
      <span className="copy-email-status" role="status">{status === "copied" ? (language === "zh" ? "已复制" : "Copied") : status === "error" ? site.email : ""}</span>
    </span>
  );
}
