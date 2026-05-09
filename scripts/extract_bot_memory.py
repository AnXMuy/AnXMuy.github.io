#!/usr/bin/env python3
"""Generate refined markdown knowledge from PDFs under ../bot_memory.

Refinement goals:
- lower noise than full dump
- keep abstract and early core sections
- keep deterministic output for reproducible deploys
"""

from pathlib import Path
from pypdf import PdfReader
import re

REPO_ROOT = Path(__file__).resolve().parents[1]
BOT_MEMORY_DIR = REPO_ROOT.parent / "bot_memory"
OUTPUT_MD = REPO_ROOT / "knowledge" / "bot_memory_extracted.md"
MAX_PAGES_PER_PDF = 3
MAX_CHARS_PER_PDF = 5000
MAX_SECTION_CHARS = 1200


def clean_text(text: str) -> str:
    text = text.replace("\x00", " ")
    lines = [line.strip() for line in text.splitlines()]
    lines = [line for line in lines if line]
    compact = "\n".join(lines)
    compact = re.sub(r"\n{3,}", "\n\n", compact)
    return compact


def extract_pdf_text(pdf_path: Path) -> str:
    reader = PdfReader(str(pdf_path))
    pages = reader.pages[:MAX_PAGES_PER_PDF]
    parts = []
    for page in pages:
        txt = page.extract_text() or ""
        if txt:
            parts.append(txt)
    merged = clean_text("\n".join(parts))
    return merged[:MAX_CHARS_PER_PDF]


def extract_abstract(text: str) -> str:
    lower = text.lower()
    keys = ["abstract", "摘要"]
    start = -1
    for k in keys:
        idx = lower.find(k)
        if idx != -1:
            start = idx
            break
    if start == -1:
        return text[:1200]

    tail = text[start: start + 6000]
    end_candidates = [
        tail.lower().find("keywords"),
        tail.lower().find("index terms"),
        tail.lower().find("1 introduction"),
        tail.lower().find("1. introduction"),
        tail.lower().find("引言"),
    ]
    end_candidates = [x for x in end_candidates if x > 0]
    end = min(end_candidates) if end_candidates else min(len(tail), 1600)
    return tail[:end]


def main() -> None:
    OUTPUT_MD.parent.mkdir(parents=True, exist_ok=True)

    lines = [
        "# Bot Memory Extracted Knowledge (Refined)",
        "",
        "Generated from PDF files under `../bot_memory`.",
        "Extraction strategy: first pages + abstract-focused trimming.",
        "",
    ]

    if not BOT_MEMORY_DIR.exists():
        lines.append(f"bot_memory folder not found: {BOT_MEMORY_DIR}")
        OUTPUT_MD.write_text("\n".join(lines), encoding="utf-8")
        print(f"[WARN] bot_memory folder not found: {BOT_MEMORY_DIR}")
        return

    pdf_files = sorted(BOT_MEMORY_DIR.glob("*.pdf"))
    if not pdf_files:
        lines.append("No PDF files found.")
        OUTPUT_MD.write_text("\n".join(lines), encoding="utf-8")
        print("[WARN] No PDF files found.")
        return

    lines.append("## File Index")
    for pdf in pdf_files:
        lines.append(f"- {pdf.name}")
    lines.append("")

    for pdf in pdf_files:
        lines.append(f"## {pdf.name}")
        try:
            text = extract_pdf_text(pdf)
            if not text:
                lines.append("(No extractable text found)\n")
                continue

            abstract = extract_abstract(text)[:MAX_SECTION_CHARS]
            lines.append("### Abstract or Early Summary")
            lines.append("```text")
            lines.append(abstract)
            lines.append("```")
            lines.append("")

            lines.append("### Early Content Snippet")
            lines.append("```text")
            lines.append(text[:MAX_SECTION_CHARS])
            lines.append("```")
            lines.append("")
        except Exception as exc:
            lines.append(f"(Extraction failed: {exc})\n")

    OUTPUT_MD.write_text("\n".join(lines), encoding="utf-8")
    print(f"[OK] Wrote {OUTPUT_MD}")


if __name__ == "__main__":
    main()
