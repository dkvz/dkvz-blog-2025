// Importing site info I have to reuse from "data"
import { siteInfo } from "./data/site-info"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/icon', '@nuxtjs/color-mode'],
  app: {
    head: {
      // title is set in app.vue
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
          href: `${siteInfo.url}/rss.xml`,
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
        { name: "description", content: siteInfo.description },
        { name: "application-name", content: "Blog dkvz.eu" },
        {
          property: "og:image",
          name: "image",
          content: `${siteInfo.url}/assets/touch/chrome-splashscreen-icon-384x384.png`
        },
        { property: "og:type", content: "website" },
        { property: "og:title", content: `dkvz.eu - ${siteInfo.title}` },
        { property: "og:description", content: siteInfo.description },
        { property: "og:url", content: siteInfo.url },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `dkvz.eu - ${siteInfo.title}` },
        { name: "twitter:site", content: "@MrSausageroll" },
        { name: "twitter:description", content: siteInfo.description },
        {
          name: "twitter:image",
          content: `${siteInfo.url}/assets/touch/chrome-splashscreen-icon-384x384.png`
        },
      ]
    }
  },
  css: [
    '~/assets/styles/style.css'
  ],
  routeRules: {
    // Doesn't work at all lol
    // '/:articleType': { redirect: '/:articleType()/page/1' }
    // OLD STUFF
    // '/articles': { redirect: '/articles/page/1' },
    // '/breves': { redirect: '/breves/page/1' },
  },
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
