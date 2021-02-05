---
# Jekyll Processing
# <https://en.wikipedia.org/wiki/Most_common_words_in_English>
stop_words:
  - the
  - be
  - to
  - of
  - and
  - a
  - in
  - that
  - have
  - i
  - it
  - for
  - not
  - on
  - with
exclude_urls:
  - '/demos/coin-flip.html'
  - '/demos/css-bubbles.html'
  - '/demos/disk-collisions.html'
  - '/demos/spinner-bubbles.html'
  - '/css/main.css'
  - '/search.xml'
  - '/redirects.json'
  - '/sitemap.xml'
  - '/feed.xml'
  - '/css/main.css.map'
---

{% assign ps = site.posts | concat: site.pages %}
{% assign empty_array = "" | split: ',' %}

class Index extends Map {
    upsert(token, url) {
        this.set(token,(this.get(token) ?? []).concat(url))
    }
}

const i = new Index()
let url

{% for p in ps %}
  {% unless page.exclude_urls contains p.url %}
  {% unless p.exclude_from_search == true %}
url = '{{p.url}}'
    {% assign title_tokens = p.title | slugify | split: '-' %}
    {% assign p_html = p.content | strip_html | strip %}
    {% unless p_html == '' %}
      {% assign content_tokens = p_html | slugify | split: '-' %}
      {% assign content_tokens = content_tokens | concat: title_tokens %}
      {% assign content_tokens = content_tokens | uniq %}
      {% for t in content_tokens %}
         {% unless page.stop_words contains t %}
i.upsert('{{t}}',url)
         {%comment%} group_by {% endcomment%}
          {% endunless %}
      {% endfor %}
    {% endunless %}
  {% endunless %}
  {% endunless %}
{% endfor %}
{%comment%} stemming could be done, but won't be as it's overkill {% endcomment%}

export default i