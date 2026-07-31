"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CitationCopy({ citation }: { citation: string }) {
  const [copied, setCopied] = useState(false);

  async function copyCitation() {
    let copiedSuccessfully = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(citation);
        copiedSuccessfully = true;
      }
    } catch {
      copiedSuccessfully = false;
    }

    if (!copiedSuccessfully) {
      const textarea = document.createElement("textarea");
      textarea.value = citation;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      copiedSuccessfully = document.execCommand("copy");
      textarea.remove();
    }

    if (copiedSuccessfully) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  }

  return (
    <button type="button" className="citation-copy" onClick={copyCitation}>
      {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
      <span>{copied ? "Copied" : "Copy BibTeX"}</span>
    </button>
  );
}
