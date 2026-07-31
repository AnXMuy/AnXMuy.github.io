import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowUpRight,
  AudioLines,
  BookOpen,
  Boxes,
  ChartNoAxesCombined,
  Database,
  Github,
  MonitorDown,
  Play,
  ScrollText,
  Sparkles,
  Timer,
} from "lucide-react";
import { CitationCopy } from "@/components/citation-copy";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "AgenticASR",
  description:
    "AgenticASR refines English and Chinese speech recognition into clean, intent-preserving text with an ASR-agnostic Refiner.",
  alternates: { canonical: "https://anxmuy.github.io/blog/agenticasr/" },
  openGraph: {
    title: "AgenticASR: Refining Speech Recognition in Real-World Scenarios",
    description:
      "An ASR–Refiner system for bilingual, online speech-to-clean-text recognition.",
    url: "https://anxmuy.github.io/blog/agenticasr/",
    images: [{ url: "/agenticasr/teaser.png", width: 1396, height: 420 }],
    type: "article",
  },
};

const citation = `@misc{jiang2026agenticasrrefiningspeechrecognition,
      title={AgenticASR: Refining Speech Recognition in Real-World Scenarios via an Agentic Approach},
      author={Zixuan Jiang and Binghao Qiang and Jiaying Chi and Yanqiao Zhu and Kai Yu and Xie Chen},
      year={2026},
      eprint={2607.28175},
      archivePrefix={arXiv},
      primaryClass={cs.AI},
      url={https://arxiv.org/abs/2607.28175},
}`;

const abstract =
  "Automatic speech recognition (ASR) has achieved substantial gains in transcription accuracy, yet verbatim transcription does not necessarily produce readily usable text. It retains fillers, repetitions, false starts, and self-corrections that increase reading effort, obscure the speaker’s final intent, and propagate unresolved or abandoned content to downstream tasks. Existing spoken-to-written methods process completed audio or transcripts but cannot revise emitted text when later speech changes how preceding content should be interpreted. We therefore formulate Agentic Speech Recognition (AgenticSR), an audio-to-clean-text task that removes disfluencies, resolves self-corrections, and normalizes written form while preserving the speaker’s final intent. AgenticASR implements this task through an ASR–Refiner architecture that repeatedly transforms a bounded active context and replaces its corresponding output span as audio arrives. This enables continual emission and revision over streams of arbitrary duration. We also introduce AASR-Bench, a bilingual benchmark with fine-grained atomic rubrics. Across multiple ASR front ends, AgenticASR attains the highest AASR-Bench scores among evaluated systems. A human–AI agreement study shows that rubric-based judgments align with independent expert assessments. Ablations characterize Refiner capacity, context length, and the quality–latency trade-off between online and offline inference. Together, these results establish AgenticASR as a practical framework for intent-preserving clean transcription during ongoing speech.";

const mainRows = [
  ["Qwen3-ASR-0.6B", "Qwen3.5-Flash", "87.50", "28.97", "73.13", "49.13", "26.82/17.01/21.91", "60.08", "66.47"],
  ["FormalASR-0.6B", "–", "86.63", "14.35", "36.51", "13.29", "38.67/28.34/34.38", "3.42", "48.76"],
  ["Qwen3-ASR-0.6B", "AgenticASR", "87.30", "54.94", "78.80", "69.16", "14.64/7.79/10.23", "6.60", "76.15"],
  ["Qwen3-ASR-1.7B", "Qwen3.5-Flash", "90.21", "35.48", "75.82", "52.10", "24.60/15.72/20.29", "60.89", "69.93"],
  ["FormalASR-1.7B", "–", "90.11", "19.69", "40.59", "15.70", "34.07/24.47/30.48", "3.46", "52.50"],
  ["Qwen3-ASR-1.7B", "AgenticASR", "90.24", "65.19", "78.89", "72.83", "12.70/6.86/9.01", "9.59", "79.95"],
  ["Whisper Base", "Gemini-2.5-Flash", "47.04", "6.09", "62.63", "16.67", "53.14/39.83/46.41", "12.00", "37.09"],
  ["Whisper Base", "AgenticASR", "38.69", "6.95", "71.96", "32.47", "55.62/41.33/46.70", "5.86", "38.82"],
  ["Whisper Small", "Gemini-2.5-Flash", "58.79", "29.04", "65.08", "27.94", "56.98/43.74/45.78", "11.99", "48.78"],
  ["Whisper Small", "AgenticASR", "52.58", "29.57", "72.79", "47.40", "58.09/44.09/44.28", "6.89", "51.72"],
  ["Whisper Large", "Gemini-2.5-Flash", "80.23", "51.58", "63.10", "36.13", "31.50/21.45/25.33", "8.04", "62.90"],
  ["Whisper Large", "AgenticASR", "76.16", "55.87", "77.75", "63.01", "27.51/18.19/19.63", "4.42", "70.29"],
];

const rubricRows = [
  ["Content", "3,448", "51.95", "917"],
  ["Format", "1,498", "22.57", "741"],
  ["Filter", "882", "13.29", "882"],
  ["Rephrase", "809", "12.19", "623"],
  ["Total", "6,637", "100.00", "–"],
];

const refinerRows = [
  ["Qwen2.5-0.5B-Instruct", "78.76", "88.00", "63.40", "78.36", "69.85", "9.21"],
  ["MiniCPM-5-1B", "79.95", "90.24", "65.19", "78.89", "72.83", "9.59"],
  ["Qwen2.5-4B-Instruct", "83.42", "91.00", "74.43", "83.31", "75.68", "10.77"],
];

const windowRows = [
  ["Offline", "72.83", "9.59", "75.20"],
  ["Window = 1", "36.17", "11.28", "19.43"],
  ["Window = 2", "65.08", "11.70", "55.06"],
  ["Window = 3", "70.47", "12.15", "74.00"],
];

export default function AgenticASRPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    name: "AgenticASR: Refining Speech Recognition in Real-World Scenarios via an Agentic Approach",
    url: "https://anxmuy.github.io/blog/agenticasr/",
    sameAs: "https://arxiv.org/abs/2607.28175",
    author: [
      "Zixuan Jiang",
      "Binghao Qiang",
      "Jiaying Chi",
      "Yanqiao Zhu",
      "Kai Yu",
      "Xie Chen",
    ].map((name) => ({ "@type": "Person", name })),
    datePublished: "2026-07-30",
    abstract,
    image: "https://anxmuy.github.io/agenticasr/teaser.png",
  };

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className={styles.hero}>
        <div className={styles.inner}>
          <div className={styles.heroMeta}>
            <span>ARXIV 2607.28175 · 2026</span>
            <span className={styles.liveMark}><i /> AGENTIC SPEECH RECOGNITION</span>
          </div>
          <h1>
            AgenticASR
            <span>Refining Speech Recognition in Real-World Scenarios via an Agentic Approach</span>
          </h1>
          <p className={styles.heroLead}>
            Turn spoken-form hypotheses into clean, intent-preserving text — then revise what was already emitted when later speech changes the meaning.
          </p>
          <p className={styles.authors}>
            <strong>Zixuan Jiang*</strong>, Binghao Qiang*, Jiaying Chi*, Yanqiao Zhu, Kai Yu, Xie Chen†
            <br />
            <span>* Equal contribution · † Corresponding author</span>
          </p>
          <div className={styles.actions}>
            <a className={`${styles.action} ${styles.actionPrimary}`} href="https://arxiv.org/html/2607.28175v1" target="_blank" rel="noreferrer">
              <BookOpen aria-hidden="true" /> Paper <ArrowUpRight aria-hidden="true" />
            </a>
            <a className={styles.action} href="https://github.com/AnXMuy/AgenticASR" target="_blank" rel="noreferrer">
              <Github aria-hidden="true" /> Code <ArrowUpRight aria-hidden="true" />
            </a>
            <a className={styles.action} href="https://huggingface.co/datasets/Andrew0425/AASR-Bench" target="_blank" rel="noreferrer">
              <Database aria-hidden="true" /> AASR-Bench <ArrowUpRight aria-hidden="true" />
            </a>
            <a className={styles.action} href="https://vibexasr.speech.wiki/" target="_blank" rel="noreferrer">
              <MonitorDown aria-hidden="true" /> App <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
          <div className={styles.featureRail} aria-label="AgenticASR capabilities">
            <div><AudioLines aria-hidden="true" /><span><b>Bilingual</b><small>English + Chinese</small></span></div>
            <div><Boxes aria-hidden="true" /><span><b>ASR-agnostic</b><small>Any text-producing frontend</small></span></div>
            <div><Sparkles aria-hidden="true" /><span><b>Revisable</b><small>Online and offline refinement</small></span></div>
          </div>
        </div>
      </section>

      <section className={`${styles.band} ${styles.overviewBand}`} id="overview">
        <div className={styles.inner}>
          <div className={styles.sectionHeading}>
            <span className={styles.sectionNumber}>01 / TASK</span>
            <div><h2>From verbatim speech to usable text.</h2><p>Speech is full of abandoned starts, fillers, repetitions, and corrections. AgenticSR keeps the final intent while making the output ready for reading and downstream use.</p></div>
          </div>
          <figure className={styles.figure}>
            <Image src="/agenticasr/teaser.png" alt="AgenticASR transforms speech into clean written text" width={1396} height={420} priority />
            <figcaption>AgenticASR targets clean, final-intent-preserving transcription instead of verbatim speech recognition.</figcaption>
          </figure>
          <div className={styles.explainGrid}>
            <article><span>01</span><h3>Emit</h3><p>The ASR frontend produces an intermediate speech hypothesis as the user speaks.</p></article>
            <article><span>02</span><h3>Refine</h3><p>A compact language-model Refiner converts the active context from oral to written form.</p></article>
            <article><span>03</span><h3>Revise</h3><p>New evidence replaces only the corresponding local output span, so an earlier guess can be corrected in place.</p></article>
          </div>
        </div>
      </section>

      <section className={`${styles.band} ${styles.demoBand}`} id="demo">
        <div className={styles.inner}>
          <div className={styles.sectionHeading}>
            <span className={styles.sectionNumber}>02 / DEMO</span>
            <div><h2>One system, two languages.</h2><p>Both demonstrations show the same core behavior: spoken-form input becomes readable text while the transcript remains open to evidence-supported revision.</p></div>
          </div>
          <div className={styles.videoGrid}>
            <article className={styles.videoCard}>
              <div className={styles.videoLabel}><span>EN / English</span><span><Play aria-hidden="true" /> 00:34</span></div>
              <video controls preload="metadata" poster="/agenticasr/en-poster.jpg" playsInline>
                <source src="/agenticasr/en-demo.mp4" type="video/mp4" />
              </video>
              <p>English streaming example: disfluencies and incomplete phrasing are rewritten into clean text.</p>
            </article>
            <article className={styles.videoCard}>
              <div className={styles.videoLabel}><span>ZH / 中文</span><span><Play aria-hidden="true" /> 00:50</span></div>
              <video controls preload="metadata" poster="/agenticasr/zh-poster.jpg" playsInline>
                <source src="/agenticasr/zh-demo.mp4" type="video/mp4" />
              </video>
              <p>中文演示：系统在保留最终意图的同时，持续清理口语表达并更新局部结果。</p>
            </article>
          </div>
        </div>
      </section>

      <section className={`${styles.band} ${styles.methodBand}`} id="method">
        <div className={styles.inner}>
          <div className={styles.sectionHeading}>
            <span className={styles.sectionNumber}>03 / METHOD</span>
            <div><h2>An ASR frontend, a bounded active context, and one clean replacement.</h2><p>The Refiner is deliberately separated from acoustic recognition, which lets the same text-to-text correction model work across different ASR backbones.</p></div>
          </div>
          <figure className={styles.figure}>
            <Image src="/agenticasr/method.png" alt="AgenticASR data pipeline and online inference method" width={3456} height={1296} />
            <figcaption>Method overview: the five-stage data pipeline creates Oral/Clean training pairs; online inference uses VAD and a sliding window with default K=3.</figcaption>
          </figure>
          <div className={styles.methodGrid}>
            <article><span className={styles.methodIcon}><Database aria-hidden="true" /></span><h3>Train the transformation</h3><p>Seed, Oral, and Clean generation are followed by ASR simulation, semantic quality control, and global deduplication.</p></article>
            <article><span className={styles.methodIcon}><Timer aria-hidden="true" /></span><h3>Bound the latency</h3><p>Online inference refines a local K-chunk source window and replaces its aligned output span rather than waiting for an utterance to finish.</p></article>
            <article><span className={styles.methodIcon}><ChartNoAxesCombined aria-hidden="true" /></span><h3>Measure what WER misses</h3><p>AASR-Bench separates Content, Format, Filter, and Rephrase so clean transcription quality is not reduced to token error alone.</p></article>
          </div>
        </div>
      </section>

      <section className={`${styles.band} ${styles.resultsBand}`} id="results">
        <div className={styles.inner}>
          <div className={styles.sectionHeading}>
            <span className={styles.sectionNumber}>04 / RESULTS</span>
            <div><h2>AgenticASR leads the clean-transcription score.</h2><p>On AASR-Bench, AgenticASR wins the Overall score within the Qwen3-ASR families and improves every Whisper configuration over its API baseline.</p></div>
          </div>
          <div className={styles.metricGrid}>
            <div><strong>79.95</strong><span>Overall · Qwen3-ASR-1.7B</span></div>
            <div><strong>+27.45</strong><span>vs. FormalASR-1.7B</span></div>
            <div><strong>6,637</strong><span>atomic bilingual rubrics</span></div>
            <div><strong>0.82</strong><span>human–AI Spearman agreement</span></div>
          </div>
          <div className={styles.resultSplit}>
            <figure className={styles.figure}><Image src="/agenticasr/results-scenes.png" alt="Scene-level Overall scores for Qwen3-ASR systems" width={797} height={992} /><figcaption>Scene-level Overall scores across ten usage scenes and a pass-through control. AgenticASR with the 1.7B frontend leads both baselines in every scene.</figcaption></figure>
            <div className={styles.resultNotes}>
              <h3>What the table shows</h3>
              <p>With Qwen3-ASR-1.7B, AgenticASR reaches <b>79.95 Overall</b> and leads all four rubric dimensions. Its advantage over the API transformation baseline ranges from 1.73 to 10.02 points across matched ASR backbones, with substantially lower latency.</p>
              <p>With Whisper, the gain over the API baseline grows from 1.73 points at Base to 7.39 points at Large. The strongest improvements come from filtering and final-intent rephrasing.</p>
              <p>Traditional token metrics remain useful diagnostics, but AASR-Bench exposes formatting, filtering, and correction-resolution failures that WER, CER, and MER cannot capture.</p>
            </div>
          </div>
          <div className={styles.tableShell}>
            <table>
              <caption>Table 3 · Main results on AASR-Bench. Higher is better except WER/CER/MER and latency.</caption>
              <thead><tr><th>ASR model</th><th>LM</th><th>Content</th><th>Format</th><th>Filter</th><th>Rephrase</th><th>WER/CER/MER ↓</th><th>Latency ↓</th><th>Overall</th></tr></thead>
              <tbody>{mainRows.map((row, index) => <tr key={`${row[0]}-${row[1]}`} className={row[1] === "AgenticASR" ? styles.highlightRow : index === 1 || index === 4 ? styles.controlRow : undefined}>{row.map((cell, cellIndex) => <td key={`${cell}-${cellIndex}`}>{cell}</td>)}</tr>)}</tbody>
            </table>
          </div>
          <p className={styles.tableNote}>Best values within each ASR family are shown in the paper in bold. The LM column identifies the downstream transformation system; FormalASR performs direct speech-to-clean-text recognition.</p>
        </div>
      </section>

      <section className={`${styles.band} ${styles.ablationBand}`} id="ablations">
        <div className={styles.inner}>
          <div className={styles.sectionHeading}>
            <span className={styles.sectionNumber}>05 / ABLATIONS</span>
            <div><h2>Quality, evidence, and latency move together.</h2><p>The ablations make the design trade-offs explicit: larger Refiners improve contextual rewriting, while a three-chunk online window recovers most of the useful right context.</p></div>
          </div>
          <div className={styles.ablationFeature}>
            <figure className={styles.figure}><Image src="/agenticasr/window-ablation.png" alt="Effect of active window size on online revision" width={996} height={488} /><figcaption>Window size K=3 keeps enough local context to revise a destination across VAD boundaries.</figcaption></figure>
            <div className={styles.resultNotes}><h3>Online window</h3><p>Moving from K=1 to K=3 raises Rephrase from <b>36.17</b> to <b>70.47</b> and Explanation from <b>19.43</b> to <b>74.00</b>, while latency grows by only 0.87 s. K=3 closes the gap to offline inference to 2.36 Rephrase points and 1.20 Explanation points.</p><p>This is the mechanism that lets AgenticASR correct a previously emitted destination when a later chunk contains the self-repair.</p></div>
          </div>
          <div className={styles.ablationGrid}>
            <article><h3>Human agreement</h3><p>Double-blind experts and the Gemma-4-31B-IT judge agree strongly across 100 sampled utterances.</p><div className={styles.miniStats}><b>0.8222</b><span>Spearman · Qwen3-ASR-0.6B</span><b>0.8313</b><span>Quadratic κ · Qwen3-ASR-0.6B</span></div></article>
            <article><h3>Refiner capacity</h3><p>With Qwen3-ASR-1.7B fixed, scaling the Refiner from 0.5B to 4B raises Overall by 4.66 points; the largest gains are in Format and Rephrase.</p><div className={styles.miniStats}><b>78.76 → 83.42</b><span>Overall · 0.5B → 4B</span><b>9.21 → 10.77s</b><span>Latency · 0.5B → 4B</span></div></article>
          </div>
          <div className={styles.tablePair}>
            <div className={styles.tableShell}><table><caption>Table 4 · Human agreement</caption><thead><tr><th>Measure</th><th>0.6B</th><th>1.7B</th></tr></thead><tbody><tr><td>Spearman ρ</td><td>0.8222</td><td>0.8064</td></tr><tr><td>Quadratic-weighted κ</td><td>0.8313</td><td>0.7918</td></tr></tbody></table></div>
            <div className={styles.tableShell}><table><caption>Table 5 · Refiner capacity</caption><thead><tr><th>Refiner</th><th>Overall</th><th>Cont.</th><th>Fmt.</th><th>Filt.</th><th>Reph.</th><th>Lat. (s)</th></tr></thead><tbody>{refinerRows.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td key={`${row[0]}-${index}`}>{cell}</td>)}</tr>)}</tbody></table></div>
          </div>
          <div className={styles.tableShell}><table><caption>Table 6 · Offline and online AgenticASR with Qwen3-ASR-1.7B</caption><thead><tr><th>Setting</th><th>Rephrase ↑</th><th>Latency (s) ↓</th><th>Explanation ↑</th></tr></thead><tbody>{windowRows.map((row) => <tr key={row[0]} className={row[0] === "Window = 3" ? styles.highlightRow : undefined}>{row.map((cell, index) => <td key={`${row[0]}-${index}`}>{cell}</td>)}</tr>)}</tbody></table></div>
        </div>
      </section>

      <section className={`${styles.band} ${styles.benchmarkBand}`} id="benchmark">
        <div className={styles.inner}>
          <div className={styles.sectionHeading}>
            <span className={styles.sectionNumber}>06 / BENCHMARK</span>
            <div><h2>A rubric for what “clean” actually means.</h2><p>AASR-Bench is bilingual and atomic: every sample is scored on the specific transformation requirements it contains, rather than a single undifferentiated text metric.</p></div>
          </div>
          <div className={styles.benchmarkGrid}>
            <div className={styles.benchmarkCopy}><div className={styles.bigNumber}>917 <small>samples</small></div><div className={styles.bigNumber}>7.24 <small>rubrics / sample on average</small></div><p>Each sample has at least one Content question. Format, Filter, and Rephrase rubrics are added when those phenomena are present. The benchmark covers ten usage scenes plus a pass-through control.</p><a className={styles.textLink} href="https://huggingface.co/datasets/Andrew0425/AASR-Bench" target="_blank" rel="noreferrer">Explore AASR-Bench <ArrowUpRight aria-hidden="true" /></a></div>
            <div className={styles.tableShell}><table><caption>Table 1 · Distribution of atomic rubrics</caption><thead><tr><th>Category</th><th>Questions</th><th>Share (%)</th><th>Coverage</th></tr></thead><tbody>{rubricRows.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td key={`${row[0]}-${index}`}>{cell}</td>)}</tr>)}</tbody></table></div>
          </div>
        </div>
      </section>

      <section className={`${styles.band} ${styles.abstractBand}`} id="abstract">
        <div className={styles.innerNarrow}>
          <div className={styles.sectionHeading}><span className={styles.sectionNumber}>07 / ABSTRACT</span><div><h2>Abstract</h2><p>From the paper, arXiv:2607.28175v1.</p></div></div>
          <p className={styles.abstractText}>{abstract}</p>
        </div>
      </section>

      <section className={`${styles.band} ${styles.citationBand}`} id="citation">
        <div className={styles.innerNarrow}>
          <div className={styles.sectionHeading}><span className={styles.sectionNumber}>08 / CITE</span><div><h2>Use AgenticASR in your work.</h2><p>If this project is useful, please cite the paper.</p></div></div>
          <div className={styles.citationBox}><pre>{citation}</pre><CitationCopy citation={citation} /></div>
          <div className={styles.footerLinks}><a href="https://arxiv.org/abs/2607.28175" target="_blank" rel="noreferrer"><ScrollText aria-hidden="true" /> arXiv abstract <ArrowUpRight aria-hidden="true" /></a><a href="https://github.com/AnXMuy/AgenticASR" target="_blank" rel="noreferrer"><Github aria-hidden="true" /> Repository <ArrowUpRight aria-hidden="true" /></a></div>
          <p className={styles.templateNote}>Page structure inspired by the Academic Project Page Template and Nerfies; visual language adapted for AgenticASR.</p>
        </div>
      </section>
    </main>
  );
}
