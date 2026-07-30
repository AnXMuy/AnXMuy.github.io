import { ArrowUpRight } from "lucide-react";
import { ContentSection } from "@/components/content-section";
import { FooterVisual } from "@/components/footer-visual";
import { ProfileHero } from "@/components/profile-hero";
import { RouteDock } from "@/components/route-dock";
import { Timeline } from "@/components/timeline";

const education = [
  {
    date: "2023.09 — Present",
    title: "Artificial Intelligence Experimental Class",
    detail: "Outstanding Talent Program, Xi'an Jiaotong University",
  },
  {
    date: "2021.09 — 2023.07",
    title: "Young Gifted Program",
    detail: "Xi'an Jiaotong University",
  },
];

const internships = [
  {
    date: "Research",
    title: "Xiangyong Cao's Research Group",
    detail: "Xi'an Jiaotong University · Mentor: Associate Professor Xiangyong Cao",
  },
  {
    date: "Research",
    title: "X-LANCE Lab",
    detail: "Shanghai Jiao Tong University · Mentor: Xie Chen",
  },
];

export default function Home() {
  return (
    <>
      <main className="home-main">
        <div className="content-container">
          <ProfileHero />
          <RouteDock />

          <div className="home-sections">
            <ContentSection index="01" title="About Me" id="about">
              <div className="about-copy">
                <p>
                  I&apos;m currently an undergraduate student with the{" "}
                  <a href="http://www.aiar.xjtu.edu.cn/" target="_blank" rel="noreferrer">
                    College of Artificial Intelligence<ArrowUpRight aria-hidden="true" />
                  </a>,{" "}
                  <a href="https://www.xjtu.edu.cn/" target="_blank" rel="noreferrer">
                    Xi&apos;an Jiaotong University<ArrowUpRight aria-hidden="true" />
                  </a>, and a member of the Young Gifted Program since 2021.
                </p>
                <p>
                  My research focuses on multimodal intelligence across vision, speech, and language,
                  with growing interests in omni-modal agents and human-computer interaction.
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
      <FooterVisual />
    </>
  );
}
