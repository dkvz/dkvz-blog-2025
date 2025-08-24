<script setup lang="ts">
// TODO: Think I can remove the ids from elements that have one

</script>

<template>
  <dialog id="comment-dialog">
    <!--<form method="dialog">
      <button aria-label="close" class="btn" style="float: right">X</button>
      </form>-->
    <h2 class="comment-form-title">Ajouter un commentaire</h2>
    <form action="#" class="comment-form">
      <input type="text" class="input" name="comment-author" id="comment-author" placeholder="Votre nom...">
      <textarea class="input" placeholder="Votre commentaire..." name="comment-comment" id="comment-comment"></textarea>
      <footer class="comment-form-footer">
        <button aria-label="close" formmethod="dialog" class="btn">Annuler</button>
        <button type="submit" class="btn">Envoyer</button>
      </footer>
    </form>
  </dialog>
</template>
