<script setup lang="ts">

const props = defineProps<{
  comment: Comment,
  id: Number
}>()

</script>

<template>
  <div class="card">
    <div class="comment-card__header">
      <div class="comment-card__info">
        <h1>#{{ id }}</h1>
        <div class="btn-icon">
          <img src="~/assets/img/user_duder.svg" class="icon__medium invertable--img"
            alt="icône moche représentant l'auteur" aria-hidden="true">
          {{ comment.author }}
        </div>
      </div>
      <div class="card__date-box">
        {{ comment.date }}
      </div>
    </div>
    <div class="card__body">
      {{ comment.comment }}
    </div>
  </div>
</template>
