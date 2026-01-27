<script setup lang="ts">
// We're supposed to redirect to /page/1
// Doing it in the Nuxt config doesn't work because of the param
// Or at least I don't know how you're supposed to do it there

definePageMeta({
  validate: validateTag,
})

const route = useRoute()
// The tag has been validated as non empty string above
// But it can be an array for some reason so here we are
const tag = (route.params.tag || "").toString()

const baseUrl = `tag/${tag}`
await navigateTo(`/${baseUrl}/page/1`)
</script>

<template>
</template>
