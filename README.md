# Blog engine dkvz.eu - Revamp 2025 (Nuxt)
Starting over.

I'll be using the Rest API still, keeping the older versions of the blog compatible (why???).

There's a good chance I'll be using static generation to avoid having to keep a useless Node process around on my server.

I use a `dev` branch for this project, main sometimes gets squashed merges from there.

## TODO
Just removing the items when done this time around.

- Implement the title template and title antics
- Do I need "alt" on icons?
- Added NuxtLoadingIndicator to the layout but no idea if it works or ruins the layout itself
- Create woff or woff2 versions of the fonts?
- No idea what to use as local() src for my fonts
- Does the build process minify CSS?
- We should make dark mode preference work without JS by adding the relevant media query and duplicating a bunch of styles and variables
- Shadows shouldn't become bright white on dark mode I think it's a design faux pas
- HTML comments in pages should be removed at some point.
- Don't forget to add my robots.txt
- Footer links leave an empty spot on the right on medium screen, should space it better?
- Create the go to top button (could use `btn-highlight`)
- Review other meta tags I'm missing (manifest.json?)

## Running the project
Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

```bash
# pnpm
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# pnpm
pnpm dev
```

## Production

Build the application for production:

```bash
# pnpm
pnpm build
```

Locally preview production build:

```bash
# pnpm
pnpm preview
```

# Theme switcher woes
The `dark-mode-toggle` web component needs to have two link tags in head with media queries to work. It will then work even without JS (user preference won't work).

However there's apparently no way to easily set a bundled asset into a header link tag with Nuxt. What I'd like to do is sort of discussed [in this issue](https://github.com/nuxt/nuxt/issues/14681) and is still open.

Plan B would be to convert everything to "class-based-dark-theme" and use the [official module](https://color-mode.nuxtjs.org/) but it seems to have more bloat code and doesn't work without JS. It's also less portable.

Both solutions can have a flash of changing themes when the user preference theme (uses localStorage for `dark-mode-togger`) does not match the system theme.

Got two things to try:
- Does the official module work without JS?
- Can we use the "workarounds" provided in the Github issue above?

## Useful links
- [Icon list](https://icones.js.org/)

## CSS naming and bloat
I initially used BEM to prototype the "design" and then went on to use CSS layers and other advanced features so that BEM is really more of a hindrance now.

I'll keep some of the initial BEM styling but new styles shouldn't follow any specific convention.

## Meta tags and stuff
No idea what I should use, let's review some candidates:

```html
<link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml">
<link rel="shortcut icon" href="/favicon.png" type="image/png">
<link rel="alternate" type="application/rss+xml" href="https://dkvz.eu/rss.xml" title="Flux RSS de dkvz.eu">
```
The "shortcut" before icon is allowed for historical reasons but I think I'll remove it.

Was in the previous site:
```html
<link rel="icon" sizes="192x192" href="/assets/touch/chrome-touch-icon-192x192.png">
<link rel="apple-touch-icon" href="/assets/touch/apple-touch-icon.png">
<meta name="description" content="Blog expérimental d'un humble consultant en progress-bars.">
```


