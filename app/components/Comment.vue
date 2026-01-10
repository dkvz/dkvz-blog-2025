<script setup lang="ts">

const props = defineProps<{
  comment: Comment,
  id: number
}>()

</script>

<template>
  <div class="card relative">
    <div class="comment-card__header">
      <div class="card-info-h">
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
      <div class="comment-text">
        {{ comment.comment }}
      </div>
    </div>
  </div>
</template>
