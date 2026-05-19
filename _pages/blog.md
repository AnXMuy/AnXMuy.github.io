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
    Notes on research, engineering, and experiments. The sidebar stays the same;
    this page is a dedicated content canvas built with editable block cards.
  </p>
</div>

<div class="blog-grid">
  {% for post in site.data.blog_posts %}
  <article class="blog-card page-reveal">
    <p class="blog-card__meta">{{ post.date }} · {{ post.category }}</p>
    {% if post.image %}
    <div class="blog-card__image-wrap">
      <img src="{{ post.image }}" alt="{{ post.title }}" class="blog-card__image">
    </div>
    {% endif %}
    <h2>{{ post.title }}</h2>
    <p>{{ post.summary }}</p>
    <a href="{{ post.url }}" class="blog-card__link">{{ post.cta }}</a>
  </article>
  {% endfor %}
</div>
