"use client";

import Image, { type ImageProps } from "next/image";
import { Expand, Minus, Plus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/language-provider";

export function ZoomableImage({ src, alt, ...imageProps }: ImageProps) {
  const { language } = useLanguage();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [originalSize, setOriginalSize] = useState(false);
  const text = (en: string, zh: string) => language === "zh" ? zh : en;

  useEffect(() => {
    if (!open) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = overflow; };
  }, [open]);

  function openFigure() {
    setOpen(true);
    dialog.current?.showModal();
  }

  function restoreFocus() {
    setOpen(false);
    setOriginalSize(false);
    trigger.current?.focus({ preventScroll: true });
  }

  return (
    <div className="zoomable-figure">
      <Image src={src} alt={alt} {...imageProps} />
      <button type="button" ref={trigger} className="figure-expand" onClick={openFigure} aria-label={text(`Enlarge figure: ${alt}`, `放大图表：${alt}`)} title={text("Enlarge figure", "放大查看")}>
        <Expand size={14} aria-hidden="true" />
      </button>
      <dialog ref={dialog} className="figure-dialog" aria-label={text("Figure viewer", "图表查看器")} onClose={restoreFocus} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        <div className="figure-dialog-panel">
          <header className="figure-dialog-heading">
            <p>{alt}</p>
            <button type="button" onClick={() => setOriginalSize(!originalSize)} aria-pressed={originalSize} aria-label={text(originalSize ? "Fit figure to window" : "View original size", originalSize ? "适应窗口" : "查看原始尺寸")} title={text(originalSize ? "Fit to window" : "Original size", originalSize ? "适应窗口" : "原始尺寸")}>
              {originalSize ? <Minus size={18} aria-hidden="true" /> : <Plus size={18} aria-hidden="true" />}
            </button>
            <button type="button" onClick={() => dialog.current?.close()} aria-label={text("Close figure", "关闭图表")}><X size={19} aria-hidden="true" /></button>
          </header>
          <div className="figure-dialog-stage" data-original-size={originalSize}>
            {open && <Image {...imageProps} src={src} alt={alt} className="figure-dialog-image" sizes="94vw" priority={false} loading="eager" />}
          </div>
          <p className="figure-dialog-hint">{text("Esc to close · Use + to inspect the original image", "按 Esc 关闭 · 点击 + 查看原始图表细节")}</p>
        </div>
      </dialog>
    </div>
  );
}
