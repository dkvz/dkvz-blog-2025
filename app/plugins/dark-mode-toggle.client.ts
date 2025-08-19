import { DarkModeToggle } from "dark-mode-toggle"

export default defineNuxtPlugin(() => {
  customElements.define('dark-mode-toggle', DarkModeToggle)
})
