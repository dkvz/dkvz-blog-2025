<script setup lang="ts">
import type { RouteLocationNormalizedGeneric } from 'vue-router';

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
  descriptionPlural: articleTypeDescriptionPlural
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
</script>

<template>
  <!-- TODO: Shorts use a different layout, to figure out later? -->
  <div class="content-card content-card--transp first-card">
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
