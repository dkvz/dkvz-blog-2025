<script setup lang="ts">
import { siteInfo } from '~~/data/site-info'

// TODO: Can I re-use it for shorts?
// What happens if there is no thumb image, does it work?
// Does the title arg work on NuxtLink?

// Should have some alt for the image, wasn't in my plans
// initially.
const props = defineProps<{
  title: string,
  summary: string,
  thumbImage?: string,
  date: string,
  commentsCount: number,
  articleUrl: string,
}>()

const url = computed(() => `/${siteInfo.articleRootUrl}/${props.articleUrl}`)
</script>


<template>
  <article class="card card--hoverable">
    <div class="card__header card--no-overflow">
      <div class="card__info">
        <h1 v-html="props.title"></h1>
        <div class="simple-row">
          <Icon name="uil:calendar" alt="Publié le" size="1.2em" />
          <span>{{ props.date }}</span>
        </div>
      </div>
      <img v-if="thumbImage" class="card__img" :src="thumbImage" alt="Vignette de l'article">
    </div>
    <div v-html="summary" class="card__body card--border-top"></div>
    <div class="card__footer">
      <NuxtLink :to="url" class="btn btn-icon" title="Ouvrir l'article...">
        Suite
        <Icon name="uil:external-link-alt" />
      </NuxtLink>
      <NuxtLink :to="{ path: `${url}`, hash: '#comment-section' }" class="btn btn-icon">
        {{ commentsCount }}
        <Icon name="uil:comment" />
      </NuxtLink>
    </div>
  </article>
</template>
