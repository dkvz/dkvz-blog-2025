<script setup lang="ts">
// Could have used a composable for generic IntersectionObserver 
// antics but turns out I don't use it the "vue way" anywhere else

const props = defineProps<{
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: "intersected"): void
}>()

const placeholder = useTemplateRef("placeholder")

const plObs = new window.IntersectionObserver((entries) => {
  if (props.disabled) return

  if (entries.length > 0 && entries[0]?.isIntersecting === true) {
    emit("intersected")
  }
})

onMounted(() => {
  if (placeholder.value) {
    plObs.observe(placeholder.value)
  }
})

onUnmounted(() => {
  if (placeholder.value) {
    plObs.unobserve(placeholder.value)
  }
})

</script>

<template>
  <div ref="placeholder"></div>
</template>
