---
permalink: /
title: ""
excerpt: ""
author_profile: false
lang: en
redirect_from:
  - /about/
  - /about.html
---

<section class="minimal-card minimal-hero page-reveal">
  <div class="minimal-hero__content">
    <p class="minimal-kicker">Undergraduate Researcher</p>
    <h1 class="minimal-hero__name">Zixuan Jiang (Andrew)</h1>
    <p class="minimal-hero__identity">
      College of Artificial Intelligence, Xi'an Jiaotong University
    </p>
    <p class="minimal-hero__about">
      I am an undergraduate researcher at
      <a href="http://www.aiar.xjtu.edu.cn/">Xi'an Jiaotong University</a>
      and a member of the
      <a href="https://baike.baidu.com/item/%E8%A5%BF%E5%AE%89%E4%BA%A4%E9%80%9A%E5%A4%A7%E5%AD%A6%E5%B0%91%E5%B9%B4%E7%8F%AD/58501505">Young Gifted Program</a>.
      My current work focuses on multimodal intelligence across vision, speech, language, and human-computer interaction.
    </p>
    <div class="links">
      <a class="pill-link" href="/images/CV.pdf">CV</a>
      <a class="pill-link" href="https://scholar.google.com/citations?user=hu8iqsMAAAAJ" target="_blank" rel="noopener noreferrer">Google Scholar</a>
      <a class="pill-link" href="https://github.com/AnXMuy" target="_blank" rel="noopener noreferrer">GitHub</a>
      <a class="pill-link" href="/blog/" data-page-transition="slide-left">Posts &amp; Notes</a>
      <span class="pill-link pill-link--action hero-email" id="emailText" data-email="andrewjiang@stu.xjtu.edu.cn" title="Click to copy email">Copy Email</span>
    </div>
  </div>
  <div class="minimal-hero__photo-wrap">
    <img src="/images/prof_pic.png" alt="Zixuan Jiang profile photo" class="minimal-hero__photo">
  </div>
</section>

<section class="minimal-card page-reveal" id="educations">
  <h2>Education</h2>
  <ul class="timeline-list">
    <li><span class="timeline-date">2023.09 - Present</span><span class="timeline-content">Artificial Intelligence Experimental Class, Xi'an Jiaotong University (人工智能实验班-卓越人才计划)</span></li>
    <li><span class="timeline-date">2021.09 - Present</span><span class="timeline-content">Young Gifted Program (少年班), Xi'an Jiaotong University</span></li>
  </ul>
</section>

<section class="minimal-card page-reveal" id="internships">
  <h2>Research Experience</h2>
  <ul class="timeline-list">
    <li><span class="timeline-date">Xi'an Jiaotong University</span><span class="timeline-content">School of Computer Science and Technology, Faculty of Electronic and Information Engineering (Mentor: Xiangyong Cao)</span></li>
    <li><span class="timeline-date">Shanghai Jiao Tong University</span><span class="timeline-content">X-LANCE Lab (Mentor: Xie Chen)</span></li>
  </ul>
</section>

<section class="minimal-card page-reveal" id="recent-notes">
  <h2>Recent Posts &amp; Notes</h2>
  <p class="section-note">Short research logs and engineering notes, each maintained as an independent Markdown file.</p>
  {% assign recent_posts = site.blog_posts | sort: "date" | reverse %}
  <ul class="minimal-post-list">
    {% for post in recent_posts limit: 4 %}
    <li>
      <a href="{{ post.url | relative_url }}" data-page-transition="slide-left">{{ post.title }}</a>
      <span class="minimal-post-meta">{{ post.date | date: "%Y-%m-%d" }}{% if post.category %} · {{ post.category }}{% endif %}</span>
    </li>
    {% endfor %}
  </ul>
  <p class="minimal-more-link"><a href="/blog/" data-page-transition="slide-left">Browse all posts</a></p>
</section>
