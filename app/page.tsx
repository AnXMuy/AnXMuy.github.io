import { Localized, T } from "@/components/language-provider";
import { ArrowUpRight } from "lucide-react";
import { ContentSection } from "@/components/content-section";
import { ProfileHero } from "@/components/profile-hero";
import { Timeline } from "@/components/timeline";
import { education, internships } from "@/data/resume";

export default function Home() {
  return (
    <>
      <main className="home-main">
        <div className="content-container">
          <ProfileHero />

          <div className="home-sections">
            <ContentSection index="01" title="About Me" id="about">
              <div className="about-copy">
                <p>
                  <Localized
                    en={<>
                      I am an undergraduate student in Artificial Intelligence at{" "}
                      <a href="https://www.xjtu.edu.cn/" target="_blank" rel="noreferrer">
                        Xi&apos;an Jiaotong University<ArrowUpRight aria-hidden="true" />
                      </a>, where I first joined the Young Gifted Program before entering the Artificial Intelligence Experimental Class. I will begin a PhD in Computer Science at{" "}
                      <a href="https://www.sii.edu.cn/" target="_blank" rel="noreferrer">
                        Shanghai Innovation Institute<ArrowUpRight aria-hidden="true" />
                      </a>{" "}and the{" "}
                      <a href="https://cs.sjtu.edu.cn/" target="_blank" rel="noreferrer">
                        School of Computer Science, Shanghai Jiao Tong University<ArrowUpRight aria-hidden="true" />
                      </a>{" "}in September 2027.
                    </>}
                    zh={<>
                      我目前是
                      <a href="https://www.xjtu.edu.cn/" target="_blank" rel="noreferrer">西安交通大学<ArrowUpRight aria-hidden="true" /></a>
                      人工智能专业本科生，曾先后就读于少年班和人工智能试验班。我将于 2027 年 9 月开始在
                      <a href="https://www.sii.edu.cn/" target="_blank" rel="noreferrer">上海创智学院<ArrowUpRight aria-hidden="true" /></a>
                      与
                      <a href="https://cs.sjtu.edu.cn/" target="_blank" rel="noreferrer">上海交通大学计算机学院<ArrowUpRight aria-hidden="true" /></a>
                      攻读计算机科学博士。
                    </>}
                  />
                </p>
                <p>
                  <Localized
                    en={<>My research interests lie in how multimodal models perceive, reason about, and interact with the world through language, vision, and speech.</>}
                    zh={<>我的研究兴趣是探索多模态模型如何通过语言、视觉与语音感知、理解并与世界交互。</>}
                  />
                </p>
                <p>
                  <T>{"Going forward, I will focus on multimodal large language models and audio-visual intelligence."}</T>
                </p>
              </div>
            </ContentSection>

            <ContentSection index="02" title="Education" id="education">
              <Timeline items={education} />
            </ContentSection>

            <ContentSection index="03" title="Internships" id="internships">
              <Timeline items={internships} />
            </ContentSection>
          </div>
        </div>
      </main>
    </>
  );
}
