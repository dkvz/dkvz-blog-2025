<script setup lang="ts">
const props = defineProps<{
  fixed?: boolean
}>()
</script>

<template>
  <div class="spinner" :class="{ 'float-center': fixed }">
    <img class="spin-forever" src="~/assets/img/gillescut_300.png" alt="Chargement - Bonhomme qui tourne"
      title="Chargement en cours..." aria-busy="true">
  </div>
</template>
