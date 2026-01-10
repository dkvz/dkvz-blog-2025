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
const cta = useTemplateRef("cta")

const articlesStart = ref(0)
const shortsStart = ref(0)
const articles = ref<UIArticle[]>([])
const shorts = ref<UIArticle[]>([])
const search = ref<string | undefined>()

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
    const newItems = currentItems.map(i => ({
      ...i, transition: false
    })).concat(items.map(i => ({
      ...i, transition: true
    })))

    const notInitial = newItems.length > maxArticlesOrShorts
    if (isShorts) {
      shorts.value = newItems
    } else {
      articles.value = newItems
    }

    // This magic thing waits for the DOM to be updated, so that
    // I get access to the nodes using the template refs.
    await nextTick()

    if (import.meta.client) {
      // Will be null on the first render
      if (list.value !== null) {
        // Try to devise a way to determine the element to
        // scroll to before we register the observers.
        // It should be the first item with transition set 
        // to true.
        if (notInitial) {
          const els = list.value.querySelectorAll('[data-transition="true"]')
          if (els[0]) els[0].scrollIntoView()
        }
        registerCardRevealObservers([list.value], true)
      }
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
  if (short) {
    shortsStart.value = shortsStart.value + maxArticlesOrShorts
  } else {
    // We could just load +1 here, I'll keep the +2 for the moment
    articlesStart.value = articlesStart.value + maxArticlesOrShorts
  }
}

const handleSearchResults = (count: number) => {
  if (count > 0 && cta.value !== null) {
    // cta.value.scrollIntoView()
    window.scrollTo(0, 70)
  }
}

</script>

<template>
  <div class="content-card cta content-card--transp">

    <div class="cta-buttons" ref="cta">
      <form class="search _js-only">
        <label class="search__label">
          <Icon name="uil:search" class="search__img" mode="css" />
          <input name="search-input" v-model="search" class="input search__input" type="text" placeholder="Rechercher"
            aria-label="Rechercher" />
        </label>
      </form>
      <NuxtLink to="/articles/page/1" class="btn cta-buttons__btn">Lire mes articles</NuxtLink>
      <NuxtLink to="/breves/page/1" class="btn cta-buttons__btn">Lire mes brèves</NuxtLink>
    </div>
  </div>

  <section v-if="search" class="content-card content-card--transp trans-left">
    <SearchPanel :search="search" @itemsFound="handleSearchResults" />
  </section>

  <section v-else class="trans-left">
    <div class="content-card content-card--transp content-card--l-margin">
      <div class="section-title">
        <h2 class="section-title__title">Dernières brèves</h2>
      </div>

      <div class="card-list" ref="card-list-s">

        <ShortCard v-if="statusShorts === 'success' || statusShorts === 'error'" v-for="short in shorts"
          :date="short.date" :key="short.id" :id="short.id" :summary="short.summary" :thumbImage="short.thumbImage"
          :title="short.title" :data-transition="short.transition">
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

        <ArticleCard v-if="statusArticles === 'success' || statusArticles === 'error'" v-for="article in articles"
          :key="article.id" :id="article.id" :article-url="article.articleURL" :comments-count="article.commentsCount"
          :date="article.date" :thumb-image="article.thumbImage" :summary="article.summary" :title="article.title"
          :data-transition="article.transition">
        </ArticleCard>

        <div v-else-if="statusArticles === 'pending'" class="card-list__btn">
          <LoadingSpinner />
        </div>

        <button @click="loadMoreContent(false)" class="btn card-list__btn _js-only"
          aria-label="Charger d'autres articles" title="Charger d'autres articles...">
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
  </section>

</template>
