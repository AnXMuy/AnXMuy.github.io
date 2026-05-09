# AndrewBot Backend

A secure proxy between your homepage and DeepSeek OpenAI-compatible API.

## 3-Step Setup

1. Create local env file

```bash
cd chatbot_backend
cp .env.template.local .env
```

2. Edit `.env` and fill your key

```bash
DEEPSEEK_API_KEY=
DEEPSEEK_BASE_URL=https://api.deepseek.com
DEEPSEEK_MODEL=deepseek-v4-flash
PORT=8787
```

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
{ "question": "What is Andrew's research focus?" }
```

## Security

- Keep `DEEPSEEK_API_KEY` only in local `.env` or deployment env vars.
- Never place API keys in frontend code.

## Knowledge Source

The backend loads all `.md` files under `knowledge/`.

You can refresh PDF extracted knowledge by running:

```bash
python3 scripts/extract_bot_memory.py
```
