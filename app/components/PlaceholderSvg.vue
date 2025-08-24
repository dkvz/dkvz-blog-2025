<script setup lang="ts">
// TODO: This component will not react to a new src getting applied.

const props = defineProps<{
  src: string,
  imgClass?: string,
  loadedClass?: string,
  alt?: string,
}>()

const svgSlot = useTemplateRef("svg-slot")
const loaded = ref(false)
const viewBox = ref<string | undefined>()
const svgContent = ref("")

// Should only run on client but I could also make it
// react to the src prop change, which it does not.
onMounted(async () => {
  // Let a possible error bubble up here
  // oFetch will throw an error if the request
  // fails.
  if (!svgSlot.value) return
  const resp: string = await $fetch(
    props.src,
    { parseResponse: (txt) => txt }
  )

  const temp = document.createElement("div")
  temp.innerHTML = resp
  const svgEl = temp.firstElementChild
  if (svgEl !== null && svgEl.nodeName === "svg") {
    // Duplicate the viewBox:
    const newVb = svgEl.getAttribute("viewBox")
    if (newVb) viewBox.value = newVb
    svgContent.value = svgEl.innerHTML
  }

  loaded.value = true
})
</script>

<template>
  <noscript data-allow-mismatch="children">
    <img :class="props.imgClass" :src="props.src" :alt="props.alt">
  </noscript>
  <div v-if="!loaded" ref="svg-slot" class="_js-only flex-center h-full">
    <slot></slot>
  </div>
  <svg v-else :viewBox="viewBox" :class="`_js-only ${props.imgClass || ''} ${props.loadedClass || ''}`"
    v-html="svgContent"></svg>
</template>
