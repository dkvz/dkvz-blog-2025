<script setup lang="ts">

useHead({
  bodyAttrs: {
    class: "bg-gradient"
  },
  title: "A propos"
})

</script>

<template>
  <article class="content-card content-card--page-card content-card--transp">

    <h1>Comment me contacter?</h1>

    <div class="card-list card-list--small-cards">

      <!-- 
      Not making a "contact card" component or whatnot, there's no 
      logic in it and it'll just take more bundle space and processing
      time for nothing, I'm copy pasting baby!
      Doesn't matter because I use vim, btw
      -->

      <article class="card card--hoverable card-short">
        <div class="card__header">
          <img class="card__large-img" src="/assets/touch/chrome-touch-icon-192x192.png">
        </div>
        <div class="card__body">
          <h1>Bluesky</h1>
          <div>
            <p>J'y traine de temps en temps. Un peu moins depuis que je suis papa.</p>
          </div>
        </div>
        <div class="card__footer">
          <a href="https://bsky.app/profile/dkvz.eu" class="card-footer-normal-link simple-row"
            rel="noopener noreferrer" target="_blank">
            @dkvz
            <Icon mode="svg" name="uil:external-link-alt" />
          </a>
        </div>
      </article>

      <article class="card card--hoverable card-short">
        <div class="card__header">
          <img class="card__large-img" src="/assets/touch/chrome-touch-icon-192x192.png">
        </div>
        <div class="card__body">
          <h1>Twitter</h1>
          <div>Je suis plus vraiment dessus mais bon, comme ça vous pouvez creuser dans mon passé pour me <i>cancel</i>.
          </div>
        </div>
        <div class="card__footer">
          <a href="https://x.com/MrSausageroll" class="card-footer-normal-link simple-row" rel="noopener noreferrer"
            target="_blank">
            @MrSausageroll
            <Icon mode="svg" name="uil:external-link-alt" />
          </a>
        </div>
      </article>

      <article class="card card--hoverable card-short">
        <div class="card__header">
          <img class="card__large-img" src="/assets/touch/chrome-touch-icon-192x192.png">
        </div>
        <div class="card__body">
          <h1>Github</h1>
          <div>Vous pouvez aussi regarder mon Github par curiosité morbide.</div>
        </div>
        <div class="card__footer">
          <a href="https://github.com/dkvz" class="card-footer-normal-link simple-row" rel="noopener noreferrer"
            target="_blank">
            dkvz
            <Icon mode="svg" name="uil:external-link-alt" />
          </a>
        </div>
      </article>

      <article class="card card--hoverable card-short">
        <div class="card__header">
          <img class="card__large-img" src="/assets/touch/chrome-touch-icon-192x192.png">
        </div>
        <div class="card__body">
          <h1>Email</h1>
          <div>
            <p>Qui utilise encore ce vieux truc?</p>
            <p>Je vous laisse quelques adresses en vrac.</p>
          </div>
        </div>
        <div class="card__footer flex-col gap-2">
          <a href="mailto:pot-de-miel@dkvz.eu" class="card-footer-normal-link">pot-de-mieil@dkvz.eu</a>
          <a href="mailto:miel-en-pot@dkvz.eu" class="card-footer-normal-link">miel-en-pot@dkvz.eu</a>
        </div>
      </article>

      <article class="card card--hoverable card-short">
        <div class="card__header">
          <img class="card__large-img" src="/assets/touch/chrome-touch-icon-192x192.png">
        </div>
        <div class="card__body">
          <h1>Codepen</h1>
          <div>C'est encore plus bizarre que suivre mon Github mais bon je juge pas. Trop.</div>
        </div>
        <div class="card__footer">
          <a href="https://codepen.io/dkvz" class="card-footer-normal-link simple-row" rel="noopener noreferrer"
            target="_blank">
            dkvz
            <Icon mode="svg" name="uil:external-link-alt" />
          </a>
        </div>
      </article>

      <article class="card card--hoverable card-short">
        <div class="card__header">
          <img class="card__large-img" src="/assets/touch/chrome-touch-icon-192x192.png">
        </div>
        <div class="card__body">
          <h1>Youtube</h1>
          <div>Là ça devient vraiment déconné...</div>
        </div>
        <div class="card__footer">
          <a href="https://www.youtube.com/user/DickVanZand" class="card-footer-normal-link simple-row"
            rel="noopener noreferrer" target="_blank">
            DickVanZand
            <Icon mode="svg" name="uil:external-link-alt" />
          </a>
        </div>
      </article>

    </div>

  </article>
</template>
