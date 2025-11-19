<script setup lang="ts">
import { siteInfo } from '~~/data/site-info'

definePageMeta({
  validate: validateTagPage,
})

const route = useRoute()
// The tag has been validated as non empty string above
const tag = route.params.tag
const page = Number(route.params.page) || 1
const maxItems = siteInfo.maxArticles

const { isOrderAsc, handleToggleOrder } = useOrderToggle()

// TODO: Does the tag print as it should even with URL encoded chars?
useHead({
  bodyAttrs: {
    class: "bg-gradient"
  },
  title: `Catégorie ${tag} - Page ${page}`
})

</script>

<template>
  <section class="content-card content-card--page-card">
    <h1>Nothing here yet</h1>
  </section>
</template>
