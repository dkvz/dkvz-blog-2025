<script setup lang="ts">

// Very basic paginator.
// I re-use it on the tags page so I had to 
// make a component for it.

const props = defineProps<{
  baseUrl: string,
  page: number,
  lastPage: number | null
}>()

</script>

<template>
  <div id="pagination" class="grid-flow-col gap-4 pagination">
    <NuxtLink title="Page précédente" v-if="page > 1" :to="{ path: `/${baseUrl}/page/${page - 1}` }">
      &lt;
    </NuxtLink>
    <span>{{ page }}</span>
    <span>/</span>
    <span v-if="lastPage === null">?</span>
    <NuxtLink title="Se rendre à la dernière page" v-else :to="{ path: `/${baseUrl}/page/${lastPage}` }">
      {{ lastPage }}
    </NuxtLink>
    <NuxtLink title="Page suivante" v-if="lastPage === null || page < lastPage"
      :to="{ path: `/${baseUrl}/page/${page + 1}` }">
      &gt;
    </NuxtLink>
  </div>
</template>
