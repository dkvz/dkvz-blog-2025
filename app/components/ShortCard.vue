<script setup lang="ts">
import { siteInfo } from '~~/data/site-info'

// The component is almost a copy of ArticleCard
// But the HTML was too different and I didn't feel 
// like having 10000 v-ifs.

// Should have some alt for the image, wasn't in my plans
// initially.
const props = defineProps<{
  id: number,
  title: string,
  summary: string,
  thumbImage?: string,
  date?: string,
  // Computed from the id when absent
  articleUrl?: string,
  // Enables HTML in the summary
  // Shouldn't be enabled for search results
  disableHtml?: boolean
}>()

const url = computed(() => {
  // The "search results" use articleUrl.
  if (props.articleUrl) {
    // Check if we got a int in there:
    const isArticle = isNaN(parseInt(props.articleUrl))
    return isArticle ? `/${siteInfo.articleRootUrl}/${props.articleUrl}` :
      `/${siteInfo.shortRootUrl}/${props.articleUrl}`
  }
  return `/${siteInfo.shortRootUrl}/${props.id.toString()}`
})

const shorterDate = computed(() => props.date ? shortDate(props.date) : undefined)
</script>


<template>
  <article class="card card--hoverable card-short relative">
    <div class="card__header">
      <img v-if="thumbImage" class="card__large-img" :src="thumbImage">
      <div class="card__date-pill" v-if="shorterDate">{{ shorterDate }}</div>
    </div>
    <div class="card__body">
      <h1 v-html="title"></h1>
      <div v-if="disableHtml" class="mt-2 wrap-anywhere">{{ summary }}</div>
      <div v-else v-html="summary" class="mt-2 wrap-anywhere"></div>
    </div>
    <div class="card__footer">
      <NuxtLink class="card__footer__link w-full card-info-h" :to="url" title="Lire la suite...">
        <span>Lire la suite...</span>
        <Icon name="uil:external-link-alt" />
      </NuxtLink>
    </div>
  </article>
</template>
