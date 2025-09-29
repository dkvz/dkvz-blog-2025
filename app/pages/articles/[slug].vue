<script setup lang="ts">

import type { Link, UseSeoMetaInput } from "@unhead/vue"
import { siteInfo } from "~~/data/site-info"

definePageMeta({
  alias: "/breves/:slug",
})

useHead({
  bodyAttrs: {
    class: "bg-gradient-clouds"
  },
})

const route = useRoute()

// I thought I needed to watch the route param but it seems to 
// work as is with the current version of Nuxt.
// TODO: Try removing the await now that I use a big watch?
const { data, status, error } =
  await useDkvzApi<Article>(`/article/${route.params.slug}`, {
    lazy: true,
    deep: false,
  })

// We force redirect in case of error and thus do not
// display it in the page below which as nothing to 
// show for non-success (or loading) states.
watch(error, (err) => {
  console.log("Got new error: ", err)
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

// At some point I decided to centralize everything 
// related to updating the article-related data here
// instead of having 100000 tests for data.value being
// truthy.
watch(data, (newData) => {
  if (newData) {
    useHead({
      link: [
        {
          rel: "canonical",
          href: articleUrlFor(newData, true)
        }
      ],
      title: newData.title,
    })

    if (import.meta.server) {
      // Set the rest of the meta tags from SSR Since I have 
      // await in front of the useFetch above, I might not 
      // need to watch for data. Maybe. Let's try that.
      const url = articleUrlFor(newData, true)

      const seoMeta: UseSeoMetaInput = {
        ogDescription: siteInfo.articleDescription,
        twitterDescription: siteInfo.articleDescription,
        ogTitle: newData.title,
        twitterTitle: newData.title,
        ogUrl: url,
        ogType: "article",
        articlePublishedTime: parseBlogDateFormat(newData.date).toISOString(),
        author: newData.author,
        articleAuthor: [newData.author],
      }

      if (newData.thumbImage) {
        seoMeta.ogImage = newData.thumbImage
        seoMeta.twitterImage = newData.thumbImage
      }

      useSeoMeta(seoMeta)
    }

  }
})


</script>

<template>
  <CommentDialog></CommentDialog>

  <article v-if="status === 'pending'" class="content-card content-card--page-card">
    <LoadingSpinner></LoadingSpinner>
  </article>

  <article v-else-if="data && status === 'success'" class="content-card content-card--page-card">
    <div class="article-header">
      <h1 class="article-header__title" v-html="data.title"></h1>
      <div class="article-header__desc mt-2">
        <Icon name="uil:calendar" alt="Publié le" />
        <span>{{ data.date }}</span>
        <span>|</span>
        <Icon name="uil:edit" alt="Ecrit par" />
        <span>Par {{ data.author }}</span>
      </div>

      <div class="article-header__desc">
        <span v-for="tag in data.tags" class="pill mt-3">
          <NuxtLink :to="{ name: 'tag-tag', params: { tag: tag.name } }">
            {{ tag.name }}
          </NuxtLink>
        </span>
      </div>

      <div class="article-header__desc text-muted mt-3">
        {{ readingTimeDescription(data.content.length) }}
      </div>
    </div>

    <div class="article-toc">
      <h2 class="article-toc__title">Table des matières</h2>
      <ul>
        <li>
          <a href="#">Pomme de terre</a>
        </li>
        <li><a href="#">Slip de bain</a>
          <ul>
            <li><a href="#">Titre de niveau 2</a></li>
            <li><a href="#">Un autre</a></li>
          </ul>
        </li>
      </ul>
    </div>

    <div class="article-content" v-html="data.content"></div>

    <section id="comment-section" class="card-list card-list--single">

      <div class="content-card">
        <h2 class="comments__title">Commentaires</h2>
        <div class="mb-2">
          <button id="comment-button" type="button" class="btn btn-icon sm-w-full">
            <Icon name="uil:comment" />
            Ecrire un bon vieux commentaire...
          </button>
        </div>
      </div>

      <div class="card">
        <div class="comment-card__header">
          <div class="comment-card__info">
            <h1>#1</h1>
            <div class="btn-icon">
              <img src="~/assets/img/user_duder.svg" class="icon__medium invertable--img"
                alt="icône moche représentant l'auteur" aria-hidden="true">
              Par DkVZ
            </div>
          </div>
          <div class="card__date-box">
            02/08/2025 10:25:00
          </div>
        </div>
        <div class="card__body">
          Comment content would go here. I think.
        </div>
      </div>

    </section>

  </article>
</template>
