# To check
- [ ] I think I have to change how I color icons if I'm to use the CSS ones (otherwise there's `mode="svg"`)
- [ ] Do I need "alt" on icons?
- [ ] Does @custom-media really work without installing anything?
- [ ] Added NuxtLoadingIndicator to the layout but no idea if it works or ruins the layout itself
- [ ] Does the build process minify CSS?

# Theme switcher woes
The `dark-mode-toggle` web component needs to have two link tags in head with media queries to work. It will then work even without JS (user preference won't work).

However there's apparently no way to easily set a bundled asset into a header link tag with Nuxt. What I'd like to do is sort of discussed [in this issue](https://github.com/nuxt/nuxt/issues/14681) and is still open.

Plan B would be to convert everything to "class-based-dark-theme" and use the [official module](https://color-mode.nuxtjs.org/) but it seems to have more bloat code and doesn't work without JS. It's also less portable.

Both solutions can have a flash of changing themes when the user preference theme (uses localStorage for `dark-mode-togger`) does not match the system theme.

Got two things to try:
- Does the official module work without JS?
- Can we use the "workarounds" provided in the Github issue above?

# Blog engine dkvz.eu - Revamp 2025 (Nuxt)

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

