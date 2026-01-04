<script setup lang="ts">
import { siteInfo } from "../data/site-info"

// Current solution to get dynamic titles, combining 
// with the page meta on pages that need it
useHead({
  titleTemplate: siteInfo.titleTemplate
})
</script>

<template>
  <NuxtLayout>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </NuxtLayout>
</template>
