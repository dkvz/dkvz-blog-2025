import type { ShallowRef } from "vue"

interface UseHideHeaderOnScrollOptions {
  stickyFactor?: number,
}

// I thought I could make it work with a scrolling element
// that isn't window but pageYOffset doesn't exist on other
// elements. Or at least Typescript is telling me so.
export const useHideHeaderOnScroll = (
  headerElement: Readonly<ShallowRef<HTMLElement | null>>,
  options?: UseHideHeaderOnScrollOptions
) => {
  if (!options) options = {}
  // stickyFactor is how many times the height of the header has
  // to be scrolled before it gets hidden.
  const { stickyFactor = 6 } = options
  // Value used if getBoundingClientRect doesn't exist on browser
  // (I don't think the blog works on these browsers anyway)
  const defaultHeaderHeight = 150

  const isSticky = ref(false)
  const opacity = ref(1)
  const transform = ref("")

  // I can't compute these now because the header ref
  // might not exist yet or we might be running on the
  // server or god knows what
  let stickT = 0
  let hideT = 0

  const onScroll = () => {
    if (isSticky.value &&
      (window.pageYOffset > hideT ||
        window.pageYOffset <= stickT)) {
      // Hide the menu (reset its position)
      transform.value = 'scaleY(0)'
      setTimeout(() => {
        transform.value = ''
        isSticky.value = false
      }, 400)
    } else if (!isSticky.value &&
      window.pageYOffset > stickT &&
      window.pageYOffset <= hideT) {
      // Sticky the menu
      // TODO: I don't know if this is necessary:
      opacity.value = 0.4
      setTimeout(() => opacity.value = 1, 300)
      isSticky.value = true
    }
  }

  const startDynamicHeader = () => {
    if (headerElement.value) {
      stickT = headerElement.value.getBoundingClientRect ?
        headerElement.value.getBoundingClientRect().height :
        defaultHeaderHeight
      hideT = stickT * stickyFactor
      window.addEventListener('scroll', onScroll)
    }
  }

  // You're supposed to clean up composables on unmount:
  onUnmounted(() => window.removeEventListener('scroll', onScroll))

  // opacity and transform should be set to override 
  // these values in the style attribute
  return {
    isSticky,
    opacity,
    transform,
    startDynamicHeader
  }
}
