<script setup lang="ts">
// This component is purely for the client side.

const props = defineProps<{
  open?: boolean,
  modal?: boolean
}>()

// I forgot how cumbersome it is to do 
// "reactive" frontend
const emit = defineEmits<{
  (e: "close"): void
}>()

const dialog = useTemplateRef("dialog")

watch(() => props.open, (newVal) => {
  if (dialog.value) {
    if (newVal) {
      props.modal ? dialog.value.showModal() : dialog.value.show()
    } else {
      dialog.value.close()
    }
  }
})

onMounted(() => {
  dialog.value?.addEventListener("cancel", () => {
    // Cancel button or Esc has been pressed
    emit("close")
  })
})
</script>

<template>
  <dialog ref="dialog">
    <slot></slot>
  </dialog>
</template>
