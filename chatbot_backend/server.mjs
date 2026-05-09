import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const PORT = Number(process.env.PORT || 8787);
const API_KEY = process.env.DEEPSEEK_API_KEY || '';
const API_BASE_URL = process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com';
const MODEL = process.env.DEEPSEEK_MODEL || 'deepseek-v4-flash';
const KNOWLEDGE_FILE = process.env.KNOWLEDGE_FILE || resolve(process.cwd(), 'knowledge/andrewbot_knowledge.md');

function loadKnowledge() {
  const text = readFileSync(KNOWLEDGE_FILE, 'utf-8');
  const chunks = text
    .split(/\n## /g)
    .map((section, idx) => (idx === 0 ? section : '## ' + section))
    .map((chunk) => chunk.trim())
    .filter(Boolean);
  return chunks;
}

const knowledgeChunks = loadKnowledge();

function selectContext(question, topK = 4) {
  const terms = question
    .toLowerCase()
    .split(/[^a-z0-9\u4e00-\u9fff]+/)
    .filter((w) => w.length > 1);

  const scored = knowledgeChunks.map((chunk, idx) => {
    const lower = chunk.toLowerCase();
    let score = 0;
    for (const t of terms) {
      if (lower.includes(t)) score += 1;
    }
    return { idx, chunk, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((x) => x.chunk)
    .join('\n\n');
}

function json(res, status, data) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data));
}

async function handleChat(req, res) {
  if (!API_KEY) {
    return json(res, 500, { error: 'DEEPSEEK_API_KEY is not configured on server.' });
  }

  let body = '';
  for await (const chunk of req) body += chunk;

  let payload;
  try {
    payload = JSON.parse(body || '{}');
  } catch {
    return json(res, 400, { error: 'Invalid JSON body.' });
  }

  const question = String(payload.question || '').trim();
  if (!question) {
    return json(res, 400, { error: 'question is required.' });
  }

  const context = selectContext(question, 4);

  const systemPrompt = [
    'You are AndrewBot, the official assistant for Zixuan Jiang (Andrew).',
    'Answer ONLY based on provided context.',
    'If context is insufficient, explicitly say you are not sure.',
    'Keep answers concise and factual.',
    'When possible, mention related paper title or profile link.'
  ].join(' ');

  const response = await fetch(`${API_BASE_URL.replace(/\/$/, '')}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        {
          role: 'user',
          content: `Context:\n${context}\n\nQuestion: ${question}`
        }
      ],
      thinking: { type: 'enabled' },
      reasoning_effort: 'high',
      stream: false
    })
  });

  if (!response.ok) {
    const text = await response.text();
    return json(res, 502, { error: 'Upstream model error', detail: text });
  }

  const data = await response.json();
  const answer = data?.choices?.[0]?.message?.content || 'No answer returned.';
  return json(res, 200, {
    answer,
    citation: 'knowledge/andrewbot_knowledge.md'
  });
}

const server = createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    return json(res, 204, {});
  }

  if (req.url === '/health' && req.method === 'GET') {
    return json(res, 200, { ok: true, model: MODEL });
  }

  if (req.url === '/chat' && req.method === 'POST') {
    try {
      return await handleChat(req, res);
    } catch (err) {
      return json(res, 500, { error: 'Server error', detail: String(err?.message || err) });
    }
  }

  return json(res, 404, { error: 'Not found' });
});

server.listen(PORT, () => {
  console.log(`AndrewBot backend running on http://127.0.0.1:${PORT}`);
});
