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
    :root {
        --primary: #1f3b73;
        --primary-light: #eef4ff;
        --primary-soft: #f7faff;
        --text-main: #243447;
        --text-dark: #1f2937;
        --text-light: #5b6678;
        --border: #e6ebf2;
        --shadow: 0 8px 28px rgba(31, 45, 61, 0.06);
        --radius-lg: 22px;
        --radius-md: 16px;
        --radius-sm: 12px;
    }

    .page__content {
        font-size: 16px;
        line-height: 1.9;
        color: var(--text-main);
    }

    .page__content p,
    .page__content li {
        line-height: 1.9;
    }

    .page__content a {
        color: var(--primary);
        text-decoration: none;
        transition: all 0.2s ease;
    }

    .page__content a:hover {
        color: #2b5bb3;
        text-decoration: underline;
    }

    .page__content h1,
    .page__content h2,
    .page__content h3 {
        color: var(--text-dark);
        letter-spacing: -0.01em;
    }

    .page__content h1 {
        margin-top: 0.2rem;
        margin-bottom: 1rem;
        font-size: 2rem;
    }

    .page__content h2 {
        margin-top: 2rem;
        margin-bottom: 1rem;
        font-size: 1.35rem;
    }

    .page__content h3 {
        margin-top: 1.25rem;
        margin-bottom: 0.75rem;
        font-size: 1.08rem;
    }

    hr {
        border: none;
        border-top: 1px solid var(--border);
        margin: 2rem 0;
    }

    /* 通用 section 卡片化 */
    #about-me + h1,
    #about-me + h1 + p,
    #about-me + h1 + p + p {
        position: relative;
    }

    h1 {
        padding-top: 2px;
    }

    h1 + p,
    h1 + ul,
    h2 + ul,
    h3 + ul {
        margin-top: 0.6rem;
    }

    /* About Me 首屏 */
    #about-me + h1,
    #about-me + h1 + p,
    #about-me + h1 + p + p {
        z-index: 1;
    }

    #about-me ~ h1:first-of-type,
    #about-me ~ p:first-of-type {
        position: relative;
    }

    .page__content > h1:first-of-type,
    .page__content > span.anchor + h1 {
        margin-top: 0;
    }

    .page__content > span.anchor + h1,
    .page__content > span.anchor + h1 + p,
    .page__content > span.anchor + h1 + p + p {
        background: linear-gradient(135deg, #f8fbff 0%, #f5f8fd 100%);
    }

    .page__content > span.anchor + h1 {
        padding: 26px 28px 0 28px;
        border: 1px solid var(--border);
        border-bottom: none;
        border-radius: var(--radius-lg) var(--radius-lg) 0 0;
        box-shadow: var(--shadow);
        margin-bottom: 0;
    }

    .page__content > span.anchor + h1 + p {
        padding: 10px 28px 0 28px;
        margin-top: 0;
        margin-bottom: 0;
        border-left: 1px solid var(--border);
        border-right: 1px solid var(--border);
    }

    .page__content > span.anchor + h1 + p + p {
        padding: 12px 28px 24px 28px;
        margin-top: 0;
        border-left: 1px solid var(--border);
        border-right: 1px solid var(--border);
        border-bottom: 1px solid var(--border);
        border-radius: 0 0 var(--radius-lg) var(--radius-lg);
        box-shadow: var(--shadow);
        margin-bottom: 2rem;
    }

    /* Section 标题风格 */
    .page__content > h1:not(:first-of-type) {
        margin-top: 2.2rem;
        margin-bottom: 1rem;
        padding-left: 2px;
    }

    /* 列表统一 */
    .page__content ul {
        margin-left: 0.4rem;
        padding-left: 1.2rem;
    }

    .page__content ul li {
        margin-bottom: 0.7rem;
    }

    /* News / Awards / Education / Internships 卡片块 */
    .page__content > h1 + ul,
    .page__content > h1 + div + ul,
    .page__content > h2 + ul {
        margin-top: 0.75rem;
    }

    /* 通过 section 后面的内容块做轻卡片 */
    #about-me ~ h1:nth-of-type(2) + ul,
    #about-me ~ h1:nth-of-type(4) + ul,
    #about-me ~ h1:nth-of-type(5) + h2 + ul,
    #about-me ~ h1:nth-of-type(5) + h2 + ul + h2 + ul,
    #about-me ~ h1:nth-of-type(6) + ul,
    #about-me ~ h1:nth-of-type(7) + ul {
        background: #ffffff;
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        padding: 18px 24px 18px 34px;
        box-shadow: var(--shadow);
    }

    /* 如果 nth-of-type 因模板不同不稳定，兜底给所有紧跟 h1 的 ul 加统一观感 */
    .page__content > h1 + ul {
        background: #ffffff;
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        padding: 18px 24px 18px 34px;
        box-shadow: var(--shadow);
    }

    /* Competitions 内部两个子块 */
    .page__content > h1 + h2 {
        margin-top: 1rem;
        padding: 14px 18px 0 18px;
        background: #ffffff;
        border: 1px solid var(--border);
        border-bottom: none;
        border-radius: var(--radius-lg) var(--radius-lg) 0 0;
        box-shadow: var(--shadow);
    }

    .page__content > h1 + h2 + ul {
        margin-top: 0;
        padding: 4px 24px 18px 34px;
        background: #ffffff;
        border: 1px solid var(--border);
        border-top: none;
        border-radius: 0 0 var(--radius-lg) var(--radius-lg);
        box-shadow: var(--shadow);
    }

    .page__content > h1 + h2 + ul + h2 {
        margin-top: 1rem;
        padding: 14px 18px 0 18px;
        background: #ffffff;
        border: 1px solid var(--border);
        border-bottom: none;
        border-radius: var(--radius-lg) var(--radius-lg) 0 0;
        box-shadow: var(--shadow);
    }

    .page__content > h1 + h2 + ul + h2 + ul {
        margin-top: 0;
        padding: 4px 24px 18px 34px;
        background: #ffffff;
        border: 1px solid var(--border);
        border-top: none;
        border-radius: 0 0 var(--radius-lg) var(--radius-lg);
        box-shadow: var(--shadow);
    }

    /* paper box 美化 */
    .paper-box {
        display: flex;
        gap: 20px;
        align-items: flex-start;
        padding: 18px;
        margin: 1rem 0 1.2rem 0;
        background: #ffffff;
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow);
    }

    .paper-box-image {
        flex: 0 0 240px;
    }

    .paper-box-image img {
        width: 100%;
        border-radius: 14px;
        border: 1px solid #edf2f7;
        display: block;
    }

    .paper-box-text {
        flex: 1;
        min-width: 0;
        font-size: 0.98rem;
    }

    .paper-box-text p:first-child a {
        font-size: 1.08rem;
        font-weight: 800;
        color: var(--text-dark);
    }

    .paper-box-text p:first-child a:hover {
        color: var(--primary);
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

    /* 第二篇 publication 也包出一点层次 */
    .paper-box + ul,
    .paper-box + p,
    .paper-box + li {
        margin-top: 0.8rem;
    }

    .page__content > p:has(> a[href*="2508.18067"]) {
        background: #ffffff;
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        padding: 16px 18px;
        box-shadow: 0 6px 22px rgba(31, 45, 61, 0.04);
    }

    /* 邮件文本链接样式 */
    .copy-email-text {
        display: inline-flex;
        align-items: center;
        padding: 6px 12px;
        border-radius: 999px;
        background: #ffffff;
        border: 1px solid #dbe5f1;
        color: #2563eb;
        cursor: pointer;
        font-weight: 700;
        transition: all 0.25s ease;
        box-shadow: 0 2px 8px rgba(31, 45, 61, 0.04);
    }

    .copy-email-text:hover {
        text-decoration: none;
        color: #1d4ed8;
        background: #eef5ff;
        border-color: #c9daf7;
        transform: translateY(-1px);
    }

    /* resume 链接也更像按钮 */
    .page__content em a[href*="CV.pdf"],
    .page__content a[href*="CV.pdf"] {
        font-weight: 600;
    }

    /* 强调粗体更柔和 */
    .page__content strong {
        color: var(--text-dark);
    }

    /* 移动端 */
    @media (max-width: 900px) {
        .paper-box {
            flex-direction: column;
        }

        .paper-box-image {
            width: 100%;
            flex: none;
        }
    }

    @media (max-width: 768px) {
        .page__content {
            font-size: 15.5px;
        }

        .page__content > span.anchor + h1 {
            padding: 22px 18px 0 18px;
        }

        .page__content > span.anchor + h1 + p {
            padding: 10px 18px 0 18px;
        }

        .page__content > span.anchor + h1 + p + p {
            padding: 12px 18px 20px 18px;
        }

        .page__content > h1 + ul,
        .page__content > h1 + h2 + ul,
        .page__content > h1 + h2 + ul + h2 + ul {
            padding: 14px 18px 14px 28px;
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

# 👋 About Me

I'm currently an undergraduate student with the [College of Artificial Intelligence](http://www.aiar.xjtu.edu.cn/), [Xi’an Jiaotong University](https://www.xjtu.edu.cn/). Meanwhile, I have been a student of the **[Young Gifted Program](https://baike.baidu.com/item/%E8%A5%BF%E5%AE%89%E4%BA%A4%E9%80%9A%E5%A4%A7%E5%AD%A6%E5%B0%91%E5%B9%B4%E7%8F%AD/58501505)** at Xi 'an Jiaotong University since 2021

**Ask Me Anything Through** <span class="copy-email-text" id="emailText" data-email="andrewjiang@stu.xjtu.edu.cn" title="Click to copy email">Email</span>! [_View my resume_](images/CV.pdf)

# 🔥 News

- *2025.12*: &nbsp;🔥🔥 Receive a pre-admission offer from [Shanghai Innovation Institute](https://www.sii.edu.cn/) through the 2026 Golden Autumn Camp! 
- *2025.10*: &nbsp;🔥🔥 The **National Scholarship** has been confirmed! 
- *2025.10*: &nbsp;🎉🎉 **DescribeEarth** has been **open-source**! The code is available @ [github](https://github.com/earth-insights/DescribeEarth)
- *2025.09*: &nbsp;🎉🎉 **DescribeEarth** has been public on [arxiv](https://arxiv.org/abs/2509.25654)

# 📝 Publications 

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">arxiv 2025</div><img src='images/describeearth.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[DescribeEarth: Describe Anything for Remote Sensing Images](https://arxiv.org/abs/2509.25654)

Kaiyu Li\*, **Zixuan Jiang\***, Xiangyong Cao☨, Jiayu Wang, Yuchen Xiao, Deyu Meng, Zhi Wang

**Open-source**: [code](https://github.com/earth-insights/DescribeEarth), [dataset](https://huggingface.co/datasets/earth-insights/DE-Dataset), [benchmark](https://huggingface.co/datasets/earth-insights/DE-Benchmark)

- We introduce geo-spatial detailed localized captioning.
- We build the first describe anything model in remote sensing.
- We release the related dataset and benchmark.

**Media Courage**: [遥感与深度学习](https://mp.weixin.qq.com/s/qhFIZ6QMmikZ9L7q3cKFaw), [码科智能](https://mp.weixin.qq.com/s/FjmlKo0EkEzXhAk82AdeFQ), [CV炼丹术](https://mp.weixin.qq.com/s/LfGuwxEoIwpEOZXAi6w0fg)
</div>
</div>

- [Annotation-Free Open-Vocabulary Segmentation for Remote-Sensing Images](https://arxiv.org/abs/2508.18067), Kaiyu Li, Xiangyong Cao☨, Ruixun Liu, Shihong Wang, **Zixuan Jiang**, Zhi Wang, Deyu Meng, **Arxiv 2025**

# 🎖 Honors and Awards

- *2025.10* **National Scholarship**
- *2025.10* "Outstanding Student", Xi'an Jiaotong University
- *2024.11* “**Shuiyou**” First-Class Scholarship (**Top 4** students in university)
- *2024.11* "Outstanding Student", Xi'an Jiaotong University
- *2023.11* Third-Class Scholarship, Xi'an Jiaotong University

# 🏆 Competitions

## ✨ AI Competitions

- *2025* **Second Prize**, The 9th National Laser Radar Conference Point Cloud Intelligent Analysis Competition "Extraction and Vectorization of Urban Road Lane Lines" Competition
- *2025* **Silver Medal**, ICPC Shaanxi Provincial Programming Contest
- *2025* **Excellence Award** (Finalist, **sole team from Northwest China**), AI+ College Innovation Program, AI Technology Track
- *2024* **Bronze Medal**, ICPC Shaanxi Provincial Programming Contest

## 📐 Math Modeling

- *2023~2025* **3 × First Prize**, National College Student Mathematical Modeling Competition (Shaanxi Division)
- *2024* **Meritorious Winner**, Mathematical Contest in Modeling (MCM), USA
- *2023* **Honorable Prize**, Mathematical Contest in Modeling (MCM), USA

# 📖 Educations

- *2023.09 - (now)*, Artificial Intelligence Experimental Class, Xi 'an Jiaotong University (Outstanding Talent Program). 
- *2021.09 - (now)*, Young Gifted Program. 

# 💻 Internships

- Xi'an Jiaotong University, Associate Professor Xiangyong Cao's Research Group, Mentor: Xiangyong Cao
- Shanghai Jiaotong University, X-LANCE Lab, Mentor: Xie Chen

<script>
    const emailText = document.getElementById('emailText');
    
    emailText.addEventListener('click', function() {
        const email = this.getAttribute('data-email');
        
        // 使用 Clipboard API 复制文本
        navigator.clipboard.writeText(email).then(() => {
            // 复制成功
            const originalText = this.textContent;
            
            this.textContent = 'Copied!';
            this.style.color = '#28a745'; // 变成绿色
            this.style.textDecoration = 'none'; // 暂时去掉下划线
            
            // 2秒后恢复原始文本和样式
            setTimeout(() => {
                this.textContent = originalText;
                this.style.color = ''; // 恢复默认颜色（由CSS类控制）
                this.style.textDecoration = ''; // 恢复默认样式
            }, 2000);
            
        }).catch(err => {
            // 复制失败
            console.error('Failed to copy email: ', err);
            alert('复制失败，请手动复制: ' + email);
        });
    });
</script>
