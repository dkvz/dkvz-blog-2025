// Code here is only relevant to client side, 
// maybe it should be a plugin or something.

import type { ShallowRef } from "vue"

/** Reveal animation on cards **/
const revealOptions = {
  // It's actually the default (replace with scrolling element):
  root: document,
  // Serves in intersection calculations, fiddle 
  // with it if you have to; I hope you don't.
  rootMargin: "0px",
  // From 0 to 1.0 -> Percentage of elment that needs 
  // to be showing to trigger the callback.
  // Can actually be an array to trigger the callback
  // at multiple reveal points (progression).
  threshold: 0.03,
}

const onScrollReveal: IntersectionObserverCallback = (entries, observer) => {
  let inViewCount = 0
  for (const entry of entries) {
    if (entry.isIntersecting) {
      // For my use case I'd like to stop observing here
      const tg = entry.target as HTMLElement
      observer.unobserve(tg)
      tg.style.animationDelay = (inViewCount * 0.15) + 's'
      tg.classList.add('scale-up')
      inViewCount++
    }
  }
}

// Look for element with the "card" class and register
// intersectionObserver on them
export const useCardRevealAnimations = (containers: Readonly<ShallowRef<HTMLElement | null>>[]) => {
  onMounted(() => {
    if (containers.length > 0) {
      const revealObserver = new IntersectionObserver(onScrollReveal, revealOptions)
      for (const container of containers) {
        if (container.value !== null) {
          const cards = container.value.querySelectorAll('.card')
          cards.forEach(c => revealObserver.observe(c))
        }
      }
    }
  })
}

