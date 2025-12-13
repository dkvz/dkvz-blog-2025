<script setup lang="ts">

useHead({
  bodyAttrs: {
    class: "bg-gradient"
  }
})

// Hardcoding this here for now
const maxArticlesOrShorts = 2

const shortList = useTemplateRef("card-list-s")
const articleList = useTemplateRef("card-list-a")

const articlesStart = ref(0)
const shortsStart = ref(0)
const articles = ref<UIArticle[]>([])
const shorts = ref<UIArticle[]>([])

const { data: newArticles, status: statusArticles } = await useDkvzApi<Article[]>(
  () => `/articles-starting-from/${articlesStart.value}?max=${maxArticlesOrShorts}`,
  {
    deep: false,
    lazy: true
  }
)

const { data: newShorts, status: statusShorts } = await useDkvzApi<Article[]>(
  () => `/shorts-starting-from/${shortsStart.value}?max=${maxArticlesOrShorts}`,
  {
    deep: false,
    lazy: true
  }
)

// I just found out about typeof
const updateArticlesOrShorts = async (
  items: UIArticle[] | undefined,
  list: typeof articleList,
  isShorts: boolean
) => {
  if (items !== undefined) {
    // Pretty sure I have to do the good old
    // "recreate the entire array" here, mostly
    // because of my transitions antics.
    // This is ugly and I have no idea how to make it better.
    const currentItems = isShorts ? shorts.value : articles.value
    const newItems = currentItems.map(i => {
      return {
        ...i, transition: false
      }
    }).concat(items.map(i => {
      return {
        ...i, transition: true
      }
    }))
    if (isShorts) {
      shorts.value = newItems
    } else {
      articles.value = newItems
    }

    await nextTick()
    if (import.meta.client) {
      // Will be null on the first render
      list.value !== null && registerCardRevealObservers([list.value], true)
    }
  }
}

watch(newArticles, (items) => updateArticlesOrShorts(items, articleList, false), {
  // Watch will not run on server unless immediate is true
  immediate: true
})

watch(newShorts, (items) => updateArticlesOrShorts(items, shortList, true), {
  immediate: true
})

// This is necessary for the first hydration to get
// the reveal animation.
if (import.meta.client) {
  watch(shortList, (l) => {
    l !== null && registerCardRevealObservers([l])
  })
  watch(articleList, (l) => {
    l !== null && registerCardRevealObservers([l])
  })
}

// Dynamically add shorts or articles
const loadMoreContent = (short: boolean) => {
  // TODO: What happens when the endpoint responds with
  // a 404?
  if (short) {
    shortsStart.value = shortsStart.value + maxArticlesOrShorts
  } else {
    articlesStart.value = articlesStart.value + maxArticlesOrShorts
  }
}

</script>

<template>
  <div class="content-card cta content-card--transp">

    <div class="cta-buttons">
      <form class="search">
        <label class="search__label">
          <Icon name="uil:search" class="search__img" mode="css" />
          <input name="search-input" class="input search__input" type="text" placeholder="Rechercher"
            aria-label="Rechercher" />
        </label>
      </form>
      <NuxtLink to="/articles/page/1" class="btn cta-buttons__btn">Lire mes articles</NuxtLink>
      <NuxtLink to="/breves/page/1" class="btn cta-buttons__btn">Lire mes brèves</NuxtLink>
    </div>
  </div>

  <div class="content-card content-card--transp content-card--l-margin">
    <div class="section-title">
      <h2 class="section-title__title">Dernières brèves</h2>
    </div>

    <div class="card-list" ref="card-list-s">

      <ShortCard v-if="statusShorts === 'success'" v-for="short in shorts" :date="short.date" :key="short.id"
        :id="short.id" :summary="short.summary" :thumbImage="short.thumbImage" :title="short.title"
        :data-transition="short.transition">
      </ShortCard>

      <div v-else-if="statusShorts === 'pending'" class="card-list__btn">
        <LoadingSpinner />
      </div>

      <button @click="loadMoreContent(true)" class="btn card-list__btn _js-only" aria-label="Charger d'autres brèves"
        title="Charger d'autres brèves...">
        <img class="invertable--img" src="~/assets/img/triangle_down.svg" height="10px" alt="Flèche vers le bas"
          aria-hidden="true">
      </button>

      <noscript data-allow-mismatch="children" class="card-list__btn">
        <NuxtLink class="btn" aria-label="Charger d'autres brèves" title="Charger d'autres brèves..."
          to="/breves/page/1">
          <img class="invertable--img" src="~/assets/img/triangle_down.svg" height="10px" alt="Flèche vers le bas"
            aria-hidden="true">
        </NuxtLink>
      </noscript>

    </div>
  </div>

  <div class="content-card content-card--transp">
    <div class="section-title">
      <h2 class="section-title__title">Derniers articles</h2>
    </div>

    <div class="card-list card-list--single" ref="card-list-a">

      <ArticleCard v-if="statusArticles === 'success'" v-for="article in articles" :key="article.id" :id="article.id"
        :article-url="article.articleURL" :comments-count="article.commentsCount" :date="article.date"
        :thumb-image="article.thumbImage" :summary="article.summary" :title="article.title"
        :data-transition="article.transition">
      </ArticleCard>

      <div v-else-if="statusArticles === 'pending'" class="card-list__btn">
        <LoadingSpinner />
      </div>

      <button @click="loadMoreContent(false)" class="btn card-list__btn _js-only" aria-label="Charger d'autres articles"
        title="Charger d'autres articles...">
        <img class="invertable--img" src="~/assets/img/triangle_down.svg" height="10px" alt="Flèche vers le bas"
          aria-hidden="true">
      </button>

      <noscript data-allow-mismatch="children" class="card-list__btn">
        <NuxtLink class="btn" aria-label="Charger d'autres articles" title="Charger d'autres articles..."
          to="/articles/page/1">
          <img class="invertable--img" src="~/assets/img/triangle_down.svg" height="10px" alt="Flèche vers le bas"
            aria-hidden="true">
        </NuxtLink>
      </noscript>

    </div>
  </div>
</template>
