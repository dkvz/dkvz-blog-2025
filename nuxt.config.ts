// I have no idea where to put this
const siteUrl = "https://dkvz.eu"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/icon', '@nuxtjs/color-mode'],
  app: {
    head: {
      title: "Blog des gens compliqués",
      htmlAttrs: {
        lang: "fr"
      },
      // It's better to use <ClientOnly> when possible except it's 
      // got a big delay as it only enables after hydration.
      // My noscript "hack" immediately detects when JS is disabled.
      noscript: [
        {
          textContent: '<style>._js-only {display: none !important;}<\/style>'
        },
      ],
      link: [
        {
          rel: "alternate",
          type: "application/rss+xml",
          href: `${siteUrl}/rss.xml`,
          title: "Flux RSS de dkvz.eu"
        },
        {
          rel: "icon",
          sizes: "192x192",
          href: "/assets/touch/chrome-touch-icon-192x192.png"
        },
        {
          rel: "apple-touch-icon",
          href: "/assets/touch/apple-touch-icon.png"
        },
        {
          rel: "manifest",
          href: "/manifest.json"
        }
      ],
      meta: [
        { name: "theme-color", content: "#184160" },
        { name: "description", content: "Blog expérimental d'un humble consultant en progress-bars." },
        { name: "application-name", content: "Blog dkvz.eu" },
        { name: "image", content: `${siteUrl}/assets/touch/chrome-splashscreen-icon-384x384.png`, property: "og:image" },
      ]
    }
  },
  css: [
    '~/assets/styles/style.css'
  ],
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.includes('-')
    }
  },
  postcss: {
    plugins: {
      "postcss-custom-media": {}
    }
  }
})
