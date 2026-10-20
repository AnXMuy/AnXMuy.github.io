"use client";

import { useEffect, useId, useRef, useState } from "react";
import { GraduationCap, Mail, MapPin, Network, NotebookPen } from "lucide-react";
import { site } from "@/data/site";
import { Localized, T, useLanguage } from "@/components/language-provider";
import { CopyEmail } from "@/components/copy-email";

export function ContactLinks() {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);
  const pinned = useRef(false);
  const email = useRef<HTMLSpanElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const popoverId = useId();

  useEffect(() => {
    if (!open) return;
    function closeOutside(event: PointerEvent) {
      if (!email.current?.contains(event.target as Node)) {
        pinned.current = false;
        setOpen(false);
      }
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        pinned.current = false;
        setOpen(false);
        trigger.current?.focus();
      }
    }
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <nav className="contact-links" aria-label={language === "zh" ? "联系与学术主页" : "Contact and academic profiles"}>
      <span className="contact-location"><MapPin aria-hidden="true" /><T>{site.location}</T></span>
      <span
        className="email-contact"
        ref={email}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => { if (!pinned.current) setOpen(false); }}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            pinned.current = false;
            setOpen(false);
          }
        }}
      >
        <button ref={trigger} type="button" className="email-trigger" aria-expanded={open} aria-controls={popoverId} onClick={() => {
          pinned.current = !pinned.current;
          setOpen(pinned.current);
        }}><Mail aria-hidden="true" /><T>Email</T></button>
        {open && <div id={popoverId} className="email-popover" role="region" aria-label={language === "zh" ? "邮箱地址" : "Email addresses"}>
          <div className="email-popover-content">
            <div className="email-choice">
              <span className="email-choice-label"><Localized en="Gmail · preferred" zh="Gmail · 首选" /></span>
              <div className="email-choice-address"><a href={`mailto:${site.email}`}>{site.email}</a><CopyEmail /></div>
            </div>
            <div className="email-choice">
              <span className="email-choice-label"><Localized en="University email" zh="教育邮箱" /></span>
              <a href={`mailto:${site.backupEmail}`}>{site.backupEmail}</a>
            </div>
          </div>
        </div>}
      </span>
      <a href={site.links.scholar} target="_blank" rel="noreferrer"><GraduationCap aria-hidden="true" />Scholar</a>
      <a href={site.links.orcid} target="_blank" rel="noreferrer"><Network aria-hidden="true" />ORCID</a>
      <a href={site.links.xiaohongshu} target="_blank" rel="noreferrer"><NotebookPen aria-hidden="true" /><T>RedNote</T></a>
    </nav>
  );
}
