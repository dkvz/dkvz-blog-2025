<script setup lang="ts">
// Meant to both perform the API calls and show
// the search results.
// Searching requires JavaScript on my site, 
// using regular fetch.

const props = defineProps<{
  search?: string,
}>()

// In the end I don't use the event for anything 
// so I removed it:
// const emit = defineEmits<{
//   (e: "itemsFound", count: number): void
// }>()

const config = useAppConfig()

const loading = ref(false)
const searchResults = ref<SearchResult[]>([])
const errorMsg = ref<string | undefined>(undefined)
// I need the container to scroll to it when new 
// results appear.
// const container = useTemplateRef("container")
const resultsList = useTemplateRef("results-list")

watch(() => props.search, async (newSearch) => {
  if (!loading.value && newSearch !== undefined) {
    const terms = newSearch.trim().split(" ")
    if (terms.length < 1) return

    loading.value = true
    errorMsg.value = undefined

    try {
      const resp = await $fetch<SearchResult[]>(
        `${config.dkvzApiUrl}/articles/search`,
        {
          method: "POST",
          body: { include: terms }
        }
      )
      searchResults.value = resp
      // emit("itemsFound", resp.length)
      // Attempt to scroll to the container element:
      // if (container.value) container.value.scrollIntoView()
    } catch (ex) {
      errorMsg.value = "Erreur de l'API - Veuillez réessayer plus tard"
      console.log("Error fetching search results for ", terms, ex)
      searchResults.value = []
      // Should probably be another event
      // emit("itemsFound", 0)
    } finally {
      loading.value = false
    }
  }
})

watch(resultsList, (l) => {
  l !== null && registerCardRevealObservers([l])
})

</script>

<template>
  <div>
    <LoadingSpinner v-if="loading" />
    <template v-else>
      <div v-if="errorMsg" class="simple-row flex-center warn">
        <Icon name="uil:exclamation-triangle" size="2.1rem" /> {{ errorMsg }}
      </div>
      <div v-if="searchResults.length < 1" class="main-title flex-center gap-4">
        <Icon name="uil:emoji" /> RIEN TROUVÉ
      </div>
      <div v-else class="card-list card-list--single" ref="results-list">
        <ShortCard v-for="s in searchResults" :key="s.id" :title="s.title" :summary="s.snippet" :id="s.id"
          :disableHtml="true" />
      </div>
    </template>
  </div>
</template>
