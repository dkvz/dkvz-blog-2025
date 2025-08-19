// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/icon'],
  app: {
    head: {
      title: "Blog des gens compliqués",
      htmlAttrs: {
        lang: "fr"
      }
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
})
