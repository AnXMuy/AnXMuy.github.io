import { createServer } from 'node:http';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';

const PORT = Number(process.env.PORT || 8787);
const API_KEY = process.env.DEEPSEEK_API_KEY || '';
const API_BASE_URL = process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com';
const MODEL = process.env.DEEPSEEK_MODEL || 'deepseek-v4-flash';
const KNOWLEDGE_DIR = process.env.KNOWLEDGE_DIR || resolve(process.cwd(), 'knowledge');

function loadKnowledgeChunks() {
  const files = readdirSync(KNOWLEDGE_DIR)
    .filter((name) => name.endsWith('.md'))
    .sort();

  const chunks = [];
  for (const file of files) {
    const full = join(KNOWLEDGE_DIR, file);
    const text = readFileSync(full, 'utf-8');
    const sections = text
      .split(/\n## /g)
      .map((section, idx) => (idx === 0 ? section : '## ' + section))
      .map((chunk) => chunk.trim())
      .filter(Boolean);

    for (const section of sections) {
      chunks.push({ file, text: section });
    }
  }
  return chunks;
}

const knowledgeChunks = loadKnowledgeChunks();

function selectContext(question, topK = 5) {
  const terms = question
    .toLowerCase()
    .split(/[^a-z0-9\u4e00-\u9fff]+/)
    .filter((w) => w.length > 1);

  const scored = knowledgeChunks.map((item, idx) => {
    const lower = item.text.toLowerCase();
    let score = 0;
    for (const t of terms) {
      if (lower.includes(t)) score += 1;
    }
    return { idx, ...item, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((x) => `[Source: ${x.file}]\n${x.text}`);
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

function detectQuestionLanguage(question) {
  const hasChinese = /[\u4e00-\u9fff]/.test(question);
  return hasChinese ? 'Chinese' : 'English';
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

  const language = detectQuestionLanguage(question);
  const contextList = selectContext(question, 5);
  const context = contextList.join('\n\n');

  const systemPrompt = [
    'You are AndrewBot, the official assistant for Zixuan Jiang (Andrew).',
    'Answer ONLY based on provided context.',
    'If context is insufficient, explicitly say you are not sure.',
    'Keep answers concise and factual.',
    `Always respond in ${language}.`,
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
  const firstSource = contextList[0]?.match(/\[Source: ([^\]]+)\]/)?.[1] || 'knowledge';

  return json(res, 200, {
    answer,
    citation: firstSource
  });
}

const server = createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    return json(res, 204, {});
  }

  if (req.url === '/health' && req.method === 'GET') {
    return json(res, 200, {
      ok: true,
      model: MODEL,
      knowledge_dir: KNOWLEDGE_DIR,
      chunks: knowledgeChunks.length
    });
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
