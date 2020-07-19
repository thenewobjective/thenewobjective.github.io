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
    {% comment %} minus 1 to exclude index post {% endcomment %}
    {% assign category_size = category[1].size | minus: 1 %}
    {% if category_size > 0 %}
<details>
        <summary>{{ category[0] }}&nbsp;({{ category_size }})</summary>
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
