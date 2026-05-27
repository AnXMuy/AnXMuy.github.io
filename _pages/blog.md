---
permalink: /blog/
title: "Blog"
excerpt: "Thoughts, notes, and builds."
author_profile: false
lang: en
---

<section class="minimal-card page-reveal">
  <h1>Posts &amp; Notes</h1>
  <p class="section-note">
    Blog entries are grouped by topic. Each entry opens to an independent Markdown article under
    <code>_blog_posts/</code>.
  </p>

  {% assign blog_posts = site.blog_posts | sort: "date" | reverse %}
  {% assign grouped_posts = blog_posts | group_by: "category" %}

  <div class="minimal-note-grid">
    {% for group in grouped_posts %}
    <article class="minimal-note-card page-reveal">
      <h2>{{ group.name | default: "General Notes" }}</h2>
      <p class="section-note">{{ group.items | size }} post{% if group.items.size != 1 %}s{% endif %}</p>

      <ul class="minimal-post-list">
        {% for post in group.items limit: 4 %}
        <li>
          <a href="{{ post.url | relative_url }}" data-page-transition="slide-left">{{ post.title }}</a>
          <span class="minimal-post-meta">{{ post.date | date: "%Y-%m-%d" }}</span>
        </li>
        {% endfor %}
      </ul>

      {% if group.items.size > 4 %}
      <details>
        <summary>See more {{ group.name | downcase }} posts</summary>
        <ul class="minimal-post-list">
          {% for post in group.items offset: 4 %}
          <li>
            <a href="{{ post.url | relative_url }}" data-page-transition="slide-left">{{ post.title }}</a>
            <span class="minimal-post-meta">{{ post.date | date: "%Y-%m-%d" }}</span>
          </li>
          {% endfor %}
        </ul>
      </details>
      {% endif %}
    </article>
    {% endfor %}
  </div>
</section>
