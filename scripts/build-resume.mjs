#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, copyFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import vm from "node:vm";

const root = resolve(dirname(new URL(import.meta.url).pathname), "..");
const outDir = join(root, "public", "resume");
const iconDir = join(outDir, "icons");
const logoDir = join(outDir, "logos");
const codexAssets = join(process.env.HOME || "", ".codex", "assets");

const escapeHtml = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

function loadConst(relativePath, name) {
  const file = join(root, relativePath);
  const source = readFileSync(file, "utf8");
  const decl = source.match(new RegExp(`export\\s+const\\s+${name}(?:\\s*:[^=]+)?\\s*=\\s*`));
  if (!decl?.index && decl?.index !== 0) throw new Error(`Cannot find ${name} in ${relativePath}`);
  let after = decl.index + decl[0].length;
  while (/\s/.test(source[after])) after += 1;
  const opener = source[after];
  const closer = opener === "[" ? "]" : opener === "{" ? "}" : "";
  if (!closer) throw new Error(`Expected object or array literal for ${name}`);

  let depth = 0;
  let quote = "";
  let escaped = false;
  let end = -1;
  for (let i = after; i < source.length; i += 1) {
    const ch = source[i];
    if (quote) {
      if (escaped) escaped = false;
      else if (ch === "\\") escaped = true;
      else if (ch === quote) quote = "";
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      quote = ch;
      continue;
    }
    if (ch === opener) depth += 1;
    if (ch === closer) depth -= 1;
    if (depth === 0) {
      end = i + 1;
      break;
    }
  }
  if (end < 0) throw new Error(`Cannot parse literal for ${name}`);
  const expression = source.slice(after, end);
  return vm.runInNewContext(`(${expression})`, {}, { filename: relativePath });
}

function flattenPublications(nodes, series = "") {
  return nodes.flatMap((node) => {
    if (node.kind === "series") return flattenPublications(node.items, node.title);
    return [{ ...node, series }];
  });
}

function compactLink(href) {
  if (!href) return "";
  return href.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function copyAssetGroup(group, files) {
  mkdirSync(group === "icons" ? iconDir : logoDir, { recursive: true });
  for (const file of files) {
    const src = join(codexAssets, group, file);
    const dest = join(group === "icons" ? iconDir : logoDir, file);
    if (existsSync(src)) copyFileSync(src, dest);
  }
}

function renderList(items) {
  return items.map((item) => `<li>${item}</li>`).join("\n");
}

function renderSection(title, body) {
  return `<section class="section">
  <h2 class="section-title">${escapeHtml(title)}</h2>
  ${body}
</section>`;
}

function renderCompany(entry) {
  return `<div class="company">
  <div class="company-name">${escapeHtml(entry.title)}<span>${entry.detail ? ` - ${escapeHtml(entry.detail)}` : ""}</span></div>
  <div class="company-meta">${escapeHtml(entry.date)}</div>
</div>${entry.meta ? `<p class="meta-note">${escapeHtml(entry.meta)}</p>` : ""}`;
}

function publicationBullets(pub) {
  const bullets = [];
  const firstAuthor = pub.authors?.startsWith("Zixuan Jiang*") || pub.authors?.startsWith("Zixuan Jiang,");
  bullets.push(
    `<strong>Role evidence:</strong> ${firstAuthor ? "first-author or leading-author record in the public author list" : "co-author record in the public author list"}; venue/status: ${escapeHtml(pub.venue)} ${escapeHtml(pub.year)}.`,
  );
  if (pub.highlights?.length) {
    bullets.push(...pub.highlights.slice(0, 3).map((item) => `<strong>Contribution signal:</strong> ${escapeHtml(item)}`));
  }
  const resources = [...(pub.resources || []), ...(pub.media || [])]
    .slice(0, 4)
    .map((resource) => `${escapeHtml(resource.label)}: ${escapeHtml(compactLink(resource.href))}`);
  if (resources.length) bullets.push(`<strong>Public evidence:</strong> ${resources.join("; ")}.`);
  return bullets;
}

function buildLedger({ site, resume, publications }) {
  const claims = [];
  for (const pub of publications) {
    claims.push({
      id: `claim-publication-${pub.id}`,
      source_fact: `${pub.title}; ${pub.venue} ${pub.year}; authors: ${pub.authors}`,
      candidate_wording: `${pub.title} (${pub.venue} ${pub.year})`,
      sources: [
        { type: "homepage", location: "data/publications.ts", public: true },
        { type: "url", location: pub.href, public: true },
      ],
      responsibility_level: pub.authors?.startsWith("Zixuan Jiang*") ? "主导方案或交付" : "参与",
      verification_status: "已确认",
      allowed_uses: ["phd-application", "ai-research-job"],
      interview_details: pub.highlights || [],
      boundary: "Use the public author list and project resources as the evidence boundary; do not convert whole-project metrics into individual-only outcomes.",
      risk_notes: [],
      last_verified: "2026-08-26",
    });
  }
  for (const item of [...resume.honors, ...resume.competitionGroups.flatMap((group) => group.items)]) {
    claims.push({
      id: `claim-award-${claims.length + 1}`,
      source_fact: `${item.title}${item.detail ? `, ${item.detail}` : ""}, ${item.date}`,
      candidate_wording: `${item.title}${item.detail ? ` - ${item.detail}` : ""}`,
      sources: [{ type: "homepage", location: "data/resume.ts", public: true }],
      responsibility_level: "参与",
      verification_status: "已确认",
      allowed_uses: ["phd-application", "ai-research-job"],
      interview_details: [],
      boundary: "Award or competition record as listed on the homepage.",
      risk_notes: [],
      last_verified: "2026-08-26",
    });
  }
  return {
    owner: site.name,
    generated_from: ["data/site.ts", "data/resume.ts", "data/publications.ts"],
    generated_at: new Date().toISOString(),
    claims,
  };
}

function buildHtml({ site, resume, publications }) {
  const featured = publications.filter((pub) => pub.kind === "featured");
  const standard = publications.filter((pub) => pub.kind === "standard");
  const allLinks = [
    `GitHub: ${compactLink(site.links.github)}`,
    `Google Scholar: ${compactLink(site.links.scholar)}`,
    `ORCID: ${compactLink(site.links.orcid)}`,
  ];

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(site.name)} - Resume</title>
  <style>
    @page { size: A4; margin: 9mm 11mm; }
    :root { --blue: #2458b8; --text: #151515; --muted: #5f6878; --band: #f3f4f6; }
    * { box-sizing: border-box; }
    body { margin: 0; color: var(--text); background: #eef0f3; font: 10.2pt/1.34 "Times New Roman", "Microsoft YaHei", Arial, sans-serif; }
    .toolbar { position: sticky; top: 8px; z-index: 2; display: flex; gap: 8px; align-items: center; width: max-content; max-width: calc(100vw - 24px); margin: 8px auto; padding: 8px 10px; border: 1px solid #d3d7df; border-radius: 8px; background: white; box-shadow: 0 4px 14px rgba(15, 23, 42, .12); font: 13px/1 Arial, sans-serif; }
    .toolbar button, .toolbar select { height: 30px; border: 1px solid #cbd5e1; border-radius: 5px; background: #fff; color: #1f2937; font: inherit; }
    .toolbar button { padding: 0 10px; cursor: pointer; font-weight: 700; }
    .toolbar .primary { border-color: var(--blue); background: var(--blue); color: #fff; }
    .sheet { width: 210mm; min-height: 297mm; margin: 0 auto 12mm; padding: 0; background: #fff; box-shadow: 0 2px 18px rgba(31, 41, 55, .18); }
    .resume { padding: 9mm 11mm; }
    [contenteditable="true"]:focus { outline: 2px solid #b7caf3; outline-offset: 2px; }
    h1 { margin: 0 0 3px; font: 700 23pt/1.08 Arial, "Microsoft YaHei", sans-serif; }
    a { color: var(--blue); text-decoration: none; }
    .header-grid { display: grid; grid-template-columns: minmax(0, 1fr) 29mm; gap: 8mm; align-items: start; }
    .photo-slot { width: 29mm; height: 36mm; display: grid; place-items: center; border: 1px dashed #a8adb7; color: #8b919c; font: 9pt/1.2 Arial, sans-serif; text-align: center; }
    .meta-row { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 7px; margin: 2px 0; font-size: 10.8pt; }
    .meta-icon { width: 14px; height: 14px; object-fit: contain; }
    .headline { margin: 4px 0 0; color: #1d448f; font-weight: 700; }
    .section { margin-top: 7px; break-inside: avoid; }
    .section-title { margin: 0 0 4px; padding-bottom: 2px; border-bottom: 2px solid var(--blue); color: var(--blue); font: 700 15.5pt/1.05 Arial, "Microsoft YaHei", sans-serif; }
    .company { display: flex; align-items: center; gap: 8px; min-height: 27px; margin: 5px 0 3px; padding: 4px 7px; border-radius: 6px; background: var(--band); break-inside: avoid; }
    .company-logo { width: 22px; height: 22px; object-fit: contain; }
    .company-name { flex: 1; min-width: 0; font-weight: 700; }
    .company-name span { color: #303846; font-weight: 500; }
    .company-meta { color: #202020; font-size: 9.3pt; white-space: nowrap; }
    .meta-note { margin: 0 0 2px 7px; color: var(--muted); font-size: 9.2pt; }
    .project { margin: 3px 0 5px; break-inside: avoid; }
    .project-title { margin: 3px 0 2px; color: #244b9b; font-size: 11.2pt; line-height: 1.18; font-weight: 700; }
    ul { margin: 1px 0 3px 17px; padding: 0; }
    li { margin: 1px 0; break-inside: avoid; }
    .compact-list { columns: 2; column-gap: 20px; }
    .skills { display: flex; flex-wrap: wrap; gap: 4px 8px; margin-top: 3px; }
    .skill { color: #1f2937; white-space: nowrap; }
    .muted { color: var(--muted); }
    @media print {
      body { background: #fff; }
      .toolbar { display: none; }
      .sheet { width: auto; min-height: 0; margin: 0; box-shadow: none; }
      .resume { padding: 0; }
    }
  </style>
</head>
<body>
  <div class="toolbar">
    <button type="button" onclick="document.execCommand('undo')">Undo</button>
    <button type="button" onclick="document.execCommand('redo')">Redo</button>
    <button type="button" onclick="document.execCommand('bold')">Bold</button>
    <select onchange="document.execCommand('fontSize', false, this.value)">
      <option value="2">Small</option>
      <option value="3" selected>Normal</option>
      <option value="4">Large</option>
    </select>
    <button class="primary" type="button" onclick="window.print()">Print / Export PDF</button>
  </div>
  <main class="sheet">
    <article class="resume" contenteditable="true">
      <header class="header-grid">
        <div>
          <h1>${escapeHtml(site.name)} <span class="muted">(${escapeHtml(site.preferredName)})</span></h1>
          <div class="meta-row"><img class="meta-icon" src="icons/envelope.svg" alt="">${escapeHtml(site.email)}<span>|</span>${escapeHtml(site.location)}<span>|</span>${escapeHtml(site.institution)}</div>
          <div class="meta-row"><img class="meta-icon" src="logos/github.svg" alt="">${allLinks.map(escapeHtml).join("<span>|</span>")}</div>
          <p class="headline">${escapeHtml(site.description)}; targeting PhD applications and AI research roles.</p>
        </div>
        <div class="photo-slot">Photo<br>optional</div>
      </header>

      ${renderSection("Education", resume.education.map(renderCompany).join("\n"))}

      ${renderSection("Research Experience", resume.internships.map((item) => renderCompany(item)).join("\n"))}

      ${renderSection("Selected Publications & Projects", featured.map((pub) => `<article class="project">
        <div class="project-title">${escapeHtml(pub.title)} <span class="muted">| ${escapeHtml(pub.venue)} ${escapeHtml(pub.year)} | ${escapeHtml(pub.series)}</span></div>
        <ul>${renderList(publicationBullets(pub))}</ul>
      </article>`).join("\n"))}

      ${renderSection("Additional Publications", `<ul class="compact-list">${renderList(standard.map((pub) => `${escapeHtml(pub.title)} <span class="muted">(${escapeHtml(pub.venue)} ${escapeHtml(pub.year)})</span>`))}</ul>`)}

      ${renderSection("Honors & Competitions", `<ul class="compact-list">${renderList([...resume.honors, ...resume.competitionGroups.flatMap((group) => group.items)].map((item) => `${escapeHtml(item.title)}${item.detail ? ` - ${escapeHtml(item.detail)}` : ""} <span class="muted">(${escapeHtml(item.date)})</span>`))}</ul>`)}

      ${renderSection("Skills", `<div class="skills">${resume.skills.map((skill) => `<span class="skill">${escapeHtml(skill)}</span>`).join("<span class=\"muted\">/</span>")}</div>`)}
    </article>
  </main>
  <script>
    const key = "zixuan-asu-resume-html";
    const article = document.querySelector(".resume");
    const saved = localStorage.getItem(key);
    if (saved) article.innerHTML = saved;
    article.addEventListener("input", () => localStorage.setItem(key, article.innerHTML));
  </script>
</body>
</html>`;
}

mkdirSync(outDir, { recursive: true });
copyAssetGroup("icons", ["envelope.svg", "phone.svg", "user.svg", "graduation-cap.svg", "star.svg", "wechat.svg"]);
copyAssetGroup("logos", ["github.svg", "openai.svg", "claude.svg"]);

const site = loadConst("data/site.ts", "site");
const resume = {
  education: loadConst("data/resume.ts", "education"),
  internships: loadConst("data/resume.ts", "internships"),
  honors: loadConst("data/resume.ts", "honors"),
  competitionGroups: loadConst("data/resume.ts", "competitionGroups"),
  resumeTargets: loadConst("data/resume.ts", "resumeTargets"),
  skills: loadConst("data/resume.ts", "skills"),
};
const publications = flattenPublications(loadConst("data/publications.ts", "publications"));
const payload = { site, resume, publications, generatedAt: new Date().toISOString() };
const ledger = buildLedger({ site, resume, publications });

writeFileSync(join(outDir, "resume-data.json"), `${JSON.stringify(payload, null, 2)}\n`);
writeFileSync(join(outDir, "career-claim-ledger.json"), `${JSON.stringify(ledger, null, 2)}\n`);
writeFileSync(join(outDir, "asu-resume.html"), buildHtml({ site, resume, publications }));

console.log(`Generated ${join(outDir, "asu-resume.html")}`);
console.log(`Generated ${join(outDir, "resume-data.json")}`);
console.log(`Generated ${join(outDir, "career-claim-ledger.json")}`);
