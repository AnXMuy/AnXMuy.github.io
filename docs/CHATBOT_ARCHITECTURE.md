# Homepage Chatbot Architecture (Secure API + Markdown Knowledge)

## Goal

- Users on your homepage can ask questions (especially research-related) via chatbot.
- Chatbot answers based on your own Markdown knowledge files.
- You can keep adding knowledge files over time.
- API credentials stay secure and never appear in frontend code.

## Security Rule (Must Follow)

Never put `API_KEY` in:
- `_config.yml`
- frontend JavaScript
- public repository

Store secrets only in server-side environment variables on your API server (Vercel/Cloudflare/your backend).

## Current Homepage Integration

The page reads the following config from `_config.yml`:

- `chat_api_base_url`: public URL of your chatbot backend (safe to expose)

The page sends requests to:

- `POST {chat_api_base_url}/chat`

Expected JSON request:

```json
{
  "question": "User question",
  "source": "homepage"
}
```

Expected JSON response:

```json
{
  "answer": "Chatbot answer",
  "citation": "optional source file/chunk"
}
```

## Recommended Backend Design

1. Ingestion pipeline
- Load `knowledge/*.md`
- Split into chunks
- Create embeddings
- Upsert to vector database

2. Chat endpoint `/chat`
- Embed user question
- Vector search top-K chunks
- Build prompt with retrieved context
- Call LLM chat API
- Return answer + citation

3. Secret storage (server only)
- `OPENAI_API_KEY`
- `OPENAI_BASE_URL` (if custom)
- `OPENAI_MODEL`
- `VECTOR_DB_URL`, `VECTOR_DB_KEY`, etc.

## Knowledge File Strategy

Suggested structure:

```text
knowledge/
  bio.md
  research.md
  publications.md
  projects.md
  awards.md
  faq.md
```

Each file should be concise and structured by headings. This improves retrieval quality.

## Next Step for You

1. Provide your API backend URL to set `chat_api_base_url`.
2. Provide Markdown files; they will be normalized into a stable knowledge base.
3. Deploy backend with server-side env vars.
4. Turn on the chatbot by setting `chat_api_base_url` in `_config.yml`.

