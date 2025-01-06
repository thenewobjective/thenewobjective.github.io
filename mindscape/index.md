---
title: Mindscape
category: Index
---

<script lang="ts" setup>
import { data } from '../posts.data.ts'

const posts = data.filter(post => post.frontmatter.category === 'Mindscape')
</script>

<ul>
  <li v-for="post of posts">
      <a :href="post.url">{{ post.frontmatter.title }}</a>
  </li>
</ul>
