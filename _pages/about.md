---
permalink: /
title: ""
excerpt: ""
author_profile: true
lang: en
redirect_from:
  - /about/
  - /about.html
---

<span class='anchor' id='about-me'></span>

<div class="hero-intro">
  <p class="hero-kicker">Multimodal Intelligence • Vision • Speech • Language</p>
  <h1>Zixuan Jiang (Andrew)</h1>
  <p>
    I'm currently an undergraduate student with the
    <a href="http://www.aiar.xjtu.edu.cn/">College of Artificial Intelligence</a>,
    <a href="https://www.xjtu.edu.cn/">Xi'an Jiaotong University</a>,
    and a member of the
    <a href="https://baike.baidu.com/item/%E8%A5%BF%E5%AE%89%E4%BA%A4%E9%80%9A%E5%A4%A7%E5%AD%A6%E5%B0%91%E5%B9%B4%E7%8F%AD/58501505">Young Gifted Program</a>
    since 2021.
  </p>
  <p>
    My research focuses on multimodal intelligence across vision, speech, and language,
    with growing interests in omni-modal agents and human-computer interaction.
  </p>
  <p>
    <a class="hero-btn" href="images/CV.pdf">View CV</a>
    <span class="hero-email" id="emailText" data-email="andrewjiang@stu.xjtu.edu.cn" title="Click to copy email">Copy Email</span>
  </p>
</div>

<span class='anchor' id='news'></span>
## News

- *2025.12*: Receive a pre-admission offer from [Shanghai Innovation Institute](https://www.sii.edu.cn/) through the 2026 Golden Autumn Camp.
- *2025.10*: National Scholarship has been confirmed.
- *2025.10*: **DescribeEarth** has been open-sourced at [GitHub](https://github.com/earth-insights/DescribeEarth).
- *2025.09*: **DescribeEarth** is available on [arXiv](https://arxiv.org/abs/2509.25654).

<span class='anchor' id='publications'></span>
## Publications

### Remote Sensing Image Interpretation

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">arXiv 2025</div><img src='images/describeearth.png' alt="DescribeEarth" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[DescribeEarth: Describe Anything for Remote Sensing Images](https://arxiv.org/abs/2509.25654)

Kaiyu Li\*, **Zixuan Jiang\***, Xiangyong Cao☨, Jiayu Wang, Yuchen Xiao, Deyu Meng, Zhi Wang

**Open-source**: [code](https://github.com/earth-insights/DescribeEarth), [dataset](https://huggingface.co/datasets/earth-insights/DE-Dataset), [benchmark](https://huggingface.co/datasets/earth-insights/DE-Benchmark)

- We introduce geo-spatial detailed localized captioning.
- We build the first describe-anything model in remote sensing.
- We release the related dataset and benchmark.

**Media Coverage**: [遥感与深度学习](https://mp.weixin.qq.com/s/qhFIZ6QMmikZ9L7q3cKFaw), [码科智能](https://mp.weixin.qq.com/s/FjmlKo0EkEzXhAk82AdeFQ), [CV炼丹术](https://mp.weixin.qq.com/s/LfGuwxEoIwpEOZXAi6w0fg)
</div>
</div>

- [Annotation-Free Open-Vocabulary Segmentation for Remote-Sensing Images](https://arxiv.org/abs/2508.18067), Kaiyu Li, Xiangyong Cao☨, Ruixun Liu, Shihong Wang, **Zixuan Jiang**, Zhi Wang, Deyu Meng, **arXiv 2025**
- [Advances in open vocabulary perception for remote sensing images](https://www.cjig.cn/en/article/doi/10.11834/jig.260163/), Kaiyu Li, Xiangyong Cao☨, **Zixuan Jiang**, Deyu Meng, **Journal of Image and Graphics 2026**

### Audio Interaction

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">arXiv 2026</div><img src='images/interactiveasr_interspeech.png' alt="Interactive ASR" width="50%"></div></div>
<div class='paper-box-text' markdown="1">

[Interactive ASR: Towards Human-Like Interaction and Semantic Coherence Evaluation for Agentic Speech Recognition](https://arxiv.org/abs/2604.09121)

Peng Wang\*, Yanqiao Zhu\*, **Zixuan Jiang\***, Qinyuan Chen, Xingjian Zhao, Xipeng Qiu, Wupeng Wang, Zhifu Gao, Xiangang Li, Kai Yu, Xie Chen☨

**Related Resource**: [Project page](https://interactiveasr.github.io/), [Live demo](https://i-asr.sjtuxlance.com/)

- We propose $S^2ER$, a metric that leverages LLMs-as-judges to assess ASR semantic success.
- We develop an LLM-simulated interactive correction framework to iteratively improve ASR performance.

</div>
</div>

<span class='anchor' id='honors-awards'></span>
## Honors and Awards

- *2025.10*: **National Scholarship**
- *2025.10*: Outstanding Student, Xi'an Jiaotong University
- *2024.11*: **Shuiyou** First-Class Scholarship (Top 4 in university)
- *2024.11*: Outstanding Student, Xi'an Jiaotong University
- *2023.11*: Third-Class Scholarship, Xi'an Jiaotong University

<span class='anchor' id='competitions'></span>
## Competitions

### AI Competitions
- *2025*: **Second Prize**, National Laser Radar Conference Point Cloud Intelligent Analysis Competition
- *2025*: **Silver Medal**, ICPC Shaanxi Provincial Programming Contest
- *2025*: **Excellence Award** (Finalist), AI+ College Innovation Program, AI Technology Track
- *2024*: **Bronze Medal**, ICPC Shaanxi Provincial Programming Contest

### Math Modeling
- *2023-2025*: **3x First Prize**, National College Student Mathematical Modeling Competition (Shaanxi Division)
- *2024*: **Meritorious Winner**, Mathematical Contest in Modeling (MCM), USA
- *2023*: **Honorable Prize**, Mathematical Contest in Modeling (MCM), USA

<span class='anchor' id='educations'></span>
## Educations

- *2023.09 - now*: Artificial Intelligence Experimental Class, Xi'an Jiaotong University (Outstanding Talent Program)
- *2021.09 - now*: Young Gifted Program

<span class='anchor' id='internships'></span>
## Internships

- Xi'an Jiaotong University, Associate Professor Xiangyong Cao's Research Group (Mentor: Xiangyong Cao)
- Shanghai Jiao Tong University, X-LANCE Lab (Mentor: Xie Chen)

<script>
  const emailText = document.getElementById('emailText');

  if (emailText) {
    emailText.addEventListener('click', function () {
      const email = this.getAttribute('data-email');
      navigator.clipboard.writeText(email).then(() => {
        const originalText = this.textContent;
        this.textContent = 'Copied';
        this.classList.add('copied');

        setTimeout(() => {
          this.textContent = originalText;
          this.classList.remove('copied');
        }, 1600);
      }).catch(() => {
        alert('Copy failed, please copy manually: ' + email);
      });
    });
  }
</script>
