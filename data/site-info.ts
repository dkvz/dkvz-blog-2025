// Do not add trailing slash on any URLs or things 
// might break
export const siteInfo = {
  url: "https://dkvz.eu",
  description: "Blog expérimental d'un humble consultant en progress-bars.",
  articleDescription: "Article provenant du célèbre blog dkvz.eu",
  title: "Blog des gens compliqués",
  titleTemplate: (titleChunk: string | undefined) => {
    return titleChunk ? `${titleChunk} | ${siteInfo.title}` : `${siteInfo.title}`
  },
  // No leading slash for these, we add them when needed:
  shortRootUrl: "breves",
  shortApiDescription: "shorts",
  articleRootUrl: "articles",
  maxComments: 10,
  maxArticles: 8,
  maxShorts: 14
}
