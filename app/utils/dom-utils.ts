// Code here is only relevant to client side, 
// maybe it should be a plugin or something.

/** Reveal animation on cards **/

const revealClass = "scale-up"

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

const transitionAttr = "data-transition"

const onScrollReveal: IntersectionObserverCallback = (entries, observer) => {
  let inViewCount = 0
  for (const entry of entries) {
    if (entry.isIntersecting) {
      // For my use case I'd like to stop observing here
      const tg = entry.target as HTMLElement
      observer.unobserve(tg)
      tg.style.animationDelay = (inViewCount * 0.15) + 's'
      tg.classList.add(revealClass)
      // Need to add an event to remove the class because the 
      // opacity from the end of the animation is creating
      // a stacking context which messes up with img-lightbox's
      // overlay.
      tg.addEventListener("animationend", (e: any) => {
        e.target.classList.remove(revealClass)
      })
      inViewCount++
    }
  }
}

// Look for element with the "card" class and register
// intersectionObserver on them
export const registerCardRevealObservers = (containers: HTMLElement[], dataTransitionOnly: boolean = false) => {
  if (containers.length > 0) {
    const revealObserver = new IntersectionObserver(onScrollReveal, revealOptions)
    for (const container of containers) {
      const cards = container.querySelectorAll('.card')
      cards.forEach(c => {
        if (!dataTransitionOnly || (dataTransitionOnly && c.getAttribute(transitionAttr) === "true")) {
          revealObserver.observe(c)
        }
      })
    }
  }
}
