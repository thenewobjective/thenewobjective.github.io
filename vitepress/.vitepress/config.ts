import { defineConfig } from 'vitepress'

const siteTitle = "The New Objective"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: siteTitle,
  description: "Ars longa, vita brevis",
  lastUpdated: true,
  head: [
    ['meta', { name: 'referrer', content: 'strict-origin-when-cross-origin' }],
    ['meta', { name: 'robots', content: 'noai, noimageai' }],
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/images/icons/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/images/icons/apple-touch-icon.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/images/icons/favicon-32x32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/images/icons/favicon-16x16.png' }],
    ['link', { rel: 'manifest', href: '/images/icons/site.webmanifest' }],
    ['link', { rel: 'search', href: '/search.xml', type: 'application/opensearchdescription+xml', title: siteTitle }],
    ['link', { type: 'text/plain', rel: 'author', href: '/humans.txt' }],
  ],
  sitemap: {
    hostname: 'https://thenewobjective.com'
  },
  themeConfig: {
    search: {
      provider: 'local'
    },

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Resume', link: '/resume/' },
      { text: 'Publications', link: '/publications/' },
      { text: 'Connect', link: '/connect/' },
      { text: 'About', link: '/about/' }
    ],

    sidebar: [
      {
        text: '...',
        items: [
          // { text: 'Markdown Examples', link: '/markdown-examples' },
          // { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/mlhaufe' },
      { icon: 'x', link: 'https://x.com/mlhaufe'},
      { icon: 'mastodon', link: 'https://mastodon.social/@mlhaufe'},
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/michaelhaufe'},
      { icon: 'instagram', link: 'https://www.instagram.com/mlhaufe/'}
    ],

    footer: {
      copyright: `Copyright © 2001 - ${new Date().getFullYear()} Michael L Haufe. All Rights Reserved.`,
      message: '<a href="/privacy-policy">Privacy Policy</a>'
    }
  }
})
