// import ImgLightbox from "~/assets/img-lightbox"
import ImgLightbox from "@dkvz/img-lightbox"

export default defineNuxtPlugin(() => {
  customElements.define('img-lightbox', ImgLightbox)
})
