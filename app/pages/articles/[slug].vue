<script setup lang="ts">

import type { UseSeoMetaInput } from "@unhead/vue"
import { addTOC, syntaxHighlight } from "~/utils/article-utils"
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
const config = useAppConfig()
const showCommentForm = ref(false)
const showCommentSuccess = ref(false)
const commentsLoading = ref(false)

// I thought I needed to watch the route param but it seems to 
// work as is with the current version of Nuxt.
// Omitting the await just seems to make things "lazy" by default
// but with the watchers it has no other effetcs.
const { data, status, error } = await useDkvzApi<Article>(
  `/article/${route.params.slug}`,
  {
    lazy: true,
    deep: false,
    transform: async (article) => {
      // Adding costly processes here so that the loading spinner
      // from the fetch stays up during those
      if (article.content !== undefined && article.content !== null) {
        // Generate the table of content:
        const tocObj = { content: article.content, toc: "" }
        addTOC(tocObj, 1, 4, 0, article.content.length, "toc")
        article.content = tocObj.content
        article.articleExtras = {
          readingTimeStr: readingTimeDescription(article.content.length),
          toc: tocObj.toc
        }
        // Modify article content for the syntax highlighting:
        article.content = await syntaxHighlight(article.content)
      }
      return article
    }
  }
)

// Had to load the comments here to render a first set 
// server side.
// The comments end point sends a 404 when no comments 
// or no more comments are to be found. Not sure what the
// data will be set to in that case.
const { data: comments } = await useDkvzApi<Comment[]>(
  `/comments-starting-from/${route.params.slug}`,
  {
    lazy: true,
    deep: false,
    params: {
      start: 0,
      max: siteInfo.maxComments
    }
  }
)

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
    } else {
      // Reset comments loading just in case:
      commentsLoading.value = false
    }

  }
})

const openCommentForm = (open: boolean) => {
  showCommentForm.value = open
}

// The dialog also gives the comment object but I don't use it
// for now.
const commentPosted = () => {
  openCommentForm(false)
  showCommentSuccess.value = true
  loadMoreComments()
}

const loadMoreComments = async () => {
  console.log("Loading more comments...")
  commentsLoading.value = true

  let start = 0
  if (comments.value !== undefined && comments.value.length > 0) {
    start = comments.value.length
  }

  try {
    const coms = await $fetch<Comment[]>(
      `${config.dkvzApiUrl}/comments-starting-from/${route.params.slug}`, {
      params: {
        start,
        max: siteInfo.maxComments
      }
    })
    if (coms && Array.isArray(coms)) {
      comments.value = comments.value !== undefined ?
        comments.value.concat(coms) : coms
    }
  } catch (ex: any) {
    // We ignore errors for comments at the moment but 
    // my API sends a 404 when no more or no comments 
    // were found.
    if (ex.statusCode !== 404) {
      // Not supposed to happen
      console.log("error loading comments: ", ex)
    }
  }

  commentsLoading.value = false
}


</script>

<template>
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
        {{ data.articleExtras?.readingTimeStr }}
      </div>
    </div>

    <div v-if="data.articleExtras?.toc" class="article-toc">
      <h2 class="article-toc__title">Table des matières</h2>
      <div v-html="data.articleExtras.toc"></div>
    </div>

    <ArticleContent :content="data.content"></ArticleContent>

    <section id="comment-section" class="card-list card-list--single">

      <div class="content-card">
        <h2 class="comments__title">Commentaires</h2>
        <div class="mb-2">
          <ClientOnly fallback-tag="p" fallback="Il faut JavaScript activé pour écrire des commentaires ici">
            <button id="comment-button" @click="openCommentForm(true)" type="button" class="btn btn-icon sm-w-full">
              <Icon name="uil:comment" />
              Ecrire un bon vieux commentaire...
            </button>
          </ClientOnly>
        </div>
      </div>

      <div v-for="(comment, index) in comments">
        <Comment :comment="comment" :id="index + 1"></Comment>
      </div>

      <ClientOnly>
        <IntersectionPlaceholder :disabled="commentsLoading" @intersected="loadMoreComments">
        </IntersectionPlaceholder>
      </ClientOnly>

      <div class="card" v-if="commentsLoading">
        <LoadingSpinner></LoadingSpinner>
      </div>

    </section>

    <CommentDialog :article-id="data.id" :open="showCommentForm" @close="openCommentForm(false)"
      @success="commentPosted">
    </CommentDialog>

    <GenericDialog :open="showCommentSuccess" @close="showCommentSuccess = false">
      <div class="flex-center flex-col p-2 gap-4">
        <div class="comment-success-msg scaler">
          <div>Votre commentaire a été ajouté</div>
          <div>(enfin, je pense)</div>
        </div>
        <button autofocus class="btn btn-icon" @click="showCommentSuccess = false">
          <Icon name="uil:thumbs-up" /> Merci papa
        </button>
      </div>
    </GenericDialog>

  </article>
</template>
