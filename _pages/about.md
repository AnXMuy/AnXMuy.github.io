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
    /* 邮件文本链接样式 */
    .copy-email-text {
        color: #007BFF; /* 蓝色，看起来像链接 */
        cursor: pointer; /* 鼠标悬停时显示为指针 */
        font-weight: bold; /* 字体加粗 */
        transition: color 0.3s ease; /* 颜色变化过渡效果 */
    }

    /* 鼠标悬停效果 */
    .copy-email-text:hover {
        text-decoration: underline; /* 悬停时添加下划线 */
        color: #0056b3; /* 悬停时加深颜色 */
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

**Ask Me Anything Through** <span class="copy-email-text" id="emailText" data-email="andrewjiang@stu.xjtu.edu.cn" title="Click to copy email">Email</span>!

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
- *2023.11- (now)*, **Research Intern** @ Xi'an Jiaotong University, Adviser: Prof. Xiangyong Cao.



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



