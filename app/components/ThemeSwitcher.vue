<script setup lang="ts">
// TODO: 
// - Might also need to change the button padding or icon size on small screens

const colorMode = useColorMode()

const toggleTheme = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark"
}
</script>

<template>
  <button aria-label="Basculer le mode sombre / clair" class="btn btn--highlight  flex--center"
    title="Basculer le mode sombre / clair" @click="toggleTheme">
    <Icon v-if="colorMode.value === 'dark'" name="uil:sun" />
    <Icon v-else name="uil:moon" />
  </button>
</template>
