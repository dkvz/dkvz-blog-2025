<script setup lang="ts">
// This component is purely for the client side.

// TODO: I should add icons everywhere in this thing

const props = defineProps<{
  open?: boolean
}>()

// I forgot how cumbersome it is to do 
// "reactive" frontend
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'success'): void
}>()

const dialog = useTemplateRef("dialog")

watch(() => props.open, (newVal) => {
  if (dialog.value) {
    if (newVal) {
      dialog.value.showModal()
    } else {
      dialog.value.close()
    }
  }
})

const submitForm = () => {
  // TODO: Reset the fields on success
  console.log("Would submit the form")
}

onMounted(() => {
  dialog.value?.addEventListener("cancel", () => {
    // Cancel button or Esc has been pressed
    emit("close")
  })
})
</script>

<template>
  <dialog ref="dialog">
    <!--<form method="dialog">
      <button aria-label="close" class="btn" style="float: right">X</button>
      </form>-->
    <h2 class="comment-form-title">Ajouter un commentaire</h2>
    <form action="#" @submit.prevent="submitForm" class="comment-form">
      <input type="text" required class="input" name="comment-author" placeholder="Votre nom...">
      <textarea class="input" required placeholder="Votre commentaire..." name="comment-comment"></textarea>
      <div class="small-control">
        <label for="testator">Combien font 2+4x0?</label>
        <input type="text" required class="input" id="testator" name="testator" placeholder="C'est pas 0">
      </div>
      <footer class="comment-form-footer">
        <button aria-label="close" formmethod="dialog" @click="emit('close')" type="button" class="btn">Annuler</button>
        <button type="submit" class="btn">Envoyer</button>
      </footer>
    </form>
  </dialog>
</template>
