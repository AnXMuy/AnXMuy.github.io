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
                  <Localized en={<>
                  I&apos;m currently an undergraduate student with the{" "}
                  <a href="http://www.aiar.xjtu.edu.cn/" target="_blank" rel="noreferrer">
                    College of Artificial Intelligence<ArrowUpRight aria-hidden="true" />
                  </a>,{" "}
                  <a href="https://www.xjtu.edu.cn/" target="_blank" rel="noreferrer">
                    Xi&apos;an Jiaotong University<ArrowUpRight aria-hidden="true" />
                  </a>, and a member of the Young Gifted Program since 2021.
                  </>} zh={<>
                    我目前本科就读于
                    <a href="https://www.xjtu.edu.cn/" target="_blank" rel="noreferrer">西安交通大学<ArrowUpRight aria-hidden="true" /></a>
                    <a href="http://www.aiar.xjtu.edu.cn/" target="_blank" rel="noreferrer">人工智能学院<ArrowUpRight aria-hidden="true" /></a>
                    ，于 2021 年进入西安交通大学少年班。
                  </>} />
                </p>
                <p>
                  <T>{"My research focuses on multimodal large language models and human-computer interaction."}</T>
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
