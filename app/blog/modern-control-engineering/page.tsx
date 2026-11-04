import type { Metadata } from "next";
import { Download, ExternalLink, FileText, SlidersHorizontal } from "lucide-react";
import { Localized, T } from "@/components/language-provider";
import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";

const pdfPath = "/files/modern-control-engineering-project.pdf";

export const metadata: Metadata = {
  title: "Analysis and Design of a Double Inverted Pendulum System",
  description:
    "Modern Control Engineering course project: state-space modeling, stability analysis, state-feedback control, and observer design for a double inverted pendulum in MATLAB and Simulink.",
};

const scope = [
  {
    en: "State-space modeling and characteristic-polynomial stability analysis",
    zh: "状态空间建模与特征多项式稳定性判别",
  },
  {
    en: "Controllability and observability tests",
    zh: "能控性与能观性判别",
  },
  {
    en: "Zero-input state response",
    zh: "零输入状态响应",
  },
  {
    en: "Pole placement, state-feedback control, and Simulink validation",
    zh: "极点配置、状态反馈控制与 Simulink 仿真验证",
  },
  {
    en: "Full- and reduced-order observer design with closed-loop simulation",
    zh: "全维与降维状态观测器设计及闭环仿真",
  },
];

export default function ModernControlEngineeringPage() {
  return (
    <main className="subpage-main">
      <div className="content-container article-container document-page">
        <PageIntro
          eyebrow="Modern Control Engineering · Course document · May 2025"
          title="Analysis and Design of a Double Inverted Pendulum System"
          description="Course project for Modern Control Engineering. Starting from the nonlinear dynamics of a double inverted pendulum, the report builds a state-space model, checks stability, controllability, and observability, and designs state-feedback control with full- and reduced-order observers in MATLAB and Simulink."
        />

        <Reveal className="document-overview">
          <div className="document-facts" aria-label="Document details / 文档信息">
            <span><FileText aria-hidden="true" /><Localized en="20-page PDF" zh="20 页 PDF" /></span>
            <span><SlidersHorizontal aria-hidden="true" />MATLAB R2024a</span>
            <span>Simulink</span>
          </div>

          <div className="document-copy">
            <p>
              <Localized
                en="A double inverted pendulum falls over without active control. For this project, I derived a linear state-space model around the upright equilibrium, then used state feedback and observers to stabilize it. The report records the analysis and the MATLAB/Simulink checks step by step."
                zh="二级倒立摆在没有主动控制时会倒下。这个项目中，我先在竖直平衡点附近建立线性状态空间模型，再通过状态反馈和观测器使其稳定。报告逐步记录了分析过程与 MATLAB/Simulink 仿真验证。"
              />
            </p>
            <p>
              <Localized
                en="The report is kept in its original Chinese and includes the full MATLAB source code in the appendix."
                zh="报告保留原始中文内容，附录中附有完整的 MATLAB 源代码。"
              />
            </p>
          </div>

          <div className="document-scope">
            <p className="document-scope-label"><T>What the report covers</T></p>
            <ul>
              {scope.map((item) => (
                <li key={item.en}><Localized en={item.en} zh={item.zh} /></li>
              ))}
            </ul>
          </div>

          <div className="document-actions">
            <a className="download-cta" href={pdfPath} download>
              <Download aria-hidden="true" /><T>Download PDF</T>
            </a>
            <a className="document-open-link" href={pdfPath} target="_blank" rel="noreferrer">
              <ExternalLink aria-hidden="true" /><T>Open in a new tab</T>
            </a>
          </div>
        </Reveal>

        <section className="pdf-preview" aria-labelledby="pdf-preview-title">
          <div className="pdf-preview-header">
            <div>
              <h2 id="pdf-preview-title"><T>Read the full report</T></h2>
              <p><T>The original 20-page PDF is embedded below.</T></p>
            </div>
            <a href={pdfPath} target="_blank" rel="noreferrer"><T>Open in a new tab</T><ExternalLink aria-hidden="true" /></a>
          </div>
          <iframe
            src={pdfPath}
            title="Analysis and Design of a Double Inverted Pendulum System (PDF)"
            loading="lazy"
          />
        </section>
      </div>
    </main>
  );
}
