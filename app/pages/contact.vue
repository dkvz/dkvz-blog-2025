<script setup lang="ts">

useHead({
  bodyAttrs: {
    class: "bg-gradient"
  },
  title: "A propos"
})

</script>

<template>
  <article class="content-card content-card--page-card content-card--transp">

    <h1>Comment me contacter?</h1>

    <div class="card-list card-list--small-cards">

      <article class="card card--hoverable card-short">
        <div class="card__header">
          <img class="card__large-img" src="/assets/touch/chrome-touch-icon-192x192.png">
        </div>
        <div class="card__body">
          <h1>Twitter</h1>
          <div>Je suis plus vraiment dessus</div>
        </div>
        <div class="card__footer">
          Je sais pas encore que mettre ici, une icone?
        </div>
      </article>

      <article class="card card--hoverable card-short">
        <div class="card__header">
          <img class="card__large-img" src="/assets/touch/chrome-touch-icon-192x192.png">
        </div>
        <div class="card__body">
          <h1>Twitter</h1>
          <div>Je suis plus vraiment dessus</div>
        </div>
        <div class="card__footer">
          Je sais pas encore que mettre ici, une icone?
        </div>
      </article>

    </div>

  </article>
</template>
