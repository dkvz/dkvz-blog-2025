<template>
  <NuxtLoadingIndicator />
  <Header />

  <main class="trans-left main">

    <slot />

  </main>

  <footer class="footer-wrapper">
    <div class="footer">
      <div class="footer-sections">
        <section>
          <h1>Blog dkvz.eu</h1>
          <p>© 2018 &rarr; AnnéeEnCours dkvz.eu &mdash; I probably won't sue you</p>
          <p>-&gt; Ajouter un web component ici pour le bg</p>
        </section>
        <section>
          <h1>Liens</h1>
          <ul>
            <li><a href="#">Accueil</a></li>
            <li><a href="#">A propos</a></li>
            <li><a href="#">Articles</a></li>
            <li><a href="#">Brèves</a></li>
            <li><a href="#" class="footer-sections__image-link"><img class="mr--1" src="~/assets/img/rss_feed.svg"
                  height="18" alt="RSS feed icon"> Flux RSS</a></li>
          </ul>
        </section>
        <section>
          <h1>Social</h1>
          <ul>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Github</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </section>
      </div>
      <img src="~/assets/img/gillescut_300.png" alt="Test Image 2">
    </div>
  </footer>
</template>
