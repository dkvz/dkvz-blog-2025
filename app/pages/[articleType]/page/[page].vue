<script setup lang="ts">
import { siteInfo } from '~~/data/site-info'

// There's an unusual amount of composables on this page
// because the "tags" page is almost the same but I couldn't
// have it as an alias of this one because tags has an extra
// route param.

definePageMeta({
  validate: (r) => validatePageNumber(r) && validateArticleType(r),
})

const route = useRoute()
const page = route.params.page !== undefined ?
  parseInt(route.params.page.toString()) : 1
const articleType = route.params.articleType ?
  route.params.articleType.toString() : siteInfo.articleRootUrl
const isShorts = articleType === siteInfo.shortRootUrl

const articleList = useTemplateRef("card-list-a")
const shortList = useTemplateRef("card-list-s")

// A bit convoluted due to multiple refactoring of routing antics
const {
  urlPart,
  descriptionPlural: articleTypeDescriptionPlural,
  apiDescription: articleTypeApiDesc
} = paramsForArticleType(isShorts)
const capitalizedArticleType = capitalizeFirst(articleTypeDescriptionPlural)

// Not the same thing depending on article type
const maxItems = isShorts ? siteInfo.maxShorts : siteInfo.maxArticles

const { isOrderAsc, handleToggleOrder } = useOrderToggle()
// const isOrderAsc = ref(false)

useHead({
  bodyAttrs: {
    class: "bg-gradient"
  },
  title: `${capitalizedArticleType} - Page ${page}`
})

const {
  articles,
  lastPage,
  status,
  refresh
} = await useFetchArticles({
  articleType: articleTypeApiDesc,
  maxItems,
  isOrderAsc,
  page
})
// Necessary for static generation to force fetching
// the actual lastPage client-side
if (lastPage.value === null) {
  refresh()
}

if (import.meta.client) {
  watch(shortList, (l) => {
    l !== null && registerCardRevealObservers([l])
  })
  watch(articleList, (l) => {
    l !== null && registerCardRevealObservers([l])
  })
}

</script>

<template>
  <div class="content-card content-card--transp content-card--page-card trans-left">

    <div class="section-title two-items-grid">
      <h2 class="section-title__title">{{ capitalizedArticleType }}</h2>
      <ToggleButton @change="handleToggleOrder" :value="isOrderAsc" class="_js-only"
        description="Basculer l'ordre des articles par dates de publication décroissante ou croissante"
        name="order-toggle-btn" disabled-label="Décroissant" enabled-label="Croissant">
      </ToggleButton>
    </div>

    <div v-if="status === 'pending'">
      <LoadingSpinner />
    </div>

    <template v-else>

      <div v-if="isShorts" class="card-list" ref="card-list-s">

        <ShortCard v-for="article in articles" :key="article.id" :id="article.id" :date="article.date"
          :summary="article.summary" :thumb-image="article.thumbImage" :title="article.title">
        </ShortCard>

      </div>

      <div v-else class="card-list card-list--single" ref="card-list-a">

        <ArticleCard v-for="article in articles" :key="article.id" :article-url="article.articleURL"
          :comments-count="article.commentsCount" :date="article.date" :summary="article.summary"
          :thumb-image="article.thumbImage" :title="article.title">
        </ArticleCard>

      </div>

      <GotoTop />

    </template>

    <div class="flex-end">
      <Paginator :base-url="urlPart" :last-page="lastPage" :page="page">
      </Paginator>
    </div>

  </div>
</template>
