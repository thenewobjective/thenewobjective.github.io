<script setup lang="ts">
// ref: https://github.com/vuejs/vitepress/issues/4160
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import Comments from '../../components/Comments.vue';
import { onMounted } from 'vue';

const { page } = useData(),
    { Layout } = DefaultTheme


onMounted(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('q')) {
        const searchButton = document.querySelector('#local-search > button');
        if (searchButton) {
            searchButton.click();
            setTimeout(() => {
                const searchInput = document.querySelector('.search-input')
                if (searchInput) {
                    searchInput.value = urlParams.get('q');
                    const event = new Event('input', { bubbles: true });
                    searchInput.dispatchEvent(event);
                }
            }, 800);
        }
    }
});
</script>

<template>
    <Layout>
        <template #doc-before>
            <header>
                <div class="vp-doc">
                    <h1>{{ useData().frontmatter.value.title?.replace('"', '') }}</h1>
                </div>
                <time v-if="useData().frontmatter.value.date" datetime="{{ useData().frontmatter.value.date }}">
                    {{
                        new Date(useData().frontmatter.value.date).toLocaleDateString('en-US', {
                            year: 'numeric', month: 'long', day: 'numeric'
                        })
                    }}
                </time>
            </header>
        </template>
        <template #sidebar-nav-after>
            <a class="sidebar-nav_brave" href="https://brave.com/the327" target="_blank">
                <picture>
                    <source srcset="/media-library/brave/brave-banner.png" media="(max-width: 420px)" />
                    <source srcset="/media-library/brave/brave-lion.png" media="(max-width: 1279px)" />
                    <img src="/media-library/brave/brave-banner.png" title="Be brave" alt="Be brave">
                </picture>
            </a>
        </template>
        <template #doc-after>
            <Comments />
        </template>
    </Layout>
</template>

<style>
.content-container>header {
    margin-bottom: 1em;

    &>time {
        font-style: italic;
    }
}

figure+figure {
    margin-top: 1em;
}

figure {
    &>img {
        margin: auto;
    }

    &>figcaption {
        font-size: 0.8em;
        text-align: center;
    }
}
</style>
