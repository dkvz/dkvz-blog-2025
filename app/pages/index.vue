<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: "bg-gradient"
  }
})
</script>

<template>
  <div class="content-card cta content-card--transp">

    <div class="cta-buttons">
      <form class="search">
        <label class="search__label">
          <Icon name="uil:search" class="search__img" mode="css" />
          <input name="search-input" class="input search__input" type="text" placeholder="Rechercher"
            aria-label="Rechercher" />
        </label>
      </form>
      <button class="btn cta-buttons__btn">Lire mes articles</button>
      <button class="btn cta-buttons__btn">Lire mes brèves</button>
    </div>
  </div>

  <div class="content-card quote-card">
    La citation aléatoire serait ici. Sur un plus grand écran on pourrait le mettre côte-à-côte avec les brèves
  </div>

  <div class="content-card content-card--transp content-card--l-margin">
    <div class="section-title">
      <h2 class="section-title__title">Dernières brèves</h2>
    </div>

    <div class="card-list">

      <div class="card card--hoverable card-short">
        <div class="card__header">
          <img class="card__large-img" src="https://dkvz.eu/assets/shorts/shorts_linux2.png">
          <div class="card__date-pill">22/11 2019</div>
        </div>
        <div class="card__body">
          <h1>Card test</h1>
          <p>Lorem ipsum machin bidule.</p>
          <p>Encore une ligne.</p>
        </div>
        <div class="card__footer">
          <a class="card__footer__link" href="#">Lire la suite...</a>
        </div>
      </div>

      <div class="card card--hoverable card-short">
        <div class="card__header">
          <img class="card__large-img" src="https://dkvz.eu/assets/shorts/shorts_linux1.png">
          <div class="card__date-pill">31/12 2020</div>
        </div>
        <div class="card__body">
          <h1>Another card</h1>
          <p>Lorem ipsum machin bidule.</p>
          <p>Encore une ligne.</p>
        </div>
        <div class="card__footer">
          <a class="card__footer__link" href="#">Lire la suite...</a>
        </div>
      </div>

      <button class="btn card-list__btn" aria-label="Charger d'autres brèves" title="Charger d'autres brèves...">
        <img class="invertable--img" src="~/assets/img/triangle_down.svg" height="10px" alt="Flèche vers le bas"
          aria-hidden="true">
      </button>

    </div>
  </div>

  <div class="content-card content-card--transp">
    <div class="section-title">
      <h2 class="section-title__title">Derniers articles</h2>
    </div>

    <div class="card-list card-list--single">

      <div class="card card--hoverable">
        <div class="card__header card--no-overflow">
          <div class="card__info">
            <h1>Un vraiment très très long titre d'article</h1>
            <div class="simple-row">
              <Icon name="uil:calendar" alt="Publié le" size="1.2em" />
              <span>11/12/2020 11:20:11</span>
            </div>
          </div>
          <!-- <div class="card__date-pill">22/11 2019</div> -->
          <img class="card__img" src="~/assets/img/js_logo_110.png" alt="Un logo">
        </div>
        <div class="card__body card--border-top">
          <p>Lorem ipsum machin bidule.</p>
          <p>Encore une ligne.</p>
        </div>
        <div class="card__footer">
          <a class="btn btn-icon" title="Ouvrir l'article...">
            Suite
            <Icon name="uil:external-link-alt" />
          </a>
          <a class="btn btn-icon">
            0
            <Icon name="uil:comment" />
          </a>
        </div>
      </div>

      <div class="card card--hoverable">
        <div class="card__header card--no-overflow">
          <div class="card__info">
            <h1>Moyen long titre</h1>
            <div class="simple-row">
              <Icon name="uil:calendar" alt="Publié le" size="1.2em" />
              <span>11/12/2020 11:20:11</span>
            </div>
          </div>
          <img class="card__img" src="~/assets/img/php_logo_110.png" alt="Un logo">
        </div>
        <div class="card__body card--border-top">
          <p>Lorem ipsum machin bidule.</p>
          <p>Encore une ligne.</p>
        </div>
        <div class="card__footer">
          <a class="btn btn-icon">
            Suite
            <Icon name="uil:external-link-alt" />
          </a>
          <a class="btn btn-icon">
            0
            <Icon name="uil:comment" />
          </a>
        </div>
      </div>

      <button class="btn card-list__btn" aria-label="Charger d'autres brèves" title="Charger d'autres articles...">
        <img class="invertable--img" src="~/assets/img/triangle_down.svg" height="10px" alt="Flèche vers le bas"
          aria-hidden="true">
      </button>

    </div>
  </div>
</template>
