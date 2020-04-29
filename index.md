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
{% if category[0] != "Software Rendering" %}
<details>
    {% comment %} minus 1 to exclude index post {% endcomment %}
    {% assign category_size = category[1].size | minus: 1 %}
        <summary>{{ category[0] }} ({{ category_size }})</summary>
        <ul>
            {% for post in category[1] reversed %}
            {% if post.title != 'Index' %}
            <li><a href='{{ post.url }}'>{{ post.title }}</a></li>
            {% endif %}
            {% endfor %}
        </ul>
</details>
{% endif %}
{% endfor %}
