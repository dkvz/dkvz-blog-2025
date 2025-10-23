<script setup lang="ts">

const props = defineProps<{
  content?: string
}>()

const contentDiv = useTemplateRef("content-div")

// Thought I needed onUpdated but it looks like onMounted
// is called everytime I need to update all of these completely
// over the top intersection observers. Cool.
onMounted(() => {
  // TODO: Use contentDiv to access the content DOM
})

</script>

<template>
  <div ref="content-div" class="article-content" v-html="props.content"></div>
</template>
