<script setup lang="ts">

const handleClick = () => {
  window.scrollTo(0, 0)
}

</script>

<template>
  <div class="fixed-action-btn">
    <button type="button" class="btn btn-highlight flex-center" @click="handleClick"
      aria-label="Retourner en haut de la page">
      <Icon name="uil:arrow-up" />
    </button>
  </div>
</template>
