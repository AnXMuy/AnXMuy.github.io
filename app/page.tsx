import Link from "next/link";
import { Localized, T } from "@/components/language-provider";
import { ContentSection } from "@/components/content-section";
import { ProfileHero } from "@/components/profile-hero";
import { News } from "@/components/news";
import { Timeline } from "@/components/timeline";
import { education, internships } from "@/data/resume";
import { site } from "@/data/site";

export default function Home() {
  return (
    <main className="home-main">
      <div className="content-container academic-layout">
        <ProfileHero />
        <div className="home-sections">
          <ContentSection index="01" title="About Me" id="about">
            <div className="about-copy">
              <p>
                <Localized
                  en={<>I am <strong>Zixuan Jiang (Andrew)</strong>, an undergraduate student in Artificial Intelligence at <a href="https://www.xjtu.edu.cn/" target="_blank" rel="noreferrer">Xi&apos;an Jiaotong University</a>. I am a member of the Young Gifted Program (2021 cohort) and the Artificial Intelligence Experimental Class (2023 cohort).</>}
                  zh={<>我是<strong>蒋梓轩（Zixuan Jiang / Andrew）</strong>，目前是<a href="https://www.xjtu.edu.cn/" target="_blank" rel="noreferrer">西安交通大学</a>人工智能专业本科生。我是西安交大少年班 2021 级、人工智能试验班 2023 级成员。</>}
                />
              </p>
              <p>
                <Localized
                  en={<>I have been admitted to the PhD program in Computer Science at <a href="https://www.sii.edu.cn/" target="_blank" rel="noreferrer">Shanghai Innovation Institute</a> and the <a href="https://cs.sjtu.edu.cn/" target="_blank" rel="noreferrer">School of Computer Science, Shanghai Jiao Tong University</a>. I will begin my studies in <strong>September 2027</strong> under the supervision of <a href="https://chenxie95.github.io/" target="_blank" rel="noreferrer">Xie Chen</a>. I currently conduct research with the X-LANCE Lab.</>}
                  zh={<>我已获<a href="https://www.sii.edu.cn/" target="_blank" rel="noreferrer">上海创智学院</a>与<a href="https://cs.sjtu.edu.cn/" target="_blank" rel="noreferrer">上海交通大学计算机学院</a>计算机科学博士录取，将于 <strong>2027 年 9 月</strong>入学，导师为<a href="https://chenxie95.github.io/" target="_blank" rel="noreferrer">陈谐老师</a>。目前我在 X-LANCE 实验室开展研究。</>}
                />
              </p>
              <p>
                <Localized
                  en={<>My research centers on <strong>Audio-Visual Intelligence</strong>: how audio-visual systems can better understand and represent the world, and interact and collaborate with people.</>}
                  zh={<>我的研究主线是<strong>音视频多模态智能（Audio-Visual Intelligence）</strong>，关注音视频系统如何更好地理解和表征世界，并与人交互、协作。</>}
                />
              </p>
              <p className="collaboration-note">
                <Localized
                  en={<>I am open to research collaborations and internship opportunities in audio-visual intelligence. Please feel free to <a href={`mailto:${site.email}`}>get in touch</a>.</>}
                  zh={<>欢迎交流音视频多模态智能方向的科研合作及研究实习机会，请通过<a href={`mailto:${site.email}`}>邮箱联系我</a>。</>}
                />
              </p>
              <p className="personal-interests"><Localized en="Outside research, I enjoy music and playing the piano." zh="科研之外，我喜欢音乐，也喜欢弹钢琴。" /></p>
            </div>
          </ContentSection>

          <ContentSection index="02" title="Research Interests" id="research">
            <ul className="research-interests">
              <li><Localized en={<><strong>Multimodal understanding & representation.</strong> I am interested in how audio and video can be used together to understand events and their context, and to learn representations of the world.</>} zh={<><strong>多模态理解与表征。</strong>联合音频与视频信息，理解事件及其上下文，探索对世界的多模态表征。</>} /></li>
              <li><Localized en={<><strong>Human–AI interaction & collaboration.</strong> I explore how audio-visual systems can understand human intent, incorporate feedback, and support natural interaction and collaboration.</>} zh={<><strong>人机交互与协作。</strong>探索音视频系统如何理解人的意图与反馈，支持自然的交互与协作。</>} /></li>
            </ul>
            <p className="earlier-research"><Localized en={<>My earlier research explored <strong>remote sensing image interpretation</strong>, including detailed localized captioning and open-vocabulary perception.</>} zh={<>此前，我开展了<strong>遥感图像解译</strong>相关研究，关注精细化区域描述与开放词汇感知。</>} /> <Link href="/publications/"><T zh="完整论文列表">Full publication list</T> →</Link></p>
          </ContentSection>

          <ContentSection index="03" title="News" id="news"><News /></ContentSection>
          <ContentSection index="04" title="Education" id="education"><Timeline items={education} /></ContentSection>
          <ContentSection index="05" title="Research Experience" id="research-experience"><Timeline items={internships} /></ContentSection>
        </div>
      </div>
    </main>
  );
}
