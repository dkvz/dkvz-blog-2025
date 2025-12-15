<script setup lang="ts">
import { siteInfo } from '~~/data/site-info'

definePageMeta({
  validate: (r) => validatePageNumber(r) && validateTag(r),
})

const route = useRoute()
// The tag has been validated as non empty string above
// But it can be an array for some reason so here we are
const tag = (route.params.tag || "").toString()
const baseUrl = `tag/${encodeURIComponent(tag.toString())}`
const page = route.params.page !== undefined ?
  parseInt(route.params.page.toString()) : 1
const maxItems = siteInfo.maxArticles
const { isOrderAsc, handleToggleOrder } = useOrderToggle()
const articleList = useTemplateRef("article-list")

useHead({
  bodyAttrs: {
    class: "bg-gradient"
  },
  title: `Catégorie ${tag} - Page ${page}`
})

const {
  articles,
  lastPage,
  status
} = await useFetchArticles({
  articleType: 'articles',
  maxItems,
  isOrderAsc,
  page,
  tag
})

if (import.meta.client) {
  watch(articleList, (l) => {
    l !== null && registerCardRevealObservers([l])
  })
}

</script>

<template>
  <div class="content-card content-card--transp content-card--page-card trans-left">

    <div class="section-title two-items-grid">
      <div>
        <h2 class="section-title__title">Articles</h2>
        <h3>{{ tag }}</h3>
      </div>
      <ToggleButton @change="handleToggleOrder" :value="isOrderAsc" class="_js-only"
        description="Basculer l'ordre des articles par dates de publication décroissante ou croissante"
        name="order-toggle-btn" disabled-label="Décroissant" enabled-label="Croissant">
      </ToggleButton>
    </div>

    <div v-if="status === 'pending'">
      <LoadingSpinner />
    </div>

    <div v-else class="card-list card-list--single" ref="article-list">

      <ArticleCard v-for="article in articles" :key="article.id" :article-url="article.articleURL"
        :comments-count="article.commentsCount" :date="article.date" :summary="article.summary"
        :thumb-image="article.thumbImage" :title="article.title">
      </ArticleCard>

    </div>

    <div class="flex-end">
      <Paginator :base-url="baseUrl" :last-page="lastPage" :page="page">
      </Paginator>
    </div>

  </div>
</template>
