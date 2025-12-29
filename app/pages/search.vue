<script setup lang="ts">

useHead({
  bodyAttrs: {
    class: "bg-gradient"
  },
  title: `Rechercher`
})
</script>

<template>
  <article class="content-card content-card--page-card content-card--transp trans-left">
    <div class="section-title">
      <h2 class="section-title__title">Recherche de contenu</h2>
    </div>

    <form class="search-big">
      <label class="search__label">
        <Icon name="uil:search" class="search__img" mode="css" />
        <input name="search-input" class="input search__input" type="text" placeholder="Rechercher"
          aria-label="Rechercher" />
      </label>
    </form>
  </article>

  <article class="content-card content-card--transp">

    <ShortCard :id="175" summary="coucou" title="Test de carte" />

  </article>

</template>
