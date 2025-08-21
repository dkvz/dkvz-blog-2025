# Blog engine dkvz.eu - Revamp 2025 (Nuxt)
Starting over.

I'll be using the Rest API still, keeping the older versions of the blog compatible (why???).

There's a good chance I'll be using static generation to avoid having to keep a useless Node process around on my server.

I use a `dev` branch for this project, main sometimes gets squashed merges from there.

## TODO
Just removing the items when done this time around.

- I think I have to change how I color icons if I'm to use the CSS ones 
- Do I need "alt" on icons?
- Do we still need the ._js-only CSS class in its noscript block?
- Added NuxtLoadingIndicator to the layout but no idea if it works or ruins the layout itself
- Does the build process minify CSS?
- We should make dark mode preference work without JS by adding the relevant media query and duplicating a bunch of styles and variables
- Shadows shouldn't become bright white on dark mode I think it's a design faux pas
- HTML comments in pages should be removed at some point.
- Don't forget to add my robots.txt
- Footer links leave an empty spot on the right on medium screen, should space it better?
- Swap the search SVG for an icon

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

