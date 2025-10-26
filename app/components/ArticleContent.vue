<script setup lang="ts">
const props = defineProps<{
  content?: string
}>()

const contentDiv = useTemplateRef("content-div")

// Don't ask me what this is I forgot
const steps = 5
const incr = 1.0 / steps
const revThres: number[] = []
for (let i = 1; i <= steps; i++) {
  revThres.push(incr * i)
}

const requiresPlaceholder = (node: Element) =>
  node.tagName === "H1" || node.tagName === "H2"
// Has to be uppercase for browser API reasons of the past:
const placeholderTag = "HR"

// Thought I needed onUpdated but it looks like onMounted
// is called everytime I need to update all of these completely
// over the top intersection observers. Cool.
onMounted(async () => {
  if (contentDiv.value !== null) {

    const artImgs = contentDiv.value.querySelectorAll(".article-image")

    const imgObserver = new IntersectionObserver((entries: any, observer) => {
      for (const en of entries) {
        if (en.isIntersecting) {
          en.target.style.opacity = en.intersectionRatio
          if (en.intersectionRatio === 1) {
            observer.unobserve(en.target)
          }
        }
      }
    },
      { threshold: revThres }
    )

    for (const img of artImgs) {
      img.classList.add("to-reveal")
      imgObserver.observe(img)
    }

    const titles = contentDiv.value.querySelectorAll(
      "h1, h2, h3, h4"
    )

    const titleObserver = new IntersectionObserver((entries, observer) => {
      for (const en of entries) {
        if (en.isIntersecting === true) {
          const elementRef = en.target.tagName === placeholderTag ?
            en.target.nextSibling as HTMLElement : en.target as HTMLElement

          if (!elementRef.getAttribute("data-animated")) {
            elementRef.classList.add("pre-animate-transition")
            elementRef.setAttribute("data-animated", "true")
            // WE CAN UNOBSERVE A TRANSFORMED ITEM
            observer.unobserve(en.target)
            elementRef.style.opacity = "1"
            elementRef.style.transform = `rotate(${0}deg) translate(0%, 0%)`
          }
        }
      }
    },
      {
        threshold: 0.25,
        root: document
      })

    for (const t of titles) {
      t.classList.add("pre-animate")
      if (requiresPlaceholder(t)) {
        // Special animation with placeholders for h1 and h2:
        const ph = document.createElement(placeholderTag)
        // Hidden doesn't work with intersection obs but 
        // CSS visibility hidden does. OKAY
        //ph.hidden = true
        ph.classList.add("animation-placeholder")
        contentDiv.value.insertBefore(ph, t)
        titleObserver.observe(ph)
      } else {
        titleObserver.observe(t)
      }
    }

    // Syntax highlighting has been moved to the transform method
    // for article fetching, so it also works server-side.
    // const codeEls = contentDiv.value.querySelectorAll("code")
    // for (const c of codeEls) {
    //   const opts: any = { theme: shikiTheme }
    //   // Try to get the language:
    //   const classes = c.classList
    //   for (const cla of classes) {
    //     if (cla.startsWith("language-")) {
    //       opts.lang = cla.substring(9, cla.length)
    //       break
    //     }
    //   }
    //   if (c.textContent !== null) {
    //     const html = await codeToHtml(c.textContent, opts)
    //     // TODO: We actually need to get the pre sibling, and replace its 
    //     // outer HTML
    //     c.innerHTML = html
    //   }
    // }

  }

})

</script>

<template>
  <div ref="content-div" class="article-content" v-html="props.content">
  </div>
</template>
