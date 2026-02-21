// https://nuxt.com/docs/api/configuration/nuxt-config

// Tagged template that collapses indented lines into a single CSP string
const csp = ([template = '']: TemplateStringsArray): string =>
    template.split('\n').map(s => s.trim()).filter(Boolean).join(' ')

export default defineNuxtConfig({
  modules: [
    // https://nuxt.com/modules/robots
    '@nuxtjs/robots',
    // https://www.npmjs.com/package/@barzhsieh/nuxt-content-mermaid
    '@barzhsieh/nuxt-content-mermaid',
    // https://content.nuxt.com/docs/getting-started
    '@nuxt/content',
    // https://nuxt.com/modules/eslint
    '@nuxt/eslint',
    // https://ui.nuxt.com/
    '@nuxt/ui',
    // https://nuxt.com/modules/sitemap
    '@nuxtjs/sitemap',
    // https://nuxt.com/modules/nuxt-feedme
    'nuxt-feedme'
  ],
  ssr: true,
  devtools: {
    enabled: process.env.NODE_ENV === 'development'
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en-US'
      },
      meta: [
        {
          'http-equiv': 'Content-Security-Policy',
          'content': csp`
            default-src 'self' ;
            script-src 'self' 'unsafe-eval' ;
            script-src-elem 'self' 'unsafe-inline' https://giscus.app/client.js ;
            connect-src 'self' https://api.github.com https://api.iconify.design ;
            style-src 'self' 'unsafe-inline' https://giscus.app/default.css ;
            frame-src 'self' https://www.youtube.com https://codepen.io https://archive.org/ https://giscus.app/ ;
            img-src 'self' data: https://avatars.githubusercontent.com https://mermaid.ink https://api.iconify.design https://storage.ko-fi.com
          `
        },
        { 'http-equiv': 'X-Frame-Options', 'content': 'SAMEORIGIN' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site', content: 'https://thenewobjective.com' },
        { name: 'referrer', content: 'strict-origin-when-cross-origin' },
        { name: 'robots', content: 'noai, noimageai' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/images/icons/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/images/icons/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/images/icons/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/images/icons/favicon-16x16.png' },
        { rel: 'manifest', href: '/images/icons/site.webmanifest' },
        { rel: 'search', href: '/search.xml', type: 'application/opensearchdescription+xml', title: 'The New Objective' },
        { rel: 'alternate', type: 'application/rss+xml', title: 'The New Objective', href: '/feed.xml' },
        { type: 'text/plain', rel: 'author', href: '/humans.txt' }
      ]
    }
  },
  css: ['~/assets/css/main.css'],
  site: {
    url: 'https://thenewobjective.com',
    title: 'The New Objective'
  },
  colorMode: {
    preference: 'dark'
  },
  content: {
    experimental: {
      nativeSqlite: true
    },
    build: {
      markdown: {
        highlight: {
          theme: 'github-dark',
          langs: [
            'json', 'js', 'ts', 'html', 'css', 'vue', 'shell', 'mdc', 'md', 'yaml', 'java',
            'raku', 'julia', 'scheme', 'haskell', 'perl'
          ]
        },
        // https://www.koungmeng.com/blogs/write-math-equations-in-nuxt-content-markdown
        remarkPlugins: {
          'remark-math': {}
        },
        rehypePlugins: {
          'rehype-mathjax': {}
        }
      }
    }
  },
  routeRules: {
    // Redirects from old site structure
    '/playing-with-the-drake-equation/': { redirect: '/astrobiology/playing-with-the-drake-equation/' },
    '/category/astrobiology/': { redirect: '/astrobiology/' },
    '/dreaming-an-ocean-of-code/': { redirect: '/dreamwork/dreaming-an-ocean-of-code/' },
    '/a-shamanic-ordeal/': { redirect: '/dreamwork/a-shamanic-ordeal/' },
    '/symbolic-candle/': { redirect: '/dreamwork/symbolic-candle/' },
    '/watching-free-will/': { redirect: '/dreamwork/watching-free-will/' },
    '/mindscape/dreaming-an-ocean-of-code': { redirect: '/dreamwork/dreaming-an-ocean-of-code/' },
    '/mindscape/rediscovering-the-self': { redirect: '/dreamwork/rediscovering-the-self/' },
    '/rediscovering-the-self/': { redirect: '/dreamwork/rediscovering-the-self/' },
    '/dreamwork/2019/06/02/rediscovering-the-self.html': { redirect: '/dreamwork/rediscovering-the-self/' },
    '/mindscape/symbolic-candle': { redirect: '/dreamwork/symbolic-candle/' },
    '/mindscape/a-shamanic-ordeal': { redirect: '/dreamwork/a-shamanic-ordeal/' },
    '/mindscape/watching-free-will': { redirect: '/dreamwork/watching-free-will/' },
    '/mindscape/visions-of-revelation': { redirect: '/dreamwork/visions-of-revelation/' },
    '/mindscape/bas-ga': { redirect: '/dreamwork/bas-ga/' },
    '/mindscape/an-encounter-with-the-anima': { redirect: '/dreamwork/an-encounter-with-the-anima/' },
    '/has-nature-ended/': { redirect: '/humanity-vs-nature/has-nature-ended/' },
    '/picher-and-cardin/': { redirect: '/humanity-vs-nature/picher-and-cardin/' },
    '/the-end-of-nature-by-bill-mckibben/': { redirect: '/humanity-vs-nature/the-end-of-nature-by-bill-mckibben/' },
    '/the-future-of-nature/': { redirect: '/humanity-vs-nature/the-future-of-nature/' },
    '/the-idea-of-nature/': { redirect: '/humanity-vs-nature/the-idea-of-nature/' },
    '/kindling/': { redirect: '/mindscape/kindling/' },
    '/re-centering/': { redirect: '/mindscape/re-centering/' },
    '/auditory-illusions/': { redirect: '/music/auditory-illusions/' },
    '/the-effectiveness-of-digital-music-recording/': { redirect: '/music/the-effectiveness-of-digital-music-recording/' },
    '/category/requirements-engineering/': { redirect: '/requirements-engineering/' },
    '/leaky-abstractions-are-just-bad-abstractions/': { redirect: '/requirements-engineering/leaky-abstractions-are-just-bad-abstractions/' },
    '/category/social-issues/': { redirect: '/social-issues/' },
    '/euphemisms/': { redirect: '/social-issues/euphemisms/' },
    '/the-necessity-of-national-language/': { redirect: '/social-issues/the-necessity-of-national-language/' },
    '/category/software-systems-engineering/': { redirect: '/software-systems-engineering/' },
    '/software-systems-engineering/entity-framework-and-database-projects': { redirect: '/software-systems-engineering/the-center-of-an-application-ef-and-databases/' },
    '/migrating-from-namecheap-to-azure/': { redirect: '/system-administration/migrating-from-namecheap-to-azure/' },
    '/dynamic-programming-for-great-justice/': { redirect: '/types-and-programming-languages/dynamic-programming-for-great-justice/' },
    '/overview-of-prefix-vs-postfix-notations-evaluation-schemes/': { redirect: '/types-and-programming-languages/overview-of-prefix-vs-postfix-notations-evaluation-schemes/' },
    '/category/uncategorized/': { redirect: '/uncategorized/' },
    '/category/usmc/': { redirect: '/usmc/' },
    '/letters-of-support/': { redirect: '/usmc/letters-of-support/' },
    '/category/war-and-peace/': { redirect: '/war-and-peace/' },
    '/call-of-duty/': { redirect: '/war-and-peace/call-of-duty/' },
    '/the-broken-line/': { redirect: '/war-and-peace/the-broken-line/' },
    '/a-culture-of-war/': { redirect: '/war-and-peace/a-culture-of-war/' },
    '/brkics-stillness/': { redirect: '/war-and-peace/brkics-stillness/' },
    '/category/web-development/': { redirect: '/web-development/' },
    '/a-criticism-of-web-components': { redirect: '/web-development/a-criticism-of-web-components/' },
    '/a-criticism-of-web-components/': { redirect: '/web-development/a-criticism-of-web-components/' },
    '/the-great-maze-of-jquery': { redirect: '/web-development/the-great-maze-of-jquery/' },
    '/the-great-maze-of-jquery/': { redirect: '/web-development/the-great-maze-of-jquery/' },
    '/css-grid-with-detail-view/': { redirect: '/web-development/css-grid-with-detail-view/' },
    '/use-strict-convo/': { redirect: '/web-development/use-strict-convo/' },
    '/ramda-and-eweda-before-the-dawn/': { redirect: '/web-development/ramda-and-eweda-before-the-dawn/' },
    '/mindscape/sehnsucht': { redirect: '/dreamwork/sehnsucht/' },
    '/about-me/': { redirect: '/about/' }
  },
  experimental: {
    // This is very slow when enabled
    // https://nuxt.com/docs/4.x/getting-started/transitions#view-transitions-api-experimental
    viewTransition: false,
    defaults: {
      nuxtLink: {
        externalRelAttribute: 'noopener'
      }
    }
  },
  compatibilityDate: '2025-07-15',
  typescript: {
    typeCheck: true
  },
  feedme: {
    defaults: {
      common: false
    },
    feeds: {
      common: {
        revisit: '6h',
        fixDateFields: true,
        feed: {
          title: 'The New Objective Feed',
          description: 'A feed of the latest content from The New Objective.',
          link: 'https://thenewobjective.com',
          copyright: `Copyright © 2001 - ${new Date().getFullYear()} Michael L Haufe. All Rights Reserved.`,
          image: 'https://thenewobjective.com/images/icons/icon.png'
        },
        collections: ['content'],
        templateMapping: ['', 'meta', 'meta.feedme'],
        mapping: [
          ['link', 'path']
        ]
      }
    }
  },
  robots: {
    blockAiBots: true,
    blockNonSeoBots: true,
    groups: [
      {
        // 'https://neil-clarke.com/block-the-bots-that-feed-ai-models-by-scraping-your-website/'
        userAgent: [
          'AI2Bot',
          'Applebot-Extended',
          'Bytespider',
          'CCBot',
          'ChatGPT-User',
          'ClaudeBot',
          'DuckAssistBot',
          'Diffbot',
          'FacebookBot',
          'GPTBot',
          'Google-CloudVertexBot',
          'Google-Extended',
          'ImagesiftBot',
          'Kangaroo Bot',
          'Meta-ExternalAgent',
          'Meta-ExternalFetcher',
          'Omgili',
          'Omgilibot',
          'PanguBot',
          'PerplexityBot',
          'Timpibot',
          'Webzio-Extended',
          'YouBot',
          'anthropic-ai',
          'cohere-ai',
          'cohere-training-data-crawler'
        ],
        disallow: ['/']
      }
    ]
  }

})
