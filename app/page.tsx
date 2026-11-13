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
                  en={<>I have been admitted to the Computer Science PhD program at <a href="https://www.sii.edu.cn/" target="_blank" rel="noreferrer">Shanghai Innovation Institute</a> and the <a href="https://cs.sjtu.edu.cn/" target="_blank" rel="noreferrer">School of Computer Science, Shanghai Jiao Tong University</a>. I will begin my doctoral studies in <strong>September 2027</strong> under the supervision of <a href="https://chenxie95.github.io/" target="_blank" rel="noreferrer">Xie Chen</a>, and I am currently working with the X-LANCE Lab.</>}
                  zh={<>我已获<a href="https://www.sii.edu.cn/" target="_blank" rel="noreferrer">上海创智学院</a>与<a href="https://cs.sjtu.edu.cn/" target="_blank" rel="noreferrer">上海交通大学计算机学院</a>计算机科学博士项目录取，将于 <strong>2027 年 9 月</strong>入学，导师为<a href="https://chenxie95.github.io/" target="_blank" rel="noreferrer">陈谐老师</a>。目前我在 X-LANCE 实验室开展研究。</>}
                />
              </p>
              <p>
                <Localized
                  en={<>My research centers on <strong>Audio-Visual Multimodal Intelligence</strong>: how audio-visual systems understand and represent the world, and how they interact and collaborate with people.</>}
                  zh={<>我的研究主线是<strong>音视频多模态智能（Audio-Visual Multimodal Intelligence）</strong>，关注音视频系统如何理解并表征世界，以及如何与人交互、协作。</>}
                />
              </p>
              <p className="collaboration-note">
                <Localized
                  en={<>I am always glad to hear about research collaborations or internships in audio-visual multimodal intelligence. Feel free to <a href={`mailto:${site.email}`}>send me an email</a>.</>}
                  zh={<>如果有音视频多模态智能方向的科研合作或实习机会，欢迎<a href={`mailto:${site.email}`}>发邮件联系我</a>。</>}
                />
              </p>
              <p className="personal-interests"><Localized en="Outside of research, I enjoy music and playing the piano." zh="科研之外，我喜欢音乐，也喜欢弹钢琴。" /></p>
            </div>
          </ContentSection>

          <ContentSection index="02" title="Research Interests" id="research">
            <ul className="research-interests">
              <li><Localized en={<><strong>Multimodal understanding & representation.</strong> I study how audio and video can be combined to understand what is happening and why, and how models can learn representations that capture both.</>} zh={<><strong>多模态理解与表征。</strong>我研究如何结合音频与视频来理解正在发生什么、为何发生，以及模型如何学习保留两种模态信息的表征。</>} /></li>
              <li><Localized en={<><strong>Human–AI interaction & collaboration.</strong> I study how audio-visual systems can interpret human intent, learn from feedback, and support natural interaction.</>} zh={<><strong>人机交互与协作。</strong>我关注音视频系统如何理解人的意图、利用反馈，并支持自然的交互与协作。</>} /></li>
            </ul>
            <p className="earlier-research"><Localized en={<>My earlier work focused on <strong>remote sensing image interpretation</strong>, especially detailed localized captioning and open-vocabulary perception.</>} zh={<>我此前的研究聚焦<strong>遥感图像解译</strong>，尤其是精细区域描述与开放词汇感知。</>} /> <Link href="/publications/"><T zh="完整论文列表">Full publication list</T> →</Link></p>
          </ContentSection>

          <ContentSection index="03" title="News" id="news"><News /></ContentSection>
          <ContentSection index="04" title="Education" id="education"><Timeline items={education} /></ContentSection>
          <ContentSection index="05" title="Research Experience" id="research-experience"><Timeline items={internships} /></ContentSection>
        </div>
      </div>
    </main>
  );
}
