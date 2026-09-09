import { T } from "@/components/language-provider";
import type { Metadata } from "next";
import { ZoomableImage as Image } from "@/components/zoomable-image";
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
            <span><T>{"ARXIV 2607.28175 · 2026"}</T></span>
            <span className={styles.liveMark}><i /> <T>{"AGENTIC SPEECH RECOGNITION"}</T></span>
          </div>
          <h1>
            AgenticASR
            <span>Refining Speech Recognition in Real-World Scenarios via an Agentic Approach</span>
          </h1>
          <p className={styles.heroLead}>
            <T>{"Turn spoken-form hypotheses into clean, intent-preserving text — then revise what was already emitted when later speech changes the meaning."}</T>
          </p>
          <p className={styles.authors}>
            <strong>Zixuan Jiang*</strong>, Binghao Qiang*, Jiaying Chi*, Yanqiao Zhu, Kai Yu, Xie Chen†
            <br />
            <span><T>{"* Equal contribution · † Corresponding author"}</T></span>
          </p>
          <div className={styles.actions}>
            <a className={`${styles.action} ${styles.actionPrimary}`} href="https://arxiv.org/html/2607.28175v1" target="_blank" rel="noreferrer">
              <BookOpen aria-hidden="true" /> <T>{"Paper"}</T> <ArrowUpRight aria-hidden="true" />
            </a>
            <a className={styles.action} href="https://github.com/AnXMuy/AgenticASR" target="_blank" rel="noreferrer">
              <Github aria-hidden="true" /> <T>{"Code"}</T> <ArrowUpRight aria-hidden="true" />
            </a>
            <a className={styles.action} href="https://huggingface.co/datasets/Andrew0425/AASR-Bench" target="_blank" rel="noreferrer">
              <Database aria-hidden="true" /> <T>{"AASR-Bench"}</T> <ArrowUpRight aria-hidden="true" />
            </a>
            <a className={styles.action} href="https://vibexasr.speech.wiki/" target="_blank" rel="noreferrer">
              <MonitorDown aria-hidden="true" /> <T>{"App"}</T> <ArrowUpRight aria-hidden="true" />
            </a>
            <div className={styles.actionAudio}>
              <span><AudioLines aria-hidden="true" /> <T>{"Audio"}</T></span>
              <audio controls preload="metadata">
                <source src="/agenticasr/paper-deep-dive.mp3" type="audio/mpeg" />
                <T>{"Your browser does not support the audio element."}</T>
              </audio>
            </div>
          </div>
          <div className={styles.featureRail} aria-label="AgenticASR capabilities">
            <div><AudioLines aria-hidden="true" /><span><b><T>{"Bilingual"}</T></b><small><T>{"English + Chinese"}</T></small></span></div>
            <div><Boxes aria-hidden="true" /><span><b><T>{"ASR-agnostic"}</T></b><small><T>{"Any text-producing frontend"}</T></small></span></div>
            <div><Sparkles aria-hidden="true" /><span><b><T>{"Revisable"}</T></b><small><T>{"Online and offline refinement"}</T></small></span></div>
          </div>
        </div>
      </section>

      <section className={`${styles.band} ${styles.abstractBand}`} id="abstract">
        <div className={styles.innerNarrow}>
          <div className={styles.sectionHeading}><span className={styles.sectionNumber}><T>{"01 / ABSTRACT"}</T></span><div><h2><T>{"Abstract"}</T></h2></div></div>
          <p className={styles.abstractText}><T zh="自动语音识别（ASR）的转写准确率已显著提高，但逐字转写不一定能生成可直接使用的文本。填充词、重复、未完成的表达和自我纠正会增加阅读负担，模糊说话者的最终意图，并将尚未解决或已被放弃的内容传递给下游任务。现有口语到书面语方法处理已经完成的音频或转写，但当后续语音改变了先前内容的解释方式时，无法修订已输出的文本。因此，我们提出 Agentic Speech Recognition（AgenticSR）：在保留说话者最终意图的同时，去除不流畅表达、解析自我纠正并规范书面形式的音频到清晰文本任务。AgenticASR 通过 ASR–Refiner 架构实现这一任务：随着音频到达，反复转换有界的活动上下文，并替换对应的输出片段，从而支持任意时长语音流的持续输出与修订。我们还提出了具有细粒度原子评测标准的双语基准 AASR-Bench。搭配多种 ASR 前端，AgenticASR 在受测系统中取得最高的 AASR-Bench 分数。人类–AI 一致性研究表明，基于评测标准的判断与独立专家评估一致。消融实验分析了 Refiner 容量、上下文长度，以及在线和离线推理之间的质量–时延权衡。这些结果共同表明，AgenticASR 是一个能在持续语音中生成保留意图的清晰转写的实用框架。">{abstract}</T></p>
        </div>
      </section>

      <section className={`${styles.band} ${styles.overviewBand}`} id="overview">
        <div className={styles.inner}>
          <div className={styles.sectionHeading}>
            <span className={styles.sectionNumber}><T>{"02 / TASK"}</T></span>
            <div><h2><T>{"From verbatim speech to usable text."}</T></h2><p><T>{"Speech is full of abandoned starts, fillers, repetitions, and corrections. AgenticSR keeps the final intent while making the output ready for reading and downstream use."}</T></p></div>
          </div>
          <figure className={styles.figure}>
            <Image src="/agenticasr/teaser.png" alt="AgenticASR transforms speech into clean written text" width={1396} height={420} priority />
            <figcaption><T>{"AgenticASR targets clean, final-intent-preserving transcription instead of verbatim speech recognition."}</T></figcaption>
          </figure>
          <div className={styles.explainGrid}>
            <article><span>01</span><h3><T>{"Emit"}</T></h3><p><T>{"The ASR frontend produces an intermediate speech hypothesis as the user speaks."}</T></p></article>
            <article><span>02</span><h3><T>{"Refine"}</T></h3><p><T>{"A compact language-model Refiner converts the active context from oral to written form."}</T></p></article>
            <article><span>03</span><h3><T>{"Revise"}</T></h3><p><T>{"New evidence replaces only the corresponding local output span, so an earlier guess can be corrected in place."}</T></p></article>
          </div>
        </div>
      </section>

      <section className={`${styles.band} ${styles.demoBand}`} id="demo">
        <div className={styles.inner}>
          <div className={styles.sectionHeading}>
            <span className={styles.sectionNumber}><T>{"03 / DEMO"}</T></span>
            <div><h2><T>{"One system, two languages."}</T></h2><p><T>{"Both demonstrations show the same core behavior: spoken-form input becomes readable text while the transcript remains open to evidence-supported revision."}</T></p></div>
          </div>
          <div className={styles.videoGrid}>
            <article className={styles.videoCard}>
              <div className={styles.videoLabel}><span><T>{"EN / English"}</T></span><span><Play aria-hidden="true" /> 00:34</span></div>
              <video controls preload="metadata" poster="/agenticasr/en-poster.jpg" playsInline>
                <source src="/agenticasr/en-demo.mp4" type="video/mp4" />
              </video>
              <p><T>{"English streaming example: disfluencies and incomplete phrasing are rewritten into clean text."}</T></p>
            </article>
            <article className={styles.videoCard}>
              <div className={styles.videoLabel}><span><T>{"ZH / 中文"}</T></span><span><Play aria-hidden="true" /> 00:50</span></div>
              <video controls preload="metadata" poster="/agenticasr/zh-poster.jpg" playsInline>
                <source src="/agenticasr/zh-demo.mp4" type="video/mp4" />
              </video>
              <p><T>{"中文演示：系统在保留最终意图的同时，持续清理口语表达并更新局部结果。"}</T></p>
            </article>
          </div>
        </div>
      </section>

      <section className={`${styles.band} ${styles.methodBand}`} id="method">
        <div className={styles.inner}>
          <div className={styles.sectionHeading}>
            <span className={styles.sectionNumber}><T>{"04 / METHOD"}</T></span>
            <div><h2><T>{"An ASR frontend, a bounded active context, and one clean replacement."}</T></h2><p><T>{"The Refiner is deliberately separated from acoustic recognition, which lets the same text-to-text correction model work across different ASR backbones."}</T></p></div>
          </div>
          <figure className={styles.figure}>
            <Image src="/agenticasr/method.png" alt="AgenticASR data pipeline and online inference method" width={3456} height={1296} />
            <figcaption><T>{"Method overview: the five-stage data pipeline creates Oral/Clean training pairs; online inference uses VAD and a sliding window with default K=3."}</T></figcaption>
          </figure>
          <div className={styles.methodGrid}>
            <article><span className={styles.methodIcon}><Database aria-hidden="true" /></span><h3><T>{"Train the transformation"}</T></h3><p><T>{"Seed, Oral, and Clean generation are followed by ASR simulation, semantic quality control, and global deduplication."}</T></p></article>
            <article><span className={styles.methodIcon}><Timer aria-hidden="true" /></span><h3><T>{"Bound the latency"}</T></h3><p><T>{"Online inference refines a local K-chunk source window and replaces its aligned output span rather than waiting for an utterance to finish."}</T></p></article>
            <article><span className={styles.methodIcon}><ChartNoAxesCombined aria-hidden="true" /></span><h3><T>{"Measure what WER misses"}</T></h3><p><T>{"AASR-Bench separates Content, Format, Filter, and Rephrase so clean transcription quality is not reduced to token error alone."}</T></p></article>
          </div>
        </div>
      </section>

      <section className={`${styles.band} ${styles.resultsBand}`} id="results">
        <div className={styles.inner}>
          <div className={styles.sectionHeading}>
            <span className={styles.sectionNumber}><T>{"05 / RESULTS"}</T></span>
            <div><h2><T>{"AgenticASR leads the clean-transcription score."}</T></h2><p><T>{"On AASR-Bench, AgenticASR wins the Overall score within the Qwen3-ASR families and improves every Whisper configuration over its API baseline."}</T></p></div>
          </div>
          <div className={styles.metricGrid}>
            <div><strong>79.95</strong><span><T>{"Overall · Qwen3-ASR-1.7B"}</T></span></div>
            <div><strong>+27.45</strong><span><T>{"vs. FormalASR-1.7B"}</T></span></div>
            <div><strong>6,637</strong><span><T>{"atomic bilingual rubrics"}</T></span></div>
            <div><strong>0.82</strong><span><T>{"human–AI Spearman agreement"}</T></span></div>
          </div>
          <div className={styles.resultSplit}>
            <figure className={styles.figure}><Image src="/agenticasr/results-scenes.png" alt="Scene-level Overall scores for Qwen3-ASR systems" width={797} height={992} /><figcaption><T>{"Scene-level Overall scores across ten usage scenes and a pass-through control. AgenticASR with the 1.7B frontend leads both baselines in every scene."}</T></figcaption></figure>
            <div className={styles.resultNotes}>
              <h3><T>{"What the table shows"}</T></h3>
              <p><T>{"With Qwen3-ASR-1.7B, AgenticASR reaches"}</T> <b><T>{"79.95 Overall"}</T></b> <T>{"and leads all four rubric dimensions. Its advantage over the API transformation baseline ranges from 1.73 to 10.02 points across matched ASR backbones, with substantially lower latency."}</T></p>
              <p><T>{"With Whisper, the gain over the API baseline grows from 1.73 points at Base to 7.39 points at Large. The strongest improvements come from filtering and final-intent rephrasing."}</T></p>
              <p><T>{"Traditional token metrics remain useful diagnostics, but AASR-Bench exposes formatting, filtering, and correction-resolution failures that WER, CER, and MER cannot capture."}</T></p>
            </div>
          </div>
          <div className={styles.tableShell}>
            <table>
              <caption><T>{"Table 3 · Main results on AASR-Bench. Higher is better except WER/CER/MER and latency."}</T></caption>
              <thead><tr><th><T>{"ASR model"}</T></th><th><T>{"LM"}</T></th><th><T>{"Content"}</T></th><th><T>{"Format"}</T></th><th><T>{"Filter"}</T></th><th><T>{"Rephrase"}</T></th><th><T>{"WER/CER/MER ↓"}</T></th><th><T>{"Latency ↓"}</T></th><th><T>{"Overall"}</T></th></tr></thead>
              <tbody>{mainRows.map((row, index) => <tr key={`${row[0]}-${row[1]}`} className={row[1] === "AgenticASR" ? styles.highlightRow : index === 1 || index === 4 ? styles.controlRow : undefined}>{row.map((cell, cellIndex) => <td key={`${cell}-${cellIndex}`}>{cell}</td>)}</tr>)}</tbody>
            </table>
          </div>
          <p className={styles.tableNote}><T>{"Best values within each ASR family are shown in the paper in bold. The LM column identifies the downstream transformation system; FormalASR performs direct speech-to-clean-text recognition."}</T></p>
        </div>
      </section>

      <section className={`${styles.band} ${styles.ablationBand}`} id="ablations">
        <div className={styles.inner}>
          <div className={styles.sectionHeading}>
            <span className={styles.sectionNumber}><T>{"06 / ABLATIONS"}</T></span>
            <div><h2><T>{"Quality, evidence, and latency move together."}</T></h2><p><T>{"The ablations make the design trade-offs explicit: larger Refiners improve contextual rewriting, while a three-chunk online window recovers most of the useful right context."}</T></p></div>
          </div>
          <div className={styles.ablationFeature}>
            <figure className={styles.figure}><Image src="/agenticasr/window-ablation.png" alt="Effect of active window size on online revision" width={996} height={488} /><figcaption><T>{"Window size K=3 keeps enough local context to revise a destination across VAD boundaries."}</T></figcaption></figure>
            <div className={styles.resultNotes}><h3><T>{"Online window"}</T></h3><p><T>{"Moving from K=1 to K=3 raises Rephrase from"}</T> <b>36.17</b> <T>{"to"}</T> <b>70.47</b> <T>{"and Explanation from"}</T> <b>19.43</b> <T>{"to"}</T> <b>74.00</b><T>{", while latency grows by only 0.87 s. K=3 closes the gap to offline inference to 2.36 Rephrase points and 1.20 Explanation points."}</T></p><p><T>{"This is the mechanism that lets AgenticASR correct a previously emitted destination when a later chunk contains the self-repair."}</T></p></div>
          </div>
          <div className={styles.ablationRows}>
            <div className={styles.ablationRow}>
              <div className={styles.tableShell}><table><caption><T>{"Table 4 · Human agreement"}</T></caption><thead><tr><th><T>{"Measure"}</T></th><th><T>{"0.6B"}</T></th><th><T>{"1.7B"}</T></th></tr></thead><tbody><tr><td><T>{"Spearman ρ"}</T></td><td>0.8222</td><td>0.8064</td></tr><tr><td><T>{"Quadratic-weighted κ"}</T></td><td>0.8313</td><td>0.7918</td></tr></tbody></table></div>
              <div className={styles.ablationCopy}><span><T>{"ABLATION A"}</T></span><h3><T>{"Human agreement"}</T></h3><p><T>{"Double-blind experts and the Gemma-4-31B-IT judge agree strongly across 100 sampled utterances."}</T></p><p><T>{"The mean Spearman correlation is"}</T> <b>0.8222</b> <T>{"for Qwen3-ASR-0.6B and"}</T> <b>0.8064</b> <T>{"for Qwen3-ASR-1.7B; quadratic-weighted agreement is"}</T> <b>0.8313</b> <T>{"and"}</T> <b>0.7918</b>.</p></div>
            </div>
            <div className={`${styles.ablationRow} ${styles.ablationRowReverse}`}>
              <div className={styles.ablationCopy}><span><T>{"ABLATION B"}</T></span><h3><T>{"Refiner capacity"}</T></h3><p><T>{"With Qwen3-ASR-1.7B fixed, scaling the Refiner from 0.5B to 4B raises Overall by"}</T> <b>4.66</b> <T>{"points; the largest gains are in Format and Rephrase."}</T></p><p><T>{"Overall rises from"}</T> <b>78.76</b> <T>{"to"}</T> <b>83.42</b><T>{", while latency increases from"}</T> <b>9.21</b> <T>{"to"}</T> <b><T>{"10.77 s"}</T></b><T>{". Larger Refiners suit latency-tolerant offline use."}</T></p></div>
              <div className={styles.tableShell}><table><caption><T>{"Table 5 · Refiner capacity"}</T></caption><thead><tr><th><T>{"Refiner"}</T></th><th><T>{"Overall"}</T></th><th><T>{"Cont."}</T></th><th><T>{"Fmt."}</T></th><th><T>{"Filt."}</T></th><th><T>{"Reph."}</T></th><th><T>{"Lat. (s)"}</T></th></tr></thead><tbody>{refinerRows.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td key={`${row[0]}-${index}`}>{cell}</td>)}</tr>)}</tbody></table></div>
            </div>
            <div className={styles.ablationRow}>
              <div className={styles.tableShell}><table><caption><T>{"Table 6 · Offline and online AgenticASR with Qwen3-ASR-1.7B"}</T></caption><thead><tr><th><T>{"Setting"}</T></th><th><T>{"Rephrase ↑"}</T></th><th><T>{"Latency (s) ↓"}</T></th><th><T>{"Explanation ↑"}</T></th></tr></thead><tbody>{windowRows.map((row) => <tr key={row[0]} className={row[0] === "Window = 3" ? styles.highlightRow : undefined}>{row.map((cell, index) => <td key={`${row[0]}-${index}`}>{cell}</td>)}</tr>)}</tbody></table></div>
              <div className={styles.ablationCopy}><span><T>{"ABLATION C"}</T></span><h3><T>{"Online window"}</T></h3><p><T>{"Moving from K=1 to K=3 raises Rephrase from"}</T> <b>36.17</b> <T>{"to"}</T> <b>70.47</b> <T>{"and Explanation from"}</T> <b>19.43</b> <T>{"to"}</T> <b>74.00</b><T>{", while latency grows by only 0.87 s."}</T></p><p><T>{"At K=3, the gaps to offline shrink to 2.36 Rephrase points and 1.20 Explanation points, recovering nearly all useful right context for online revision."}</T></p></div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.band} ${styles.benchmarkBand}`} id="benchmark">
        <div className={styles.inner}>
          <div className={styles.sectionHeading}>
            <span className={styles.sectionNumber}><T>{"07 / BENCHMARK"}</T></span>
            <div><h2><T>{"A rubric for what “clean” actually means."}</T></h2><p><T>{"AASR-Bench is bilingual and atomic: every sample is scored on the specific transformation requirements it contains, rather than a single undifferentiated text metric."}</T></p></div>
          </div>
          <div className={styles.benchmarkGrid}>
            <div className={styles.benchmarkCopy}><div className={styles.bigNumber}>917 <small><T>{"samples"}</T></small></div><div className={styles.bigNumber}>6,637 <small><T>{"total atomic rubrics"}</T></small></div><p><T>{"Each sample has at least one Content question. Format, Filter, and Rephrase rubrics are added when those phenomena are present. The benchmark covers ten usage scenes plus a pass-through control."}</T></p><a className={styles.textLink} href="https://huggingface.co/datasets/Andrew0425/AASR-Bench" target="_blank" rel="noreferrer"><T>{"Explore AASR-Bench"}</T> <ArrowUpRight aria-hidden="true" /></a></div>
            <div className={styles.tableShell}><table><caption><T>{"Table 1 · Distribution of atomic rubrics"}</T></caption><thead><tr><th><T>{"Category"}</T></th><th><T>{"Questions"}</T></th><th><T>{"Share (%)"}</T></th><th><T>{"Coverage"}</T></th></tr></thead><tbody>{rubricRows.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td key={`${row[0]}-${index}`}>{cell}</td>)}</tr>)}</tbody></table></div>
          </div>
        </div>
      </section>

      <section className={`${styles.band} ${styles.citationBand}`} id="citation">
        <div className={styles.innerNarrow}>
          <div className={styles.sectionHeading}><span className={styles.sectionNumber}><T>{"08 / CITE"}</T></span><div><h2><T>{"Cite AgenticASR."}</T></h2><p><T>{"If this project is useful, please cite the paper."}</T></p></div></div>
          <div className={styles.citationBox}><pre>{citation}</pre><CitationCopy citation={citation} /></div>
          <div className={styles.footerLinks}><a href="https://arxiv.org/abs/2607.28175" target="_blank" rel="noreferrer"><ScrollText aria-hidden="true" /> <T>{"arXiv abstract"}</T> <ArrowUpRight aria-hidden="true" /></a><a href="https://github.com/AnXMuy/AgenticASR" target="_blank" rel="noreferrer"><Github aria-hidden="true" /> <T>{"Repository"}</T> <ArrowUpRight aria-hidden="true" /></a></div>
          <p className={styles.templateNote}><T>{"Page structure inspired by the Academic Project Page Template and Nerfies; visual language adapted for AgenticASR."}</T></p>
        </div>
      </section>
    </main>
  );
}
