<script setup lang="ts">
import { siteInfo } from '~~/data/site-info'

// We're supposed to redirect to /page/1
// Doing it in the Nuxt config doesn't work because of the param
// Or at least I don't know how you're supposed to do it there

definePageMeta({
  validate: validateArticleType,
})

const route = useRoute()
const articleType = route.params.articleType ?
  route.params.articleType.toString() : siteInfo.articleRootUrl

await navigateTo(`/${articleType}/page/1`)
</script>

<template>
</template>
