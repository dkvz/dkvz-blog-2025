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
const { data: articles, status, error } = useDkvzApi<Article[]>(
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
  <article v-if="status === 'pending'" class="content-card content-card--page-card">
    <LoadingSpinner></LoadingSpinner>
  </article>

  <!-- TODO: Shorts use a different layout, to figure out later? -->
  <div v-else class="content-card content-card--transp content-card--page-card">
    <div class="section-title">
      <h2 class="section-title__title">{{ capitalizedArticleType }}</h2>
    </div>

    <div class="card-list card-list--single">

      <div class="card card--hoverable">
        <div class="card__header card--no-overflow">
          <div class="card__info">
            <h1>Un vraiment très très long titre d'article</h1>
            <div class="simple-row">
              <Icon name="uil:calendar" alt="Publié le" size="1.2em" />
              <span>11/12/2020 11:20:11</span>
            </div>
          </div>
          <img class="card__img" src="~/assets/img/js_logo_110.png" alt="Un logo">
        </div>
        <div class="card__body card--border-top">
          <p>Lorem ipsum machin bidule.</p>
          <p>Encore une ligne.</p>
        </div>
        <div class="card__footer">
          <a class="btn btn-icon" title="Ouvrir l'article...">
            Suite
            <Icon name="uil:external-link-alt" />
          </a>
          <a class="btn btn-icon">
            0
            <Icon name="uil:comment" />
          </a>
        </div>
      </div>

      <div class="card card--hoverable">
        <div class="card__header card--no-overflow">
          <div class="card__info">
            <h1>Moyen long titre</h1>
            <div class="simple-row">
              <Icon name="uil:calendar" alt="Publié le" size="1.2em" />
              <span>11/12/2020 11:20:11</span>
            </div>
          </div>
          <img class="card__img" src="~/assets/img/php_logo_110.png" alt="Un logo">
        </div>
        <div class="card__body card--border-top">
          <p>Lorem ipsum machin bidule.</p>
          <p>Encore une ligne.</p>
        </div>
        <div class="card__footer">
          <a class="btn btn-icon">
            Suite
            <Icon name="uil:external-link-alt" />
          </a>
          <a class="btn btn-icon">
            0
            <Icon name="uil:comment" />
          </a>
        </div>
      </div>

    </div>
  </div>
</template>
