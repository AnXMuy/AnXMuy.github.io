# AndrewBot Backend

This server is a secure proxy between your homepage and DeepSeek OpenAI-compatible API.

## Security
- Keep `DEEPSEEK_API_KEY` only in server environment variables.
- Never place API keys in `_config.yml` or frontend JavaScript.

## Run locally

```bash
cd chatbot_backend
cp .env.example .env
# edit .env
set -a; source .env; set +a
node server.mjs
```

Then set site config:

```yml
chat_api_base_url: "http://127.0.0.1:8787"
```

## Endpoints
- `GET /health`
- `POST /chat` with body:

```json
{ "question": "What is Andrew's research focus?" }
```

## Data source
The backend currently reads:
- `knowledge/andrewbot_knowledge.md`

You can keep expanding this file and restart server.
