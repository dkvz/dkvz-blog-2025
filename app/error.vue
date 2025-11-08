<script setup lang="ts">
import type { NuxtError } from '#app'
import { siteInfo } from '../data/site-info'

const props = defineProps({
  error: Object as () => NuxtError
})

useHead({
  bodyAttrs: {
    class: "bg-gradient"
  },
  title: `Erreur | ${siteInfo.title}`
})

// Output the error in dev mode, in the non-404 case.
if (import.meta.dev && props.error?.statusCode !== 404) {
  console.log(props.error)
}

</script>

<template>
  <NuxtLayout>
    <div class="content-card content-card--page-card">
      <div v-if="props.error?.statusCode === 404">
        <div class="article-header">
          <h1 class="article-header__title">404 - Pas trouvé</h1>
        </div>
        <div class="text-center">
          <p><img src="/assets/shorts/shorts_crapic3.png" class="responsive-img"
              alt="Un chat noir dans une boîte qui a pas l'air super heureux"></p>
          <p>Cette page ou cet article n'existe pas ou plus.</p>
          <p>Mais c'est pas grave, y en a plein d'autres!</p>
        </div>
      </div>
      <div v-else>
        <div class="article-header">
          <h1 class="article-header__title">Un truc a capoté</h1>
        </div>
        <div class="text-center">
          <p><img src="/assets/shorts/shorts_crapic2.png" class="responsive-img"
              alt="Un chat noir dans une boîte qui a l'air inquiet"></p>
          <p>Vous venez de rencontrer un problème qui n'est pas censé se poser.</p>
          <p>Soit c'est tout cassé pour toujours, soit vous pouvez réessayer plus tard.</p>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
