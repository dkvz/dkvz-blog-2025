<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: "bg-gradient"
  },
  title: "Spinner tests"
})

// TODO: Add an animated drop-shadow filter!
</script>

<template>
  <div class="content-card content-card--page-card">

    <div class="spinner">
      <img class="spin-forever" src="~/assets/img/gillescut_300.png" alt="Bonhomme qui tourne"
        title="Chargement en cours...">
    </div>

  </div>
</template>

<style lang="postcss">
.spinner {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spin-forever {
  padding-top: 2rem;
  animation: spin 2s cubic-bezier(0.39, 0.575, 0.565, 1) infinite;
  padding-bottom: 2rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
    filter: drop-shadow(0 0 10px var(--accent-color));
  }

  50% {
    transform: rotate(180deg);
    filter: drop-shadow(0 0 20px var(--ui-color));
  }

  100% {
    transform: rotate(360deg);
    filter: drop-shadow(0 0 10px var(--accent-color));
  }
}
</style>
