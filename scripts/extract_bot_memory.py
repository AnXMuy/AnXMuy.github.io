#!/usr/bin/env python3
"""
Extract text from PDFs in ../bot_memory and generate a markdown knowledge file.
"""

from pathlib import Path
from pypdf import PdfReader

REPO_ROOT = Path(__file__).resolve().parents[1]
BOT_MEMORY_DIR = REPO_ROOT.parent / "bot_memory"
OUTPUT_MD = REPO_ROOT / "knowledge" / "bot_memory_extracted.md"
MAX_PAGES_PER_PDF = 20
MAX_CHARS_PER_PDF = 24000


def clean_text(text: str) -> str:
    lines = [line.strip() for line in text.splitlines()]
    lines = [line for line in lines if line]
    return "\n".join(lines)


def extract_pdf_text(pdf_path: Path) -> str:
    reader = PdfReader(str(pdf_path))
    pages = reader.pages[:MAX_PAGES_PER_PDF]
    parts = []
    for page in pages:
        txt = page.extract_text() or ""
        if txt:
            parts.append(txt)
    merged = "\n".join(parts)
    merged = clean_text(merged)
    return merged[:MAX_CHARS_PER_PDF]


def main() -> None:
    OUTPUT_MD.parent.mkdir(parents=True, exist_ok=True)

    lines = [
        "# Bot Memory Extracted Knowledge",
        "",
        "Auto-generated from PDF files under ../bot_memory.",
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

    for pdf in pdf_files:
        lines.append(f"## {pdf.name}")
        try:
            text = extract_pdf_text(pdf)
            if not text:
                lines.append("(No extractable text found)\n")
            else:
                lines.append("```text")
                lines.append(text)
                lines.append("```\n")
        except Exception as exc:
            lines.append(f"(Extraction failed: {exc})\n")

    OUTPUT_MD.write_text("\n".join(lines), encoding="utf-8")
    print(f"[OK] Wrote {OUTPUT_MD}")


if __name__ == "__main__":
    main()
