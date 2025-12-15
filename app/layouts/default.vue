<template>
  <Header />

  <main class="main">

    <slot />

  </main>

  <footer class="footer-wrapper">
    <div class="footer">
      <div class="footer-sections">
        <section>
          <h1>Blog dkvz.eu</h1>
          <p>© 2018 &rarr; AnnéeEnCours dkvz.eu &mdash; I probably won't sue you</p>
          <p>Ajouter un web component ici pour le bg</p>
        </section>
        <section>
          <h1>Liens</h1>
          <ul>
            <li>
              <NuxtLink to="/">Accueil</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about">A propos</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/articles/page/1">Articles</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/breves/page/1">Brèves</NuxtLink>
            </li>
            <li><a href="/rss.xml" class="footer-sections__image-link"><img class="mr-1" src="~/assets/img/rss_feed.svg"
                  height="18" alt="RSS feed icon"> Flux RSS</a></li>
          </ul>
        </section>
        <section>
          <h1>Social</h1>
          <ul>
            <li><a href="https://bsky.app/profile/dkvz.eu">Bluesky</a></li>
            <li><a href="https://x.com/MrSausageroll">Twitter 💩</a></li>
            <li><a href="https://github.com/dkvz" target="_blank" rel="noopener noreferrer">Github</a></li>
            <li>
              <NuxtLink to="/contact">Contact</NuxtLink>
            </li>
          </ul>
        </section>
      </div>
      <img src="~/assets/img/gillescut_300.png" alt="Un personnage bien raide, l'air ahuri">
    </div>
  </footer>
</template>
