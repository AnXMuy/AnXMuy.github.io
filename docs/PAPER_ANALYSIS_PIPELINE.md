# Paper Analysis Generation Pipeline

This pipeline generates one refined analysis markdown per PDF under `../bot_memory`.

## 1) Set API environment variables

```bash
export PAPER_API_KEY="<your_api_key>"
export PAPER_API_BASE_URL="https://api.deepseek.com"
export PAPER_API_MODEL="deepseek-v4-flash"
```

Optional limits:

```bash
export PAPER_MAX_PAGES=16
export PAPER_MAX_CHARS=80000
export PAPER_TIMEOUT=240
```

## 2) Run generation

```bash
cd /Users/zixuan/Homepage/AnXMuy.github.io
python3 scripts/generate_paper_analysis.py
```

Outputs:
- `knowledge/papers/<paper_name>.md`
- `knowledge/papers/INDEX.md`

## 3) Use as RAG data

Backend `chatbot_backend/server.mjs` now loads markdown files recursively from `knowledge/`,
so `knowledge/papers/*.md` are automatically included after redeploy/restart.

## Notes
- If API key is missing, script will stop with `PAPER_API_KEY is empty`.
- If a PDF extraction is weak (scanned pages/formulas), rerun with larger page limit or manually add notes.
