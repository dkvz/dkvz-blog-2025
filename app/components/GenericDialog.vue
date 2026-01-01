<script setup lang="ts">
// This component is purely for the client side.

const props = defineProps<{
  open?: boolean,
  modal?: boolean
}>()

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
  if (dialog.value) {
    dialog.value.addEventListener("cancel", () => {
      // Cancel button or Esc has been pressed
      emit("close")
    })
    // We need to show the dialog now if open is true,
    // the watch won't proc for an initial value of open.
    if (props.open) {
      props.modal ? dialog.value.showModal() : dialog.value.show()
    }
  }
})
</script>

<template>
  <dialog class="trans-top" :class="{ 'modal-dialog': modal }" ref="dialog">
    <slot></slot>
  </dialog>
</template>
