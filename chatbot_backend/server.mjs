import { createServer } from 'node:http';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const PORT = Number(process.env.PORT || 8787);
const API_KEY = process.env.DEEPSEEK_API_KEY || '';
const API_BASE_URL = process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com';
const MODEL = process.env.DEEPSEEK_MODEL || 'deepseek-v4-flash';

const DEFAULT_SKILL_PROMPT = 'Keep a concise, direct, factual tone. If unsure, say so clearly.';

function resolveSkillPath() {
  const fromEnv = process.env.BOT_SKILL_FILE;
  const candidates = [
    fromEnv,
    resolve(process.cwd(), 'skill.md'),
    resolve(process.cwd(), 'chatbot_backend', 'skill.md'),
    resolve(process.cwd(), '..', 'chatbot_backend', 'skill.md')
  ].filter(Boolean);

  for (const p of candidates) {
    if (existsSync(p)) return p;
  }
  return null;
}

function loadSkillPrompt() {
  const skillPath = resolveSkillPath();
  if (!skillPath) {
    return { prompt: DEFAULT_SKILL_PROMPT, path: null };
  }

  try {
    const text = readFileSync(skillPath, 'utf-8').trim();
    if (!text) {
      return { prompt: DEFAULT_SKILL_PROMPT, path: skillPath };
    }
    return { prompt: text, path: skillPath };
  } catch {
    return { prompt: DEFAULT_SKILL_PROMPT, path: skillPath };
  }
}

function json(res, status, data) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
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
  const { prompt: skillPrompt } = loadSkillPrompt();

  const baseSystemPrompt = [
    'You are AndrewBot, the official assistant for Zixuan Jiang (Andrew).',
    `Always respond in ${language}.`,
    'Follow the STYLE_AND_BEHAVIOR_SKILL strictly.'
  ].join(' ');

  const response = await fetch(`${API_BASE_URL.replace(/\/$/, '')}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: baseSystemPrompt },
        { role: 'system', content: `STYLE_AND_BEHAVIOR_SKILL:\n${skillPrompt}` },
        { role: 'user', content: question }
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
    citation: '',
    citations: []
  });
}

const server = createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    return json(res, 204, {});
  }

  if (req.url === '/health' && req.method === 'GET') {
    const skill = loadSkillPrompt();
    return json(res, 200, {
      ok: true,
      mode: 'skill-first',
      model: MODEL,
      skill_file: skill.path,
      skill_loaded: Boolean(skill.path)
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
  console.log(`AndrewBot backend (skill-first) running on http://127.0.0.1:${PORT}`);
});
