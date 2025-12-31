<script setup lang="ts">

useHead({
  bodyAttrs: {
    class: "bg-gradient"
  },
  title: `Rechercher`
})

const search = ref<string | undefined>()

// const handleItemsFound = (count: number) => {
//   console.log(`search returned ${count} items`)
// }
//
</script>

<template>
  <article class="content-card content-card--page-card content-card--transp trans-left">
    <div class="section-title">
      <h2 class="section-title__title">Recherche de trucs</h2>
    </div>

    <ClientOnly fallback="La recherche sur mon site requiert JavaScript activé.">
      <div class="search-big">
        <label class="search__label">
          <Icon name="uil:search" class="search__img" mode="css" />
          <input name="search-input" class="input search__input" type="text" placeholder="Rechercher"
            aria-label="Rechercher" v-model="search" />
        </label>
      </div>
    </ClientOnly>
  </article>

  <article v-if="search" class="content-card content-card--transp">

    <SearchPanel :search="search" />

  </article>

</template>
