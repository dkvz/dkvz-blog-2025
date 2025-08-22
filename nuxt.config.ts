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
      meta: [
        { name: "theme-color", content: "#184160" }
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
