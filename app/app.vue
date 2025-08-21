<script setup lang="ts">
// It's better to use <ClientOnly> when possible except it's got a big 
// delay as it only enables after hydration.
// My "hack" immediately detects when JS is disabled.
const jsOnlyStyleTag = `<style>._js-only {display: none !important;}<\/style>`

useHead({
  noscript: [jsOnlyStyleTag]
})
</script>

<template>
  <NuxtLayout>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </NuxtLayout>
</template>
