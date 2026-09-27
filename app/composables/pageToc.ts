import type { ContentTocLink } from '@nuxt/ui'

/**
 * Shared state for the current page's table-of-contents links.
 * Pages set their TOC links here; the page shell renders them
 * in the right-hand aside.
 */
export function usePageToc() {
    return useState<ContentTocLink[] | undefined>('page-toc', () => undefined)
}
