// ref: https://vitepress.dev/guide/data-loading#createcontentloader
import { createContentLoader } from 'vitepress'

export default createContentLoader('**/*.md', /* options */)
