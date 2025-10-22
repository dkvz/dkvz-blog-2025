<script setup lang="ts">
// This component is purely for the client side.

// TODO: I should add more icons in here

const props = defineProps<{
  open?: boolean,
  articleId: number
}>()

// I forgot how cumbersome it is to do 
// "reactive" frontend
const emit = defineEmits<{
  (e: "close"): void
  (e: "success", comment: Comment): void
}>()

const message = ref("")
const loading = ref(false)
const formData = reactive({
  author: "",
  comment: "",
  captcha: ""
})

const submitForm = async () => {
  // TODO: Reset the fields on success
  message.value = ""

  // Post object:
  // - comment
  // - author
  // - article_id OR articleurl (both can be strings)
  const trimComment = formData.comment.trim()
  const trimAuthor = formData.author.trim()
  if (trimComment === "" || trimAuthor === "") {
    message.value = "Manque l'auteur ou le commentaire"
    return
  }

  if (parseInt(formData.captcha) !== 2) {
    message.value = "Les règles de priorités mathématiques n'ont pas été respectées"
    return
  }

  loading.value = true
  // I use site-info for almost everything but uh...
  // Yeah the API URL is in the app config. I don't know man.
  const config = useAppConfig()
  try {
    // My API expects a classic form POST like nobody does anymore
    const resp = await $fetch<Comment>(`${config.dkvzApiUrl}/comments`, {
      method: "POST",
      headers: { "ContentType": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        article_id: props.articleId.toString(),
        author: trimAuthor,
        comment: trimComment
      })
    })
    // Reset the fields and send success event:
    formData.author = ""
    formData.comment = ""
    // We'll let the parent close the modal.
    emit("success", resp)
  } catch (err: any) {
    message.value = "Quelque chose a capoté pour l'envoi du commentaire (c'est pas normal)"
  } finally {
    loading.value = false
  }
}

const handleSelfClose = () => emit("close")

</script>

<template>
  <GenericDialog :open="open" :modal="true" @close="handleSelfClose">
    <LoadingSpinner v-if="loading"></LoadingSpinner>

    <template v-else="loading">
      <!--<form method="dialog">
      <button aria-label="close" class="btn" style="float: right">X</button>
      </form>-->
      <h2 class="comment-form-title">Ajouter un commentaire</h2>
      <form action="#" @submit.prevent="submitForm" class="comment-form">

        <div v-if="message" class="simple-row flex-center warn">
          <Icon name="uil:exclamation-triangle" size="2.1rem" /> {{ message }}
        </div>

        <input v-model="formData.author" type="text" required class="input" name="comment-author"
          placeholder="Votre nom...">

        <textarea v-model="formData.comment" class="input" required placeholder="Votre commentaire..."
          name="comment-comment"></textarea>

        <div class="small-control">
          <label for="testator">
            Combien font 2+4x0?
          </label>
          <input v-model="formData.captcha" type="text" required class="input" id="testator" name="testator"
            placeholder="C'est pas 0">
        </div>

        <footer class="comment-form-footer">
          <button aria-label="close" formmethod="dialog" @click="emit('close')" type="button"
            class="btn">Annuler</button>
          <button type="submit" class="btn">Envoyer</button>
        </footer>
      </form>
    </template>
  </GenericDialog>
</template>
