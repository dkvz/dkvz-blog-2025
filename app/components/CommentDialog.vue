<script setup lang="ts">
const props = defineProps<{
  open?: boolean
}>()

// TODO: - Emit event when closing
// - Emit event when comment is posted successfully

const dialog = useTemplateRef("dialog")
watch(() => props.open, (newVal, oldVal) => {
  if (newVal != oldVal && dialog.value) {
    if (newVal) {
      dialog.value.showModal()
    } else {
      dialog.value.close()
    }
  }
})
</script>

<template>
  <dialog ref="dialog">
    <!--<form method="dialog">
      <button aria-label="close" class="btn" style="float: right">X</button>
      </form>-->
    <h2 class="comment-form-title">Ajouter un commentaire</h2>
    <form action="#" class="comment-form">
      <input type="text" class="input" name="comment-author" placeholder="Votre nom...">
      <textarea class="input" placeholder="Votre commentaire..." name="comment-comment"></textarea>
      <footer class="comment-form-footer">
        <button aria-label="close" formmethod="dialog" class="btn">Annuler</button>
        <button type="submit" class="btn">Envoyer</button>
      </footer>
    </form>
  </dialog>
</template>
