<script setup lang="ts">
import { siteInfo } from '~~/data/site-info'

// There's an unusual amount of composables on this page
// because the "tags" page is almost the same but I couldn't
// have it as an alias of this one because tags has an extra
// route param.

definePageMeta({
  validate: validatePageNumber,
  alias: "/breves/page/:page",
})

const route = useRoute()
const page = route.params.page !== undefined ?
  parseInt(route.params.page.toString()) : 1
const isShorts = isShortsPage(route.path)

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
  status
} = await useFetchArticles({
  articleType: articleTypeApiDesc,
  maxItems,
  isOrderAsc,
  page
})

</script>

<template>
  <div class="content-card content-card--transp content-card--page-card">

    <div class="section-title two-items-grid">
      <h2 class="section-title__title">{{ capitalizedArticleType }}</h2>
      <ToggleButton @change="handleToggleOrder" :value="isOrderAsc" class="_js-only"
        description="Basculer l'ordre des articles par dates de publication décroissante ou croissante"
        name="order-toggle-btn" disabled-label="Décroissant" enabled-label="Croissant">
      </ToggleButton>
    </div>

    <div v-if="status === 'pending'">
      <LoadingSpinner></LoadingSpinner>
    </div>

    <template v-else>

      <div v-if="isShorts" class="card-list">

        <ShortCard v-for="article in articles" :key="article.id" :id="article.id" :date="article.date"
          :summary="article.summary" :thumb-image="article.thumbImage" :title="article.title">
        </ShortCard>

      </div>

      <div v-else class="card-list card-list--single">

        <ArticleCard v-for="article in articles" :key="article.id" :article-url="article.articleURL"
          :comments-count="article.commentsCount" :date="article.date" :summary="article.summary"
          :thumb-image="article.thumbImage" :title="article.title">
        </ArticleCard>

      </div>

    </template>

    <div class="flex-end">
      <Paginator :base-url="urlPart" :last-page="lastPage" :page="page">
      </Paginator>
    </div>

  </div>
</template>
