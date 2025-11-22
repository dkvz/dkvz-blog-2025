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
          <a href="https://bsky.app/profile/dkvz.eu" class="card__footer__link simple-row" rel="noopener noreferrer"
            target="_blank">
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
          <a href="https://x.com/MrSausageroll" class="card__footer__link simple-row" rel="noopener noreferrer"
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
          <a href="https://github.com/dkvz" class="card__footer__link simple-row" rel="noopener noreferrer"
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
          <div>Qui utilise encore ce vieux truc? Je vous laisse quelques adresses en vrac</div>
        </div>
        <div class="card__footer">
          <a href="mailto:je-suis-un-gros-pot-de-miel@dkvz.eu"
            class="card__footer__link">je-suis-un-gros-pot-de-miel@dkvz.eu</a>
        </div>
      </article>

      <article class="card card--hoverable card-short">
        <div class="card__header">
          <img class="card__large-img" src="/assets/touch/chrome-touch-icon-192x192.png">
        </div>
        <div class="card__body">
          <h1>Codepen</h1>
          <div>Je suis plus vraiment dessus</div>
        </div>
        <div class="card__footer">
          Je sais pas encore que mettre ici, une icone?
        </div>
      </article>

      <article class="card card--hoverable card-short">
        <div class="card__header">
          <img class="card__large-img" src="/assets/touch/chrome-touch-icon-192x192.png">
        </div>
        <div class="card__body">
          <h1>Youtube</h1>
          <div>Je suis plus vraiment dessus</div>
        </div>
        <div class="card__footer">
          Je sais pas encore que mettre ici, une icone?
        </div>
      </article>

    </div>

  </article>
</template>
