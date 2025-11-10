<script lang="ts" setup>
definePageMeta({
    layout: 'default',
})

const { data: categoryIndexes } = await useAsyncData('category-indexes', () =>
    queryCollection('categoryIndexes').select('title', 'path', 'description', 'meta').all()
)
</script>

<template>
    <UContainer id="content" as="main">
        <UPageHeader title="The New Objective" description="Ars longa, vita brevis." />

        <UBlogPosts>
            <UBlogPost v-for="(post, index) in categoryIndexes" :key="index" :title="post.title" :to="post.path"
                :image="post.meta.featuredImage as string || '/images/icons/android-chrome-512x512.png'" />
        </UBlogPosts>
    </UContainer>
</template>
