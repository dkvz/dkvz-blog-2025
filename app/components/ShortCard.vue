<script setup lang="ts">
import { siteInfo } from '~~/data/site-info'

// The component is almost a copy of ArticleCard
// But the HTML was too different and I didn't feel 
// like having 10000 v-ifs.

// TODO: What happens if there is no thumb image, does it work?
// Does the title arg work on NuxtLink?

// Should have some alt for the image, wasn't in my plans
// initially.
const props = defineProps<{
  id: number,
  title: string,
  summary: string,
  thumbImage?: string,
  date?: string,
}>()

const url = computed(() => `/${siteInfo.shortRootUrl}/${props.id.toString()}`)

const shorterDate = computed(() => props.date ? shortDate(props.date) : undefined)
</script>


<template>
  <article class="card card--hoverable card-short">
    <div class="card__header">
      <img v-if="thumbImage" class="card__large-img" :src="thumbImage">
      <div class="card__date-pill" v-if="shorterDate">{{ shorterDate }}</div>
    </div>
    <div class="card__body">
      <h1 v-html="title"></h1>
      <div v-html="summary" class="mt-2"></div>
    </div>
    <div class="card__footer">
      <NuxtLink class="card__footer__link" :to="url" title="Lire la suite...">Lire la suite...</NuxtLink>
    </div>
  </article>
</template>
