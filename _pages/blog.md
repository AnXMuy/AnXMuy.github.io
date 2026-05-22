---
permalink: /blog/
title: "Blog"
excerpt: "Thoughts, notes, and builds."
author_profile: true
lang: en
---

<div class="blog-hero page-reveal">
  <p class="blog-kicker">Writing and Building</p>
  <h1>Blog</h1>
  <p>
    Notes on research, engineering, and experiments. Add new posts by creating
    Markdown files under <code>_blog_posts/</code>; this page routes to them automatically.
  </p>
</div>

<div class="blog-grid">
  {% assign blog_posts = site.blog_posts | sort: "date" | reverse %}
  {% for post in blog_posts %}
  <article class="blog-card page-reveal">
    <p class="blog-card__meta">{{ post.date | date: "%b %Y" }} · {{ post.category }}</p>
    {% if post.image %}
    <div class="blog-card__image-wrap">
      <img src="{{ post.image }}" alt="{{ post.title }}" class="blog-card__image">
    </div>
    {% endif %}
    <h2>{{ post.title }}</h2>
    <p>{{ post.summary | default: post.excerpt | strip_html | strip }}</p>
    <a href="{{ post.url | relative_url }}" class="blog-card__link">{{ post.cta | default: "Read Article" }}</a>
  </article>
  {% endfor %}
</div>
