<template>
  <Header />

  <main class="main">

    <slot />

  </main>

  <footer class="footer-wrapper" id="bottom">
    <div class="footer">
      <div class="footer-sections">
        <section>
          <h1>Blog dkvz.eu</h1>
          <p>© 2026+ dkvz.eu</p>
          <p>I probably won't sue you</p>
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
            <li><a target="_blank" rel="noopener noreferrer" href="https://github.com/dkvz/dkvz-blog-2025">Code
                source</a></li>
          </ul>
        </section>
        <section>
          <h1>Social</h1>
          <ul>
            <li><a href="https://bsky.app/profile/dkvz.eu" target="_blank" rel="noopener noreferrer">Bluesky</a></li>
            <li><a href="https://x.com/MrSausageroll" target="_blank" rel="noopener noreferrer">Twitter 💩</a></li>
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
