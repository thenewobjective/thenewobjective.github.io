<script setup lang="ts">
// Renders one message of a threaded conversation (forum/chat transcript) as a Nuxt UI
// UChatMessage. Unlike a live chat, the transcript is static prose, so:
//  - Identity is shown via name in the header (avatar initials alone are not self-describing)
//  - Bodies arrive as markdown slot children (rendered), never as plain-text props,
//    so code fences, links, and figures keep their Nuxt Content styling
//  - The thread owner ("me") is right-aligned with a soft bubble; everyone else is
//    left-aligned "naked" like forum replies (long paragraphs in tinted pills read poorly)
//
// The `ai` SDK is a peer dependency of @nuxt/ui that this project does not install;
// ChatMessage's `parts` prop therefore has no usable types here. All props below are
// plain, and role is set to 'assistant' merely to pick the left-side default layout.
import { useSlots, computed } from 'vue'

const props = withDefaults(defineProps<{
    /** Display name, shown in the message header. */
    name: string
    /** Timestamp or relative age of the message as shown in the original thread. */
    when?: string
    /** True for the thread owner (published under their full name). */
    me?: boolean
    /** Override for the avatar fallback text (initials are used when omitted; handles can be too long). */
    avatarText?: string
}>(), {
    when: '',
    me: false,
    avatarText: ''
}),
    slots = useSlots(),
    // Initials derived from the name for the avatar fallback ("Jane Roe" -> "JR").
    // The thread owner keeps their full name as avatar text instead.
    initials = computed(() => props.name
        .split(/\s+/)
        .filter(Boolean)
        .map(word => word[0]!.toUpperCase())
        .join('')),
    // Deterministic palette rotation keyed on the name so each participant keeps a
    // stable color across the whole thread (primary is reserved for the owner).
    nonPrimaryColors = ['secondary', 'info', 'warning', 'success'] as const,
    avatarColor = computed(() => {
        if (props.me) return 'primary'
        let hash = 0
        for (const ch of props.name) hash = (hash * 31 + ch.charCodeAt(0)) % 997
        return nonPrimaryColors[hash % nonPrimaryColors.length]
    }),
    hasBody = computed(() => !!slots.default),
    avatarLabel = computed(() => props.avatarText
        || (props.me ? props.name : initials.value))
</script>

<template>
    <UChatMessage
        id="discussion-message"
        role="assistant"
        :side="me ? 'right' : 'left'"
        :variant="me ? 'soft' : 'naked'"
        :color="me ? 'primary' : 'neutral'"
        :avatar="{
            alt: name,
            text: avatarLabel,
            color: avatarColor,
            size: 'sm'
        }"
        class="py-2"
    >
        <template #header>
            <span class="text-sm font-medium" :class="me ? 'text-primary' : 'text-toned'">{{ name }}</span>
            <span v-if="when" class="text-xs text-dimmed">&middot; {{ when }}</span>
        </template>

        <template v-if="hasBody" #content>
            <slot />
        </template>
    </UChatMessage>
</template>
