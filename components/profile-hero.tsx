import Image from "next/image";
import { Localized, T } from "@/components/language-provider";
import { ContactLinks } from "@/components/contact-links";
import { site } from "@/data/site";

export function ProfileHero() {
  return (
    <aside className="academic-profile" aria-labelledby="profile-name">
      <div className="academic-portrait">
        <Image src={site.avatar} alt="Portrait of Zixuan Jiang / 蒋梓轩" width={1024} height={1280} priority sizes="(max-width: 400px) 90px, (max-width: 700px) 110px, 180px" />
      </div>
      <div className="academic-identity">
        <h1 id="profile-name">Zixuan Jiang <span lang="zh-CN">蒋梓轩</span></h1>
        <p className="preferred-name">Andrew</p>
        <p className="profile-position"><Localized en="Undergraduate in Artificial Intelligence" zh="人工智能专业本科生" /><br /><a href="https://www.xjtu.edu.cn/" target="_blank" rel="noreferrer"><T>{site.institution}</T></a></p>
        <p className="profile-incoming"><Localized en="Incoming PhD student · September 2027" zh="博士录取 · 2027 年 9 月入学" /><br /><Localized en="Shanghai Innovation Institute & Shanghai Jiao Tong University" zh="上海创智学院 · 上海交通大学" /></p>
      </div>
      <ContactLinks />
    </aside>
  );
}
