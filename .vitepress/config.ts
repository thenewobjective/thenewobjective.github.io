import { glob } from 'glob'
import fs from 'fs'
import markdownItFootNote from 'markdown-it-footnote'
import markdownItImageFigures from 'markdown-it-image-figures'
import { createContentLoader, defineConfig, HeadConfig } from 'vitepress'
import { Feed } from 'feed'

const siteTitle = "The New Objective",
  siteDescription = "Ars longa, vita brevis",
  metaDescription = "The New Objective is the personal website of Michael L Haufe.",
  copyright = `Copyright © 2001 - ${new Date().getFullYear()} Michael L Haufe. All Rights Reserved.`,
  hostname = process.env.NODE_ENV === 'production' ? 'https://thenewobjective.com' : 'http://localhost:5173'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: siteTitle,
  base: '/',
  description: siteDescription,
  lastUpdated: true,
  markdown: {
    math: true,
    config(md) {
      md.use(markdownItFootNote);
      md.use(markdownItImageFigures, {
        figcaption: true
      });
    }
  },
  head: [
    ['meta', { 'http-equiv': 'Content-Security-Policy', content: "default-src 'self' ; script-src-elem 'self' 'unsafe-inline' https://giscus.app/client.js ; connect-src 'self' https://api.github.com ; style-src 'self' 'unsafe-inline' https://giscus.app/default.css; frame-src 'self' https://www.youtube.com https://codepen.io https://archive.org/ https://giscus.app/; img-src 'self' data: https://avatars.githubusercontent.com https://mermaid.ink https://api.iconify.design" }],
    // ['meta', { 'http-equiv': 'X-Frame-Options', content: 'SAMEORIGIN' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site', content: hostname }],
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
  sitemap: { hostname },
  transformPageData(pageData) {
    const head: HeadConfig[] = pageData.frontmatter.head ??= []
    const canonicalUrl = `${hostname}/${pageData.relativePath}`
      .replace(/index\.md$/, '')
      .replace(/\.md$/, '.html')

    head.push(['meta', { property: 'og:title', content: pageData.frontmatter.title }])
    head.push(['meta', { property: 'og:description', content: pageData.frontmatter.description ?? metaDescription }])
    head.push(['meta', { name: 'description', content: metaDescription }])
    head.push(['link', { rel: 'canonical', href: canonicalUrl }])
    head.push(['meta', { property: 'og:url', content: canonicalUrl }])
    head.push(['meta', { property: 'og:image', content: `${hostname}${pageData.frontmatter.featuredImage ?? '/images/icons/android-chrome-512x512.png'}` }])
  },
  async buildEnd(siteConfig) {
    const limit = 10

    const feed = new Feed({
      title: siteTitle,
      description: siteDescription,
      id: hostname,
      link: hostname,
      language: 'en-US',
      image: `${hostname}/images/icons/icon.png`,
      favicon: `${hostname}/images/icons/favicon.ico`,
      copyright,
    })

    const posts = (await createContentLoader('**/*.md', {
      excerpt: false,
      render: true
    }).load())
      .filter(post => post.frontmatter.category && post.frontmatter.category !== 'Index')

    posts.sort(
      (a, b) =>
        +new Date(b.frontmatter.date as string) -
        +new Date(a.frontmatter.date as string)
    )

    for (const { url, excerpt, frontmatter, html } of posts.slice(0, limit)) {
      feed.addItem({
        title: frontmatter.title,
        id: `${hostname}${url}`,
        link: `${hostname}${url}`,
        ...(frontmatter.date && { date: new Date(frontmatter.date as string) }),
        description: excerpt,
        content: html,
        author: [{
          name: 'Michael L Haufe',
          email: 'tno@thenewobjective.com',
          link: hostname
        }]
      })
    }

    const feedPath = siteConfig.outDir + '/feed.xml'
    fs.writeFileSync(feedPath, feed.rss2())
  },
  cleanUrls: true,
  themeConfig: {
    logo: '/images/icons/icon.png',
    search: { provider: 'local' },

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Resume', link: '/resume/' },
      { text: 'Publications', link: '/publications/' },
      { text: 'Connect', link: '/connect/' },
      { text: 'About', link: '/about/' }
    ],

    sidebar: generateSideBar(),

    socialLinks: [
      { icon: 'rss', link: '/feed.xml' },
      { icon: 'github', link: 'https://github.com/mlhaufe' },
      { icon: 'x', link: 'https://x.com/mlhaufe' },
      { icon: 'mastodon', link: 'https://mastodon.social/@mlhaufe' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/michaelhaufe' },
      { icon: 'instagram', link: 'https://www.instagram.com/mlhaufe/' }
    ],

    footer: {
      copyright,
      message: '<a href="/privacy-policy">Privacy Policy</a>'
    }
  }
})

function generateSideBar() {
  const mdFiles = glob.sync('./**/*.md', { ignore: 'node_modules/**' })
    .map(file => {
      const frontmatter = fs.readFileSync(file, 'utf8').split('---')[1]

      if (!frontmatter)
        return

      const title = (frontmatter.match(/title: "?([^"\n]+)"?/) ?? [])[1]?.trim(),
        category = (frontmatter.match(/category: (.+)/) ?? [])[1]?.trim(),
        date = (frontmatter.match(/date: ([^\n]+)/) ?? [])[1]?.trim()

      if (!title || !category)
        return

      return {
        title,
        category,
        // the url is the parent directory of the file
        // the current path format is 'category-folder\\page-folder\\index.md'
        url: '/' + file.split('\\').slice(0, -1).join('/'),
        date: new Date(date)
      }
    }).filter(Boolean) as Array<{ title: string, category: string, url: string, date: Date }>

  type Sidebar = Array<{
    text: string,
    collapsed: boolean,
    // link: string,
    items: Array<{
      text: string,
      link: string
    }>
  }>
  const indexPosts = mdFiles
    .filter(post => post.category === 'Index')
    // sort by title
    .sort((a, b) => a.title.localeCompare(b.title)),
    contentPosts = mdFiles
      .filter(post => post.category !== 'Index')
      // sort by date descending
      .sort((a, b) => b.date.getTime() - a.date.getTime())

  const sidebar: Sidebar = indexPosts.map(post => ({
    text: post.title,
    // link: post.url,
    collapsed: true,
    items: contentPosts
      .filter(cp => cp.category === post.title)
      .map(cp => ({
        text: cp.title,
        link: cp.url + '/'
      }))
  }))

  return sidebar
}
