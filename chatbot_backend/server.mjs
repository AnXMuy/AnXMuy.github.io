import { createServer } from 'node:http';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';

const PORT = Number(process.env.PORT || 8787);
const API_KEY = process.env.DEEPSEEK_API_KEY || '';
const API_BASE_URL = process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com';
const MODEL = process.env.DEEPSEEK_MODEL || 'deepseek-v4-flash';
const KNOWLEDGE_DIR = process.env.KNOWLEDGE_DIR || resolve(process.cwd(), 'knowledge');
const PAPER_DIR_PREFIX = 'papers/';

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

function stripMdExt(name) {
  return name.replace(/\.md$/i, '');
}

function extractPaperTitleFromFile(file) {
  if (!file.startsWith(PAPER_DIR_PREFIX)) return '';
  return stripMdExt(file.slice(PAPER_DIR_PREFIX.length));
}

function tokenize(text) {
  const lower = String(text || '').toLowerCase();
  const latin = lower.split(/[^a-z0-9]+/).filter((w) => w.length > 1);
  const cjk = (lower.match(/[\u4e00-\u9fff]{2,}/g) || []).flatMap((x) => {
    const grams = [];
    for (let i = 0; i < x.length - 1; i += 1) grams.push(x.slice(i, i + 2));
    return grams;
  });
  return [...latin, ...cjk];
}

function buildTf(tokens) {
  const tf = new Map();
  for (const t of tokens) {
    tf.set(t, (tf.get(t) || 0) + 1);
  }
  return tf;
}

const chunkIndex = knowledgeChunks.map((chunk, idx) => {
  const isPaper = chunk.file.startsWith(PAPER_DIR_PREFIX);
  const paperTitle = extractPaperTitleFromFile(chunk.file);
  const titleTokens = tokenize(paperTitle.replace(/[_:.-]+/g, ' '));
  const tokens = tokenize(chunk.text);
  return {
    idx,
    ...chunk,
    isPaper,
    paperTitle,
    titleTokens,
    tokens,
    tf: buildTf(tokens)
  };
});

const filePaperTitleTokens = new Map();
for (const file of knowledgeFiles) {
  const title = extractPaperTitleFromFile(file);
  const tokens = tokenize(title.replace(/[_:.-]+/g, ' '));
  filePaperTitleTokens.set(file, tokens);
}

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
  const baseTerms = tokenize(question);
  const terms = normalizeTerms(baseTerms);
  const termSet = new Set(terms);

  const paperDetailMode = isPaperDetailQuestion(question);
  const matchedPaperFiles = knowledgeFiles.filter((file) => {
    if (!file.startsWith(PAPER_DIR_PREFIX)) return false;
    const titleTokens = filePaperTitleTokens.get(file) || [];
    if (titleTokens.length === 0) return false;
    const overlap = titleTokens.filter((t) => termSet.has(t)).length;
    return overlap >= Math.max(2, Math.floor(titleTokens.length * 0.2));
  });

  const scored = chunkIndex.map((item, idx) => {
    let score = 0;
    for (const t of terms) {
      const tf = item.tf.get(t) || 0;
      if (tf > 0) score += 1 + Math.min(2, tf - 1) * 0.5;
    }
    // Title hit is strong evidence for paper-specific intent.
    for (const t of item.titleTokens) {
      if (termSet.has(t)) score += 0.8;
    }
    if (paperDetailMode && item.isPaper) {
      score += 2.5;
    }
    if (paperDetailMode && matchedPaperFiles.includes(item.file)) {
      score += 4;
    }
    // Keep curated QA and profile docs strong for non-paper questions.
    if (!paperDetailMode && (item.file === 'qa_bilingual.md' || item.file === 'andrewbot_knowledge.md')) {
      score += 2;
    }
    if (!paperDetailMode && item.isPaper) {
      score -= 0.5;
    }
    return { idx, ...item, score };
  });

  let ranked = scored
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  // If paper-detail question but top-k has no paper chunk, force one paper chunk in.
  if (paperDetailMode && !ranked.some((x) => x.isPaper)) {
    const bestPaper = scored
      .filter((x) => x.isPaper)
      .sort((a, b) => b.score - a.score)[0];
    if (bestPaper) {
      ranked = [bestPaper, ...ranked.slice(0, Math.max(0, topK - 1))];
    }
  }

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
