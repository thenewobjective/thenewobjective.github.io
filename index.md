---
layout: default
title: "The New Objective"
icon: home
---

## Ars longa, vita brevis

{% for category in site.categories %}
<details>
    <summary>{{ category[0] }} ({{ category[1].size }})</summary>
    <ul>
        {% for post in category[1] %}
        <li><a href="{{ post.url }}">{{ post.title }}</a></li>
        {% endfor %}
    </ul>
</details>
{% endfor %}
