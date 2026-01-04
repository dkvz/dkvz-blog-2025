# Blog engine dkvz.eu - Revamp 2025 (Nuxt)
Starting over.

I'll be using the Rest API still, keeping the older versions of the blog compatible (why???).

There's a good chance I'll be using static generation to avoid having to keep a useless Node process around on my server.

I use a `dev` branch for this project, main sometimes gets squashed merges from there.

## Static assets
This repo doesn't have most of my website's static assets, referenced in the `/wp-content` or `/stuff` directories.

## Configuration
I got config items in multiple spaces:
- `app/app.config.ts` - Holds the API URL, might be the public one or localhost-something.
- `data/site-info.ts` - Should have all the remaining config items.

## Static generation
Nitro has to be able to crawl every single link, and there shouldn't be any loop. Otherwise we have to declare every single route to generate and I'd like to avoid that.

At the moment it will fail when encountering 404 errors so I have to either fix all of my dead links or add entries to the `ignore` section of the `nitro.prerender` section of `nuxt.config.ts`.

That process is not very robust but the only "workaround" is to completely disable prerender errors. Apprently [an issue](https://github.com/nitrojs/nitro/issues/1569) is still open about it.

A few things require configuration at the front HTTP server level:
- 404 and generic errror page - Check that it works with static assets
- Copy rss.xml to website root
- Download or link sitemap.xml
- Link the actual `wp-content` and `stuff`

Procedure for generating on server:
- Run `npx nuxi generate`
- Move `.output/public` to the new static serving directory
- Perform operations listed above

## TODO
Just removing the items when done this time around.

- Social icons in menu have no links and bluesky should replace twitter
- Smooth scrolling is being weird when navigating client-side from a page already scrolled a good bit, then opening an article from there
- When searching from index page, allow "back" to bring the regular index - Not sure how to do this
- Components meant for client side only can be named using .client.vue, maybe I should do that?
- In the menu, the background highlight on hover is invisible on the floating tags submenu
- Instead of not using v-html for search results ShortCard I should sanitize most tags on the backend, looks like a is already removed?
- When the menu is open we could lower the opacity of the permanently-sticky header
- Navigating to a non-existing tag using a NuxtLink client-side show the spinner forever (it works fine with SSR -> Show the 404 page) - Might not be an issue "in prod"
- Got h1 elements for article and short cards titles - Didn't I decide to have only one h1 per page? Do we care?
- The calls to `useState` in `[page].vue` might not work with static generation - Is the sort order kept between pages? Should try using query in NuxtLink
- Check the myriad todos inside the code
- Are unused CSS classes still included in the bundle? -> They are. How can we tree-shake the CSS? [Check this out](https://purgecss.com/guides/nuxt.html)
- At some point an overlay was drawn when the menu was open, should we bring that back?
- I need a blur transition for PlaceholderSvg, can probably be done using transition
- Create woff or woff2 versions of the fonts?
- No idea what to use as local() src for my fonts
- We should make dark mode preference work without JS by adding the relevant media query and duplicating a bunch of styles and variables
- Delete the fake article I created at some point from the backend using the delete endpoint
- I think that's fine but loading to the very end of articles or shorts on the index leads to the button showing the spinner but not adding any article and not showing that it's the end of it
- Add some error message when the API is down on the index page

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

## Theme switcher woes
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

## Syntax highlighting
We'll use Shiki this time around and try to also syntax highlight server-side.

There's a nuxt module but I'd like to try having better code splitting and only syntax highlight in the actual article page.

Previous blog uses highlight.js with the `atom-one-dark` theme.

## The tags problem
The client-only blog used to fetch the tags once when loading, for every single client.

It now feels quite inefficient knowing my tags (more like categories, really) do not change often.

The new plan will be saving them as json in `/data` and just use that.

Maybe the build process can attempt to update them.

For now I'll just use curl from the data directory:
```
curl https://api.dkvz.eu/tags > tags.json
```
