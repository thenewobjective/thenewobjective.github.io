<script setup lang="ts">
const props = defineProps<{
    category: string
}>(),
    { data: posts } = await useAsyncData(props.category, () =>
        queryCollection('content')
            .where('path', 'LIKE', `/${props.category}/%`)
            .select('title', 'path', 'meta')
            .all()
    )
</script>

<template>
    <UBlogPosts>
        <UBlogPost v-for="(post, index) in posts" :key="index" :title="post.title" :to="post.path"
            :date="post.meta.date as Date"
            :image="post.meta.featuredImage as string || '/images/icons/android-chrome-512x512.png'" />
    </UBlogPosts>
</template>
