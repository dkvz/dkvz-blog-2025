export default defineNuxtPlugin(async () => {
  // Apparently we don't need to run customElements.define.
  //customElements.define('dark-mode-toggle', DarkModeToggle)
  await import("dark-mode-toggle")
})
