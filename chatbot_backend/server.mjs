import { createServer } from 'node:http';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';

const PORT = Number(process.env.PORT || 8787);
const API_KEY = process.env.DEEPSEEK_API_KEY || '';
const API_BASE_URL = process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com';
const MODEL = process.env.DEEPSEEK_MODEL || 'deepseek-v4-flash';
const KNOWLEDGE_DIR = process.env.KNOWLEDGE_DIR || resolve(process.cwd(), 'knowledge');

function loadKnowledgeChunks() {
  function collectMarkdownFiles(dir, prefix = '') {
    const entries = readdirSync(dir, { withFileTypes: true });
    const acc = [];
    for (const e of entries) {
      const rel = prefix ? `${prefix}/${e.name}` : e.name;
      const full = join(dir, e.name);
      if (e.isDirectory()) {
        acc.push(...collectMarkdownFiles(full, rel));
      } else if (e.isFile() && e.name.endsWith('.md')) {
        acc.push({ rel, full });
      }
    }
    return acc;
  }
  const files = collectMarkdownFiles(KNOWLEDGE_DIR).sort((a, b) => a.rel.localeCompare(b.rel));

  const chunks = [];
  for (const file of files) {
    const text = readFileSync(file.full, 'utf-8');
    const sections = text
      .split(/\n## /g)
      .map((section, idx) => (idx === 0 ? section : '## ' + section))
      .map((chunk) => chunk.trim())
      .filter(Boolean);

    for (const section of sections) {
      chunks.push({ file: file.rel, text: section });
    }
  }
  return chunks;
}

const knowledgeChunks = loadKnowledgeChunks();
const knowledgeFiles = Array.from(new Set(knowledgeChunks.map((x) => x.file)));

const ZH_EN_TERM_MAP = {
  '科研': 'research',
  '研究': 'research',
  '论文': 'publication',
  '发表': 'publication',
  '奖项': 'award',
  '获奖': 'award',
  '简历': 'cv',
  '项目': 'project',
  '实习': 'internship',
  '教育': 'education',
  '学校': 'university',
  '语音': 'speech',
  '遥感': 'remote sensing',
  '多模态': 'multimodal'
};

function normalizeTerms(rawTerms) {
  const terms = new Set(rawTerms);
  for (const term of rawTerms) {
    const mapped = ZH_EN_TERM_MAP[term];
    if (mapped) {
      mapped.split(/\s+/).forEach((x) => terms.add(x));
    }
  }
  return Array.from(terms);
}

function isPaperDetailQuestion(question) {
  const q = question.toLowerCase();
  const detailTerms = [
    'method', 'experiment', 'ablation', 'dataset', 'benchmark', 'results',
    'contribution', 'baseline', 'architecture', 'training', 'evaluation',
    '论文', '方法', '实验', '消融', '数据集', '结果', '贡献', '对比', '架构', '训练', '评估'
  ];
  return detailTerms.some((t) => q.includes(t));
}

function selectContext(question, topK = 5) {
  const baseTerms = question
    .toLowerCase()
    .split(/[^a-z0-9\u4e00-\u9fff]+/)
    .filter((w) => w.length > 1);
  const terms = normalizeTerms(baseTerms);

  const paperDetailMode = isPaperDetailQuestion(question);

  const scored = knowledgeChunks.map((item, idx) => {
    const lower = item.text.toLowerCase();
    let score = 0;
    for (const t of terms) {
      if (lower.includes(t)) score += 1;
    }
    // For paper-detail questions, prioritize extracted PDF knowledge.
    if (paperDetailMode && item.file === 'bot_memory_extracted.md') {
      score += 3;
    }
    // Keep curated QA and profile documents strong for general questions.
    if (!paperDetailMode && (item.file === 'qa_bilingual.md' || item.file === 'andrewbot_knowledge.md')) {
      score += 2;
    }
    return { idx, ...item, score };
  });

  const ranked = scored
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  const allZero = ranked.every((x) => x.score === 0);
  if (allZero) {
    const fallback = scored
      .filter((x) => x.file === 'andrewbot_knowledge.md')
      .slice(0, topK);
    if (fallback.length > 0) {
      return fallback.map((x) => ({ source: x.file, text: x.text }));
    }
  }

  return ranked.map((x) => ({ source: x.file, text: x.text }));
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
  const context = contextList
    .map((x) => `[Source: ${x.source}]\n${x.text}`)
    .join('\n\n');

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
  const citations = Array.from(new Set(contextList.map((x) => x.source))).slice(0, 5);
  const firstSource = citations[0] || 'knowledge';

  return json(res, 200, {
    answer,
    citation: firstSource,
    citations
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
      chunks: knowledgeChunks.length,
      files: knowledgeFiles
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
