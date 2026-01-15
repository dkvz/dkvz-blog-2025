<script setup lang="ts">
import { useHideHeaderOnScroll } from '~/composables/useHideHeaderOnScroll'
import tags from '~~/data/tags.json'

const isMenuOpened = ref(false)
const typeCheckbox = useTemplateRef("type-checkbox")
const header = useTemplateRef("header")
const menuDiv = useTemplateRef("menu-div")

const {
  isSticky,
  startDynamicHeader,
  opacity,
  transform
} = useHideHeaderOnScroll(header)

const menuText = computed(() => isMenuOpened.value ? "Fermer" : "Menu")

// I don't know why but I really want to remove the event 
// listener when not needed. I could just keep it around.
const escMenuCallback = (e: any) => {
  if (e.key === 'Escape') {
    window.removeEventListener("keydown", escMenuCallback)
    closeTagsMenu()
    isMenuOpened.value = false
  }
}

const closeTagsMenu = () => {
  if (typeCheckbox.value !== null) {
    typeCheckbox.value.checked = false
    menuDiv.value?.removeEventListener("click", closeTagsMenu)
  }
}

const onMenuCheckboxChange = () => {
  // Bind Esc on the whole window to close the menu
  window.addEventListener("keydown", escMenuCallback)
}

const onMenuItemClick = (e: any) => {
  // Don't hide the menu if we're clicking on the articles 
  // button that show the article tags / catergories
  if (e.target.getAttribute("data-close") !== null) {
    isMenuOpened.value = false
    // Also close the article tags submenu.
    // Why am I doing it with a template ref this time?
    // It's easier than the vue way.
    closeTagsMenu()
  }
}

const onArticleTypesCheckboxChange = (e: any) => {
  // Bind clicking outside the panel to close it
  if (e.target.checked === true) {
    menuDiv.value?.addEventListener("click", closeTagsMenu)
  } else {
    menuDiv.value?.removeEventListener("click", closeTagsMenu)
  }
}

// TODO: I believe this should be in the composable itself, 
// alongside something to clean it up when unmounted
onMounted(() => {
  startDynamicHeader()
})

</script>

<template>
  <aside class="header" :class="{ 'header--sticky': isSticky || isMenuOpened }"
    :style="isMenuOpened ? {} : { opacity: opacity, transform: transform }" ref="header">
    <NuxtLink class="header__title" to="/">Le BdGC <span class="text text-smaller">de DkVZ</span></NuxtLink>
    <label class="menu-btn input" :class="{ open: isMenuOpened }" tabindex="0" aria-controls="menu"
      aria-label="Afficher ou fermer le menu" for="menu-checkbox">
      <svg class="menu-btn__icon" viewBox="0 0 7 7">
        <rect class="line-1" y="0" width="7" height="1"></rect>
        <rect class="line-2" y="3" width="7" height="1"></rect>
        <rect class="line-3" y="6" width="7" height="1"></rect>
      </svg>
      <span>{{ menuText }}</span>
    </label>

    <input @change="onMenuCheckboxChange" class="invisible" v-model="isMenuOpened" type="checkbox" id="menu-checkbox"
      name="menu-checkbox">
    <div id="menu" ref="menu-div">
      <nav class="menu">
        <div class="section-title">
          <h1 class="section-title__big-title">Menu</h1>
        </div>
        <ul class="menu__list" @click="onMenuItemClick">
          <li>
            <NuxtLink to="/" data-close>
              <Icon name="uil:home-alt" />
              Accueil
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/search" data-close>
              <Icon name="uil:search" />
              Rechercher
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/breves/page/1" data-close>
              <Icon name="uil:comment-alt-lines" />
              Brèves
            </NuxtLink>
          </li>
          <li class="relative">
            <label for="type-checkbox" aria-controls="article-types">
              <div>
                <Icon name="uil:book-open" />
                <span>Articles</span>
              </div>
              <div>
                <span>|</span>
                <Icon name="uil:angle-down" />
              </div>
            </label>
            <input @change="onArticleTypesCheckboxChange" ref="type-checkbox" type="checkbox" class="toggle-checkbox"
              id="type-checkbox">
            <div class="list-wrap floating-menu" id="article-types">
              <b>
                <NuxtLink to="/articles/page/1" data-close>Tous les articles</NuxtLink>
              </b>
              <NuxtLink v-for="tag in tags" :key="tag.id" data-close
                :to="{ name: 'tag-tag-page-page', params: { page: 1, tag: tag.name } }">
                {{ tag.name }}
              </NuxtLink>
            </div>
          </li>
          <li>
            <NuxtLink to="/about" data-close>
              <Icon name="uil:question-circle" />
              A propos
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/contact" data-close>
              <Icon name="uil:mailbox" />
              Contact
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/hireme" data-close>
              <Icon name="uil:euro" />
              Engagez-moi
            </NuxtLink>
          </li>
        </ul>
        <div class="menu__socials">
          <a href="https://bsky.app/profile/dkvz.eu" target="_blank" rel="noopener noreferrer"
            title="Mon compte Bluesky"><svg class="socials" viewBox="0 0 600 600">
              <path
                d="m135.72 44.03c66.496 49.921 138.02 151.14 164.28 205.46 26.262-54.316 97.782-155.54 164.28-205.46 47.98-36.021 125.72-63.892 125.72 24.795 0 17.712-10.155 148.79-16.111 170.07-20.703 73.984-96.144 92.854-163.25 81.433 117.3 19.964 147.14 86.092 82.697 152.22-122.39 125.59-175.91-31.511-189.63-71.766-2.514-7.3797-3.6904-10.832-3.7077-7.8964-0.0174-2.9357-1.1937 0.51669-3.7077 7.8964-13.714 40.255-67.233 197.36-189.63 71.766-64.444-66.128-34.605-132.26 82.697-152.22-67.108 11.421-142.55-7.4491-163.25-81.433-5.9562-21.282-16.111-152.36-16.111-170.07 0-88.687 77.742-60.816 125.72-24.795z" />
            </svg></a>
          <a href="https://x.com/MrSausageroll" target="_blank" rel="noopener noreferrer"
            title="Mon compte Twitter"><svg class="socials" viewBox="0 0 512 512">
              <path
                d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
            </svg></a>
          <a href="https://github.com/dkvz" target="_blank" rel="noopener noreferrer" title="Mon compte Github"><svg
              class="socials" viewBox="0 0 496 512">
              <path
                d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
            </svg></a>
        </div>
      </nav>
    </div>

  </aside>
  <header class="hero">
    <div class="hero__inner">
      <PlaceholderSvg src="/assets/shrimp_plain1.svg" img-class="hero__img hero__img--v1"
        alt="Une crevette vectorielle">
        <svg class="hero__img hero__img--v1" viewBox="0 0 587.5 386.1">
          <g fill="none" stroke="#000">
            <path
              d="m8.761 125.5s39.02-50.21 131.9-55.45c92.85-5.238 243.3-8.839 243.3-8.839s260.6-14.45 193.2 187.4c-67.48 201.8-323.3 107.4-323.3 107.4l-42.04-51.56 1.912-8.809s155.8 13.05 171.7 38.7c15.84 25.66 64.48-96.56 64.48-96.56s-38.02-61.14-74.13-45.8c-36.11 15.34-339.4-38.07-339.4-38.07s-32.77-2.435-27.47-28.42"
              stroke-width="1.875" />
            <ellipse cx="84.63" cy="89" rx="12.61" ry="9.085" stroke-width="1.875" />
            <path d="m15.26 146.6s118.7-4.896 125.4-33.02" stroke-width="1.875" />
          </g>
        </svg>
      </PlaceholderSvg>
      <PlaceholderSvg src="/assets/shrimp_plain2.svg" img-class="hero__img hero__img--v2"
        loaded-class="hero__img--v2-loaded" alt="Une crevette vectorielle">
        <svg class="hero__img hero__img--v2" viewBox="0 0 216.5 117.7">
          <g transform="translate(-137 -93.78)">
            <path
              d="m162.8 143.1c34.08-5.722 26.66-10.79 26.66-10.79m-16.41-8.322a3.018 3.018 0 0 1-3.018 3.018 3.018 3.018 0 0 1-3.018-3.018 3.018 3.018 0 0 1 3.018-3.018 3.018 3.018 0 0 1 3.018 3.018zm77.22 77.5s-13.44-23.57-0.7071-22.63c12.73 0.9428 45.49 13.67 45.49 13.67l27.98-6.439s-1.309-29.01-35.15-38.51c-33.84-9.5-50.58 1.107-50.58 1.107s-19.6 18.99-74.5-5.592c0 0-29.17-2.189-25.42-10.79 3.752-8.602 29.16-7.136 29.16-7.136s-1.652-8.133 20.65-7.039c22.3 1.095 106.2-8.535 106.2-8.535m27.33 97.55s-5.186 12.73-70.48-5.657m43.14-91.89s61.97-3.407 59.85 44.48c-2.113 47.89-32.52 53.07-32.52 53.07"
              fill="none" stroke="#000" stroke-width=".5292" />
          </g>
        </svg>
      </PlaceholderSvg>
    </div>
    <div class="hero__mid flex-center">
      <h1 class="main-title">Blog des Gens <span class="main-title__highlight">Compliqués</span></h1>
    </div>
    <div class="hero__bottom">
      <ClientOnly>
        <ThemeSwitcher />
      </ClientOnly>
    </div>
  </header>
</template>
