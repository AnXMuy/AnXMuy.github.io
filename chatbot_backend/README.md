# AndrewBot Backend

A secure proxy between your homepage and DeepSeek OpenAI-compatible API.

This backend now runs in **skill-first mode** (no RAG retrieval from `knowledge/`).

## 3-Step Setup

1. Create local env file

```bash
cd chatbot_backend
cp .env.template.local .env
```

2. Edit `.env` and fill your settings

```bash
DEEPSEEK_API_KEY=
DEEPSEEK_BASE_URL=https://api.deepseek.com
DEEPSEEK_MODEL=deepseek-v4-flash
BOT_SKILL_FILE=/absolute/path/to/your/skill.md
PORT=8787
```

If `BOT_SKILL_FILE` is not set, backend uses `chatbot_backend/skill.md` by default.

3. Run server

```bash
set -a; source .env; set +a
node server.mjs
```

Then set site config in `_config.yml`:

```yml
chat_api_base_url: "http://127.0.0.1:8787"
```

## Endpoints

- `GET /health`
- `POST /chat`

Example request body:

```json
{ "question": "How should I design my research homepage intro?" }
```

Example response body:

```json
{
  "answer": "...",
  "citation": "skill.md",
  "citations": ["skill.md"]
}
```

## Security

- Keep `DEEPSEEK_API_KEY` only in local `.env` or deployment env vars.
- Never place API keys in frontend code.

## How to Distill Your Own Style

Edit your skill file and define:
- identity
- tone
- output structure
- boundaries
- personal preference signals

The backend injects this skill as a system message for every request.
