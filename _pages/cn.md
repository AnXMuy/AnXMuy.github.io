---
permalink: /cn/
title: ""
excerpt: ""
author_profile: true
redirect_from: 
  - /cn
---

<!-- 语言切换按钮 (右上角) -->
<div style="text-align: right; margin-bottom: 20px;">
    <a href="/" style="
        display: inline-block;
        padding: 5px 10px;
        color: #333;
        border: 1px solid #ccc;
        border-radius: 5px;
        text-decoration: none;
        font-weight: bold;
        transition: all 0.3s;
    " onmouseover="this.style.backgroundColor='#f0f0f0'" onmouseout="this.style.backgroundColor='transparent'">
        🇺🇸 English
    </a>
</div>

<style>
    /* 邮件文本链接样式 */
    .copy-email-text {
        color: #007BFF;
        cursor: pointer;
        font-weight: bold;
        transition: color 0.3s ease;
    }
    .copy-email-text:hover {
        text-decoration: underline;
        color: #0056b3;
    }
</style>

{% if site.google_scholar_stats_use_cdn %}
{% assign gsDataBaseUrl = "https://cdn.jsdelivr.net/gh/" | append: site.repository | append: "@" %}
{% else %}
{% assign gsDataBaseUrl = "https://raw.githubusercontent.com/" | append: site.repository | append: "/" %}
{% endif %}
{% assign url = gsDataBaseUrl | append: "google-scholar-stats/gs_data_shieldsio.json" %}

<span class='anchor' id='about-me'></span>

# 👋 关于我

我是 [西安交通大学](https://www.xjtu.edu.cn/) [人工智能学院](http://www.aiar.xjtu.edu.cn/) 的在读本科生。同时，我自2021年起进入西安交通大学 **[少年班](https://baike.baidu.com/item/%E8%A5%BF%E5%AE%89%E4%BA%A4%E9%80%9A%E5%A4%A7%E5%AD%A6%E5%B0%91%E5%B9%B4%E7%8F%AD/58501505)** 学习。

**欢迎通过** <span class="copy-email-text" id="emailText" data-email="andrewjiang@stu.xjtu.edu.cn" title="点击复制邮箱">邮件</span> **联系我！**

# 🔥 最新动态

- *2025.12*: &nbsp;🔥🔥 通过2026金秋营获得 [上海创智学院](https://www.sii.edu.cn/) 拟录取offer！
- *2025.10*: &nbsp;🔥🔥 确认获得 **国家奖学金**！
- *2025.10*: &nbsp;🎉🎉 **DescribeEarth** 现已 **开源**！代码详见 [github](https://github.com/earth-insights/DescribeEarth)
- *2025.09*: &nbsp;🎉🎉 **DescribeEarth** 已在 [arxiv](https://arxiv.org/abs/2509.25654) 上公开。

# 📝 发表论文

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">arxiv 2025</div><img src='images/describeearth.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[DescribeEarth: Describe Anything for Remote Sensing Images](https://arxiv.org/abs/2509.25654)

Kaiyu Li\*, **Zixuan Jiang\***, Xiangyong Cao☨, Jiayu Wang, Yuchen Xiao, Deyu Meng, Zhi Wang

**开源资源**: [代码](https://github.com/earth-insights/DescribeEarth), [数据集](https://huggingface.co/datasets/earth-insights/DE-Dataset), [Benchmark](https://huggingface.co/datasets/earth-insights/DE-Benchmark)

- 我们引入了地理空间详细的本地化描述（Captioning）。
- 我们构建了遥感领域的首个 "Describe Anything" 模型。
- 我们发布了相关的数据集和基准测试。

**媒体报道**: [遥感与深度学习](https://mp.weixin.qq.com/s/qhFIZ6QMmikZ9L7q3cKFaw), [码科智能](https://mp.weixin.qq.com/s/FjmlKo0EkEzXhAk82AdeFQ), [CV炼丹术](https://mp.weixin.qq.com/s/LfGuwxEoIwpEOZXAi6w0fg)
</div>
</div>

- [Annotation-Free Open-Vocabulary Segmentation for Remote-Sensing Images](https://arxiv.org/abs/2508.18067), Kaiyu Li, Xiangyong Cao☨, Ruixun Liu, Shihong Wang, **Zixuan Jiang**, Zhi Wang, Deyu Meng, **Arxiv 2025**

# 🎖 荣誉奖项

- *2025.10* **国家奖学金**
- *2025.10* 西安交通大学“优秀学生”
- *2024.11* “**思源**”一等奖学金 (**全校 Top 4**)
- *2024.11* 西安交通大学“优秀学生”
- *2023.11* 西安交通大学三等奖学金

# 🏆 竞赛经历

## ✨ AI 竞赛

- *2025* **二等奖**, 第九届全国激光雷达大会点云智能分析竞赛 “城市道路车道线提取与矢量化” 赛道
- *2025* **银牌**, ICPC 国际大学生程序设计竞赛陕西省邀请赛
- *2025* **优秀奖** (入围决赛, **西北地区唯一入围团队**), AI+ 高校创新计划，AI 技术赛道
- *2024* **铜牌**, ICPC 国际大学生程序设计竞赛陕西省邀请赛

## 📐 数学建模

- *2023~2025* **3 × 一等奖**, 全国大学生数学建模竞赛 (陕西赛区)
- *2024* **Meritorious Winner (一等奖)**, 美国大学生数学建模竞赛 (MCM)
- *2023* **Honorable Mention (二等奖)**, 美国大学生数学建模竞赛 (MCM)

# 📖 教育经历

- *2023.09 - 至今*, 西安交通大学，人工智能试验班 (拔尖人才培养计划)
- *2021.09 - 至今*, 西安交通大学，少年班

# 💻 实习经历


<script>
    const emailText = document.getElementById('emailText');
    if(emailText) {
        emailText.addEventListener('click', function() {
            const email = this.getAttribute('data-email');
            navigator.clipboard.writeText(email).then(() => {
                const originalText = this.textContent;
                this.textContent = '已复制!';
                this.style.color = '#28a745';
                this.style.textDecoration = 'none';
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.color = '';
                    this.style.textDecoration = '';
                }, 2000);
            }).catch(err => {
                alert('复制失败: ' + email);
            });
        });
    }
</script>
