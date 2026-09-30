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
                      </a>, and will begin a PhD in Computer Science at Shanghai Innovation Institute and the School of Computer Science, Shanghai Jiao Tong University in September 2027.
                    </>}
                    zh={<>
                      我目前就读于
                      <a href="https://www.xjtu.edu.cn/" target="_blank" rel="noreferrer">西安交通大学<ArrowUpRight aria-hidden="true" /></a>
                      人工智能专业，并将于 2027 年 9 月开始在上海创智学院与上海交通大学计算机学院攻读计算机科学博士。
                    </>}
                  />
                </p>
                <p>
                  <T>{"I study how multimodal models can perceive, reason about, and interact with the world through language, vision, and speech."}</T>
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
