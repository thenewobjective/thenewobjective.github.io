---
layout: post
icon: file-text
title:  "A Vue Obstructed"
date:   2022-08-14 10:00:00 -0600
category: Web Development
permalink: /web-development/a-vue-obstructed
---

I attempted to convert this blog from Jekyll to Vue (Nuxt specifically). I wanted to eliminate server side dependencies to run this website. Sadly I failed to complete the conversion and had to give up the endeavor.

Why did I choose Vue? Among the most popular web frameworks currently in use, Vue's approach to components was closest to the idioms used in defining standard [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components). Sadly that's damning with faint praise given how terrible that standard is. I've written on this in an earlier
[blog post](https://thenewobjective.com/web-development/a-criticism-of-web-components). Additionally, it had some
other useful utility functions that looked applicable to what I wanted to accomplish.

So why did I fail? I wanted to utilize Object-Oriented Programming, TypeScript, and Markdown. This was apparently
a bar way too high for this framework. Here's a short list of documentation you have to dig through just to get started:

- Vue: <https://vuejs.org>
- Vuex: <https://vuex.vuejs.org>
- Nuxt: <https://nuxtjs.org>
- Nuxt/content: <https://content.nuxtjs.org>

And that's BEFORE you attempt to use TypeScript+OOP. There are more to support that:

- <https://typescript.nuxtjs.org/>
- <https://championswimmer.in/vuex-module-decorators/>
- <https://github.com/nuxt-community/nuxt-property-decorator>

And that's not everything. I just got tired of digging. The immaturity and bugs are another thing. Seemingly trivial things are not supported or are awkward. For example, if I want access to the current page title in a component:

```ts
// store/index.js
export const state = {
  pageTitle: 'Default Title'
}

export const mutations = {
  SET_PAGE_TITLE (state, title) {
    state.pageTitle = title
  }
}
```

{%raw%}

```html
<!-- layouts/default.vue -->
<template>
  <h1>{{$store.state.pageTitle}}</h1>
</template>
```

{%endraw%}

```html
<!-- pages/index.vue -->
<template>
  <div></div>
</template>

<script>
export default {
  asyncData ({ req }) {
    return {
      title: `Main Page ${req ? 'server' : 'client'}`
    }
  },
  head () {
    return {
      title: this.title
    }
  },
  mounted () {
    this.$store.commit('SET_PAGE_TITLE', this.title)
  }
}
</script>
```

Yes, you read that right; dozens of lines of code. Surely there is a better approach? You can browse
the [github issue](https://github.com/nuxt/nuxt.js/issues/464) for alternatives. The fact that I would
have to look this up in the first place is damning on its own.

If that's not bad enough images are [not supported](https://gilberttanner.com/blog/creating-a-blog-with-nuxt-content/#gettingimagestowork) in markdown. So build another component as described in the linked article:

```html
<template>
  <img :src="imgSrc()" :alt="alt" />
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    }
  },
  methods: {
    imgSrc() {
      try {
        const { article } = this.$parent;
        return require(`~/content${article.dir}/images/${this.src}`);
      } catch (error) {
        return null
      }
    }
  }
}
</script>
```

So, let's assume you get past all of that and now want to access the front matter of your markdown page. Guess what? You often have to perform an HTTP request to get it. By the way, that's always a POST request and not cached.

I have no idea how I'd get redirects to work properly in parity w/ Jekyll.

While I *think* had a sitemap being generated properly, I never got RSS functional, so I called it quits after dozens of hours.

Oh yeah, I've seen at least four different guides on configuring a simple Store and they are vastly different.

During all of this pain I also had to balance compatibility issues. Downgrade these 3 packages, upgrade these 2
packages, and play a balancing act on what breaks in the latest version and what breaks if you don't upgrade it
enough. The Vue community seems grossly uncoordinated in all of their endeavors. It looked nice on the surface
but take a little deeper look and you see the rot underneath.

Maybe in a few years they'll solve these issues but I've moved on and will likely have to write something from
scratch to accomplish my goals.
