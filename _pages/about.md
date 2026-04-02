---
permalink: /
title: ""
excerpt: ""
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

<style>
  .page__content {
    font-size: 16px;
    line-height: 1.85;
    color: #243447;
  }

  .page__content a {
    text-decoration: none !important;
  }

  .page__content a:hover {
    text-decoration: underline !important;
  }

  .hero-section {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 28px;
    margin: 8px 0 28px 0;
    padding: 28px 30px;
    border-radius: 24px;
    background: linear-gradient(135deg, #f8fbff 0%, #f4f7fb 100%);
    border: 1px solid #e8eef7;
    box-shadow: 0 8px 30px rgba(31, 45, 61, 0.06);
  }

  .hero-text {
    flex: 1 1 580px;
    min-width: 280px;
  }

  .hero-name {
    font-size: 2.2rem;
    font-weight: 800;
    color: #172b4d;
    margin-bottom: 8px;
    line-height: 1.2;
  }

  .hero-subtitle {
    font-size: 1.04rem;
    color: #425466;
    margin-bottom: 12px;
    line-height: 1.8;
  }

  .hero-tagline {
    display: inline-block;
    margin-bottom: 14px;
    padding: 6px 14px;
    border-radius: 999px;
    background: #eaf2ff;
    color: #1f4ea3;
    font-size: 0.92rem;
    font-weight: 700;
    letter-spacing: 0.2px;
  }

  .hero-links {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 18px;
  }

  .hero-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 14px;
    border-radius: 999px;
    background: #ffffff;
    border: 1px solid #dbe4f0;
    color: #1f3b5b !important;
    font-weight: 600;
    transition: all 0.2s ease;
    box-shadow: 0 2px 8px rgba(31, 45, 61, 0.04);
  }

  .hero-btn:hover {
    background: #eef5ff;
    border-color: #c9daf7;
    transform: translateY(-1px);
  }

  .zh-note {
    font-size: 0.93rem;
    color: #667085;
    line-height: 1.8;
    margin-top: 4px;
  }

  .mini-note {
    font-size: 0.9rem;
    color: #7a8699;
    line-height: 1.75;
  }

  .section-card {
    padding: 20px 22px;
    margin: 18px 0 24px 0;
    border-radius: 20px;
    background: #ffffff;
    border: 1px solid #edf1f5;
    box-shadow: 0 6px 22px rgba(31, 45, 61, 0.05);
  }

  .section-title {
    margin-top: 0;
    margin-bottom: 12px;
  }

  .highlight-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
    gap: 14px;
    margin-top: 12px;
  }

  .highlight-item {
    padding: 14px 16px;
    border-radius: 16px;
    background: #f8fbff;
    border: 1px solid #e8eef7;
  }

  .highlight-item strong {
    color: #173a63;
  }

  .news-list {
    margin-bottom: 0;
  }

  .news-list li {
    margin-bottom: 12px;
  }

  details.news-more {
    margin-top: 10px;
  }

  details.news-more summary {
    cursor: pointer;
    font-weight: 600;
    color: #355070;
  }

  .copy-email-text {
    color: #2563eb;
    cursor: pointer;
    font-weight: 700;
    transition: color 0.2s ease;
  }

  .copy-email-text:hover {
    text-decoration: underline;
    color: #1d4ed8;
  }

  .paper-box {
    border-radius: 20px;
    border: 1px solid #e9eef5;
    padding: 14px;
    background: #ffffff;
    box-shadow: 0 8px 24px rgba(31, 45, 61, 0.05);
    margin-bottom: 18px;
  }

  .paper-box-image img {
    border-radius: 14px;
  }

  .paper-box-text {
    font-size: 0.98rem;
  }

  .badge {
    display: inline-block;
    background: #e8f1ff;
    color: #1d4ed8;
    border-radius: 999px;
    padding: 4px 10px;
    font-size: 0.78rem;
    font-weight: 700;
    margin-bottom: 10px;
  }

  .pub-title {
    font-size: 1.1rem;
    font-weight: 800;
    line-height: 1.5;
  }

  .resource-links a {
    display: inline-block;
    margin-right: 10px;
    margin-top: 4px;
    font-weight: 600;
  }

  .simple-list li {
    margin-bottom: 10px;
  }

  .two-col-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 10px 28px;
  }

  @media (max-width: 768px) {
    .hero-section {
      padding: 22px 20px;
    }

    .hero-name {
      font-size: 1.9rem;
    }
  }
</style>

{% if site.google_scholar_stats_use_cdn %}
{% assign gsDataBaseUrl = "https://cdn.jsdelivr.net/gh/" | append: site.repository | append: "@" %}
{% else %}
{% assign gsDataBaseUrl = "https://raw.githubusercontent.com/" | append: site.repository | append: "/" %}
{% endif %}
{% assign url = gsDataBaseUrl | append: "google-scholar-stats/gs_data_shieldsio.json" %}

<span class='anchor' id='about-me'></span>

<div class="hero-section">
  <div class="hero-text">
    <div class="hero-name">Zixuan Jiang 蒋梓轩</div>

    <div class="hero-tagline">Multimodal Learning · Remote Sensing · Speech Interaction</div>

    <div class="hero-subtitle">
      Undergraduate student at the <a href="http://www.aiar.xjtu.edu.cn/">College of Artificial Intelligence</a>, <a href="https://www.xjtu.edu.cn/">Xi’an Jiaotong University</a>. 
      I have also been a student in the <strong><a href="https://baike.baidu.com/item/%E8%A5%BF%E5%AE%89%E4%BA%A4%E9%80%9A%E5%A4%A7%E5%AD%A6%E5%B0%91%E5%B9%B4%E7%8F%AD/58501505">Young Gifted Program</a></strong> since 2021.
    </div>
    <div class="zh-note">
      西安交通大学人工智能学院本科生，自 2021 年起进入西安交通大学少年班。当前研究兴趣主要包括多模态学习、遥感视觉语言理解与语音交互。
    </div>

    <div class="hero-links">
      <a class="hero-btn" href="images/CV.pdf">📄 CV</a>
      <a class="hero-btn" href="https://github.com/AnXMuy">💻 GitHub</a>
      <a class="hero-btn" href="https://huggingface.co/Andrew0425">🤗 Hugging Face</a>
      <a class="hero-btn" href="https://orcid.org/">🆔 ORCID</a>
      <span class="hero-btn">📫 <span class="copy-email-text" id="emailText" data-email="andrewjiang@stu.xjtu.edu.cn" title="Click to copy email">Email</span></span>
    </div>
  </div>
</div>

<div class="section-card">
  <h2 class="section-title">🧭 Research Overview</h2>

  My research focuses on multimodal intelligence, with particular interests in remote sensing vision-language understanding, object-level image description, and interactive speech systems. I am especially interested in building models and benchmarks that enable fine-grained perception, reasoning, and language generation in real-world scenarios.

  <div class="zh-note">
    我的研究聚焦于多模态智能，尤其关注遥感视觉语言理解、目标级图像描述以及交互式语音系统。我希望构建能够支持细粒度感知、推理与语言生成的模型、数据集与评测基准。
  </div>

  <div class="highlight-grid">
    <div class="highlight-item">
      <strong>Research Topics</strong><br>
      Multimodal Learning, Remote Sensing, Speech Interaction
    </div>
    <div class="highlight-item">
      <strong>Current Focus</strong><br>
      Fine-grained localized captioning and multimodal reasoning
    </div>
    <div class="highlight-item">
      <strong>Representative Project</strong><br>
      DescribeEarth
    </div>
  </div>
</div>

## 🔥 Selected News

<div class="section-card">
<ul class="news-list">
  <li>
    <em>2025.12</em>: 🔥🔥 Receive a pre-admission offer from <a href="https://www.sii.edu.cn/">Shanghai Innovation Institute</a> through the 2026 Golden Autumn Camp!
    <div class="zh-note">获得上海创新院 2026 年金秋营预录取资格。</div>
  </li>

  <li>
    <em>2025.10</em>: 🔥🔥 The <strong>National Scholarship</strong> has been confirmed!
    <div class="zh-note">获国家奖学金。</div>
  </li>

  <li>
    <em>2025.10</em>: 🎉🎉 <strong>DescribeEarth</strong> has been <strong>open-source</strong>! The code is available @ <a href="https://github.com/earth-insights/DescribeEarth">GitHub</a>
    <div class="zh-note">DescribeEarth 项目正式开源。</div>
  </li>

  <li>
    <em>2025.09</em>: 🎉🎉 <strong>DescribeEarth</strong> has been public on <a href="https://arxiv.org/abs/2509.25654">arXiv</a>
    <div class="zh-note">DescribeEarth 论文在 arXiv 公开发布。</div>
  </li>
</ul>
</div>

## 📝 Selected Publications

<div class='paper-box'>
  <div class='paper-box-image'>
    <div>
      <div class="badge">arXiv 2025</div>
      <img src='images/describeearth.png' alt="DescribeEarth" width="100%">
    </div>
  </div>

  <div class='paper-box-text' markdown="1">

<div class="pub-title">[DescribeEarth: Describe Anything for Remote Sensing Images](https://arxiv.org/abs/2509.25654)</div>

Kaiyu Li\*, **Zixuan Jiang\***, Xiangyong Cao☨, Jiayu Wang, Yuchen Xiao, Deyu Meng, Zhi Wang

<div class="zh-note">提出遥感图像的细粒度目标级描述任务，并构建对应的模型、数据集与评测基准。</div>

- We introduce geo-spatial detailed localized captioning.
- We build the first describe-anything model in remote sensing.
- We release the related dataset and benchmark.

<div class="resource-links">
  <a href="https://github.com/earth-insights/DescribeEarth">Code</a>
  <a href="https://huggingface.co/datasets/earth-insights/DE-Dataset">Dataset</a>
  <a href="https://huggingface.co/datasets/earth-insights/DE-Benchmark">Benchmark</a>
</div>

**Media Coverage**: [遥感与深度学习](https://mp.weixin.qq.com/s/qhFIZ6QMmikZ9L7q3cKFaw), [码科智能](https://mp.weixin.qq.com/s/FjmlKo0EkEzXhAk82AdeFQ), [CV炼丹术](https://mp.weixin.qq.com/s/LfGuwxEoIwpEOZXAi6w0fg)

  </div>
</div>

<div class="section-card">
- [**Annotation-Free Open-Vocabulary Segmentation for Remote-Sensing Images**](https://arxiv.org/abs/2508.18067)  
  Kaiyu Li, Xiangyong Cao☨, Ruixun Liu, Shihong Wang, **Zixuan Jiang**, Zhi Wang, Deyu Meng, **arXiv 2025**
  <div class="zh-note">关注遥感图像中的无标注开放词汇分割问题。</div>
</div>

## 🎖 Honors and Awards

<div class="section-card">
<ul class="simple-list">
  <li>
    <em>2025.10</em> <strong>National Scholarship</strong>
    <div class="zh-note">国家奖学金。</div>
  </li>
  <li>
    <em>2025.10</em> "Outstanding Student", Xi'an Jiaotong University
    <div class="zh-note">西安交通大学优秀学生。</div>
  </li>
  <li>
    <em>2024.11</em> <strong>“Shuiyou” First-Class Scholarship</strong> (<strong>Top 4</strong> students in university)
    <div class="zh-note">“税友”一等奖学金，全校仅 4 人获评。</div>
  </li>
  <li>
    <em>2024.11</em> "Outstanding Student", Xi'an Jiaotong University
    <div class="zh-note">西安交通大学优秀学生。</div>
  </li>
  <li>
    <em>2023.11</em> Third-Class Scholarship, Xi'an Jiaotong University
    <div class="zh-note">西安交通大学三等奖学金。</div>
  </li>
</ul>
</div>

## 🏆 Competitions

<div class="section-card">
  <h3>✨ AI Competitions</h3>
  <ul class="simple-list">
    <li>
      <em>2025</em> <strong>Second Prize</strong>, The 9th National Laser Radar Conference Point Cloud Intelligent Analysis Competition, “Extraction and Vectorization of Urban Road Lane Lines”
      <div class="zh-note">第九届全国激光雷达大会点云智能分析比赛二等奖。</div>
    </li>
    <li>
      <em>2025</em> <strong>Silver Medal</strong>, ICPC Shaanxi Provincial Programming Contest
      <div class="zh-note">ICPC 陕西省赛银奖。</div>
    </li>
    <li>
      <em>2025</em> <strong>Excellence Award</strong> (Finalist, <strong>sole team from Northwest China</strong>), AI+ College Innovation Program, AI Technology Track
      <div class="zh-note">AI+ 高校创智计划全国决赛奖项，西北地区唯一晋级团队。</div>
    </li>
    <li>
      <em>2024</em> <strong>Bronze Medal</strong>, ICPC Shaanxi Provincial Programming Contest
      <div class="zh-note">ICPC 陕西省赛铜奖。</div>
    </li>
  </ul>

  <h3>📐 Math Modeling</h3>
  <ul class="simple-list">
    <li>
      <em>2023–2025</em> <strong>3 × First Prize</strong>, National College Student Mathematical Modeling Competition (Shaanxi Division)
      <div class="zh-note">全国大学生数学建模竞赛陕西赛区一等奖 3 次。</div>
    </li>
    <li>
      <em>2024</em> <strong>Meritorious Winner</strong>, Mathematical Contest in Modeling (MCM), USA
      <div class="zh-note">美国大学生数学建模竞赛 M 奖。</div>
    </li>
    <li>
      <em>2023</em> <strong>Honorable Prize</strong>, Mathematical Contest in Modeling (MCM), USA
      <div class="zh-note">美国大学生数学建模竞赛 H 奖。</div>
    </li>
  </ul>
</div>

## 📖 Education

<div class="section-card">
<ul class="simple-list">
  <li>
    <em>2023.09 – Present</em>, Artificial Intelligence Experimental Class, Xi'an Jiaotong University (Outstanding Talent Program)
    <div class="zh-note">西安交通大学人工智能试验班（拔尖人才培养方向）。</div>
  </li>
  <li>
    <em>2021.09 – Present</em>, Young Gifted Program, Xi'an Jiaotong University
    <div class="zh-note">西安交通大学少年班。</div>
  </li>
</ul>
</div>

## 🔬 Research Experience

<div class="section-card">
<ul class="simple-list">
  <li>
    <strong>Xi'an Jiaotong University</strong>, Research Group of Associate Professor Xiangyong Cao  
    <div class="zh-note">西安交通大学曹相勇副教授课题组。</div>
  </li>
  <li>
    <strong>Shanghai Jiao Tong University</strong>, X-LANCE Lab, Mentor: Xie Chen  
    <div class="zh-note">上海交通大学 X-LANCE Lab。</div>
  </li>
</ul>
</div>

## 📬 Contact

<div class="section-card">
You are welcome to reach out for research discussions, collaborations, or academic communication.

<div class="zh-note">
欢迎通过邮件联系我，进行科研交流与合作讨论。
</div>

- Email: <span class="copy-email-text" id="emailTextBottom" data-email="andrewjiang@stu.xjtu.edu.cn" title="Click to copy email">andrewjiang@stu.xjtu.edu.cn</span>
- GitHub: <a href="https://github.com/AnXMuy">https://github.com/AnXMuy</a>
- CV: <a href="images/CV.pdf">View my resume</a>
</div>

<script>
  function bindCopyEmail(id) {
    const emailText = document.getElementById(id);
    if (!emailText) return;

    emailText.addEventListener('click', function() {
      const email = this.getAttribute('data-email');
      navigator.clipboard.writeText(email).then(() => {
        const originalText = this.textContent;
        this.textContent = 'Copied!';
        this.style.color = '#16a34a';
        this.style.textDecoration = 'none';

        setTimeout(() => {
          this.textContent = originalText;
          this.style.color = '';
          this.style.textDecoration = '';
        }, 1800);
      }).catch(err => {
        console.error('Failed to copy email: ', err);
        alert('复制失败，请手动复制: ' + email);
      });
    });
  }

  bindCopyEmail('emailText');
  bindCopyEmail('emailTextBottom');
</script>
