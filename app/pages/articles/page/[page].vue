<script setup lang="ts">
import type { RouteLocationNormalizedGeneric } from 'vue-router'
import { siteInfo } from '~~/data/site-info'

// Do some validation on the route param
const validatePage = (route: RouteLocationNormalizedGeneric): boolean => {
  const page = Number(route.params.page)
  return page > 0 && !isNaN(page);
}

definePageMeta({
  validate: validatePage,
  alias: "/breves/page/:page",
})

const route = useRoute()
const page = Number(route.params.page)
const isShorts = isShortsPage(route.path)
const {
  urlPart,
  descriptionSingular: articleTypeDescriptionSingular,
  descriptionPlural: articleTypeDescriptionPlural,
  apiDescription: articleTypeApiDesc
} = paramsForArticleType(isShorts)
const capitalizedArticleType = capitalizeFirst(articleTypeDescriptionPlural)

// Required to be state because the client doesn't re-run the fetch 
// the first time and thus doesn't know about the last page from that
// request.
const lastPage = useState<number | null>("lastPage", () => null)

useHead({
  bodyAttrs: {
    class: "bg-gradient"
  },
  title: `${capitalizedArticleType} - Page ${page}`
})

// Not sure the URL will work dynamically here, I might need it 
// in a function in the useFetch
const url = `/${articleTypeApiDesc}-starting-from/${(page - 1) * siteInfo.maxArticles}?max=${siteInfo.maxArticles}`
const { data: articles, status, error } = await useDkvzApi<Article[]>(
  url,
  {
    lazy: true,
    deep: false,
    // The last page is a header from the response because 
    // I wanted this to be a challenge.
    onResponse({ response }) {
      const link = response.headers.get("link")
      if (link) {
        // We could have multiple ones in the response.
        // Guess I should already have the code to parse
        // all the links but only use the "last" one.
        const links = link.split(",")
        for (const l of links) {
          if (l.includes("rel=\"last\"")) {
            // Attempt to extract the last offset from it:
            const lp = extractLastPageFromLink(l)
            // TODO: Do something if we're already past 
            // last page for the current URL.
            if (lp) lastPage.value = lp / siteInfo.maxArticles
            break;
          }
        }
      }
    }
  }
)

// TODO: This is a copy of the same block in articles/[slug]
// Put the content of the watch block in something re-usable

// We force redirect in case of error and thus do not
// display it in the page below which as nothing to 
// show for non-success (or loading) states.
watch(error, (err) => {
  console.log("Got articles listing error: ", err)
  if (err && err.statusCode !== 404) {
    console.log("Error from API: ", err.message)
    throw createError({
      statusCode: 500,
      statusMessage: 'Encountered unexpected error',
      fatal: true
    })
  } else {
    throw createError({
      statusCode: 404,
      statusMessage: 'Article not found',
      fatal: true
    })
  }
})

</script>

<template>
  <!-- TODO: Shorts use a different layout, to figure out later? -->
  <div class="content-card content-card--transp content-card--page-card">
    <div class="section-title">
      <h2 class="section-title__title">{{ capitalizedArticleType }}</h2>
    </div>

    <div v-if="status === 'pending'">
      <LoadingSpinner></LoadingSpinner>
    </div>

    <div v-else class="card-list card-list--single">

      <ArticleCard v-for="article in articles" :key="article.id" :article-url="article.articleURL"
        :comments-count="article.commentsCount" :date="article.date" :summary="article.summary"
        :thumb-image="article.thumbImage" :title="article.title">
      </ArticleCard>

    </div>

    <!-- Pagination could be a component -->
    <!-- TODO: Could use icons instead of chars -->
    <div class="flex-end">
      <div id="pagination" class="grid-flow-col gap-4 pagination">
        <NuxtLink v-if="page > 1" :to="{ path: `/${urlPart}/page/${page - 1}` }">
          &lt;
        </NuxtLink>
        <span>{{ page }}</span>
        <span>/</span>
        <span v-if="lastPage === null">?</span>
        <NuxtLink v-else :to="{ path: `/${urlPart}/page/${lastPage}` }">
          {{ lastPage }}
        </NuxtLink>
        <NuxtLink v-if="lastPage === null || page < lastPage" :to="{ path: `/${urlPart}/page/${page + 1}` }">
          &gt;
        </NuxtLink>
      </div>
    </div>

  </div>
</template>
