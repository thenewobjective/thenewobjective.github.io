---
layout: default
title: "The New Objective"
nav_title: "Home"
icon: home
nav_order: 0
---

## Ars longa, vita brevis

{% assign sorted_categories = site.categories | sort %}
{% for category in sorted_categories %}
<details>
    <summary>{{ category[0] }} ({{ category[1].size }})</summary>
    <ul>
        {% for post in category[1] %}
        <li><a href="{{ post.url }}">{{ post.title }}</a></li>
        {% endfor %}
    </ul>
</details>
{% endfor %}
