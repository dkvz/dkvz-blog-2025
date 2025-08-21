<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: "bg--gradient-clouds"
  }
})
</script>

<template>
  <article class="content-card content-card--page-card">
    <div class="article-header">
      <h1 class="article-header__title">
        Analyse de transitions électophotoniques majeures à réaction
      </h1>
      <div class="article-header__desc mt-2">
        <!--<img width="28" src="img/calendar-alt.svg" class="icon invertable--img" alt="Publié le">-->
        <Icon name="uil:calendar" class="icon invertable--img" alt="Publié le" />
        <span>11/12/2020 11:20:11</span>
        <span>|</span>
        <!--<img width="28" src="img/edit.svg" class="icon invertable--img" alt="Ecrit par">-->
        <Icon name="uil:edit" class="icon invertable--img" alt="Ecrit par" />
        <span>Par DkVZ</span>
      </div>
      <div class="article-header__desc">
        <span class="pill mt-3">
          <a href="#">Science &amp; Quiche</a>
        </span>
        <span class="pill mt-3">
          <a href="#">Art &amp; Beauté</a>
        </span>
        <span class="pill mt-3">
          <a href="#">Pantalons</a>
        </span>
        <span class="pill mt-3">
          <a href="#">Un autre tag</a>
        </span>
      </div>
      <div class="article-header__desc text-muted mt-3">
        15 minutes de lecture (désolé)
      </div>
    </div>

    <div class="article-toc">
      <h2 class="article-toc__title">Table des matières</h2>
      <ul>
        <li>
          <a href="#">Pomme de terre</a>
        </li>
        <li><a href="#">Slip de bain</a>
          <ul>
            <li><a href="#">Titre de niveau 2</a></li>
            <li><a href="#">Un autre</a></li>
          </ul>
        </li>
      </ul>
    </div>

    <div class="article-content">
      <h2>Introduction</h2>

      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore soluta delectus perspiciatis quibusdam
        aspernatur nostrum quisquam, <a href="https://dkvz.eu" target="_blank" rel="noopener noreferrer">pantacourt
          sans slip</a> sunt doloremque, eveniet itaque quas suscipit.</p>

      <blockquote>
        <p>Si Gargamel mange tous les Schtroumpfs y a plus d'histoire.</p>
        <p>Aussi je sais pas comment on écrit Schdpotrutmgf. Et faut ajouter du texte sur plusieurs lignes Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Numquam consectetur expedita rem quaerat blanditiis? Quae atque
          reprehenderit doloribus excepturi dicta?</p>
      </blockquote>

      <h2>Autre section</h2>
      <p>Patate magique.</p>

      <img-lightbox class="article-image">
        <a href="/assets/gilleshead_350.png" target="_blank" rel="noopener noreferrer">
          <img src="/assets/gilleshead_350.png" alt="Une image que j'ai pris au hasard">
        </a>
      </img-lightbox>

      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur vel quisquam eum. Dolores iusto ab
        facilis sequi debitis fuga eius!</p>

      <h3>Sous-section</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est laborum impedit temporibus consequatur.
        Aspernatur aut ex cum quibusdam nesciunt odio numquam asperiores animi nam nisi repellendus, qui quisquam
        pariatur deleniti.</p>

      <p>Une autre image:</p>

      <div class="center-image">
        <img-lightbox class="article-image">
          <a href="/assets/gilleshead_350.png" target="_blank" rel="noopener noreferrer">
            <img src="/assets/gilleshead_350.png" alt="C'est Gilles. Je pense.">
          </a>
        </img-lightbox>
      </div>

      <h4>Sous-sous-section</h4>
      <p>Lorem illum voluptatum optio odio ipsum voluptate cum facere laboriosam ut praesentium dignissimos rem
        consectetur. Rerum, aliquid.</p>

      <div class="right">
        <img-lightbox class="article-image">
          <a href="/assets/gilleshead_350.png" target="_blank" rel="noopener noreferrer">
            <img src="/assets/gilleshead_350.png" alt="C'est Gilles. Je pense.">
          </a>
        </img-lightbox>
      </div>

      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo nostrum, laboriosam quos laudantium
        pariatur ipsam accusamus quaerat? Provident, aliquid voluptas.</p>

      <h4>Sousousous section</h4>
      <p>On est loins là.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur facilis minima a iste. Hic voluptatum
        delectus ea quasi temporibus ipsa, laborum saepe eveniet similique pariatur sit dolor ipsum. Ab, neque dolore.
        Itaque nemo repellendus praesentium mollitia illo pariatur voluptate earum.</p>
    </div>

    <section id="comment-section" class="card-list card-list--single">

      <div class="content-card">
        <h2 class="comments__title">Commentaires</h2>
        <div class="mb-2">
          <button id="comment-button" type="button" class="btn icon__btn sm-w-full">
            <!--<img src="img/comment-alt.svg" class="icon" alt="Commentaires">-->
            <Icon class="icon" name="uil:comment" />
            Ecrire un bon vieux commentaire...
          </button>
        </div>
      </div>

      <div class="card">
        <div class="comment-card__header">
          <div class="comment-card__info">
            <h1>#1</h1>
            <div class="icon__btn">
              <img src="~/assets/img/user_duder.svg" class="icon__medium invertable--img"
                alt="icône moche représentant l'auteur" aria-hidden="true">
              Par DkVZ
            </div>
          </div>
          <div class="card__date-box">
            02/08/2025 10:25:00
          </div>
        </div>
        <div class="card__body">
          Comment content would go here. I think.
        </div>
      </div>

    </section>

  </article>
</template>
