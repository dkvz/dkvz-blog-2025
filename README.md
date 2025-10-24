# Blog engine dkvz.eu - Revamp 2025 (Nuxt)
Starting over.

I'll be using the Rest API still, keeping the older versions of the blog compatible (why???).

There's a good chance I'll be using static generation to avoid having to keep a useless Node process around on my server.

I use a `dev` branch for this project, main sometimes gets squashed merges from there.

## TODO
Just removing the items when done this time around.

- For some reason the intersection placeholder doesn't trigger in dev mode half or the time, sometimes seems to get stuck disabled - Maybe I have to watch the placeholder ref or something?
- My dialogs need some animating, [the MDN article has info about it](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog)
- Test all the dialog stuff on Firefox, not super sure about the positionning antics
- Use the comment I return from CommentDialog and add it to the list immediately?
- The comment dialog should not resize when the warning message appears
- It's a backend issue but the post dates for comments are wrong
- Missing styling for hr
- Table of content is a bit too tight
- Evaluate things like reading time and ToC from within the useFetch so we keep the spinner around during computation
- Test visiting two articles and going back then forward in history - I see weird big black and white boxes in dev mode (might not be in the prod build)
- Isn't the spinner too big on mobile?
- Need to check all of my snippets and the CSS classes they're using to recreate or adapt everything
- Are unused CSS classes still included in the bundle?
- Do I set a background color as fallback somewhere? Force scrolling up or down in Firefox is showing white (might be normal)
- Effects to add back in: intersection observers on cards, titles and images
- Is there something to lower animation load on low spec machines? I've head of a property doing something like that
- At some point an overlay was drawn when the menu was open, should we bring that back?
- I need a blur transition for PlaceholderSvg, can probably be done using transition
- Implement the title template and title antics
- Should probably remove NuxtLoadingIndicator, I don't think it's gonna work out
- Create woff or woff2 versions of the fonts?
- No idea what to use as local() src for my fonts
- Does the build process minify CSS?
- We should make dark mode preference work without JS by adding the relevant media query and duplicating a bunch of styles and variables
- Shadows shouldn't become bright white on dark mode I think it's a design faux pas
- HTML comments in pages should be removed at some point.
- Footer links leave an empty spot on the right on medium screen, should space it better?
- Create the go to top button (could use `btn-highlight`)
- Add icons to every menu entry - Make sure it works on mobile screens
- Can I put the article tags back into the menu? Maybe as an accordion?
- The title generating function should be in siteInfo and not in app.vue so I can also use it in error.vue which is doing its own title generation
- Delete the fake article I created at some point from the backend using the delete endpoint

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

## Article snippets to remember

### New image snippet
```html
<div class="center-image">
    <img-lightbox class="article-image">
        <a href="/assets/gilleshead_350.png" target="_blank" rel="noopener noreferrer">
            <img src="/assets/gilleshead_350.png" alt="C'est Gilles. Je pense.">
        </a>
    </img-lightbox>
</div>
```

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

For the og and twitter metas I need the full website URL, to replace in some of the values below with some variable.

There's other repeat data in there that should be in a global thing. Apparently there's a SEO module that's supposed to auto-append your configured site URL to absolute URLs in meta tags that need it.

In the end I just put redundant site info in `./data/site-info.ts` that can be re-used both in the Nuxt config or wherever the client might need it in some page or composable.

I'm going to use these for now:

```html
<meta name="image" property="og:image" content="https://dkvz.eu/assets/touch/chrome-splashscreen-icon-384x384.png">
<meta property="og:type" content="website">
<meta property="og:title" content="dkvz.eu - Blog des gens compliqués">
<meta property="og:description" content="Blog expérimental d'un humble consultant en progress-bars.">
<meta property="og:url" content="https://dkvz.eu">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="dkvz.eu - Blog des gens compliqués">
<meta name="twitter:site" content="@MrSausageroll">
<meta name="twitter:description" content="Blog expérimental d'un humble consultant en progress-bars.">
<meta name="twitter:image" content="https://dkvz.eu/assets/touch/chrome-splashscreen-icon-384x384.png">
```

## Comments
I'll keep infinite scrolling for loading more but we'll have some initial comments rendered with the response, mostly because I think search engines might like the comments I got on the blog.

- Add the "captcha" back to the form

