import { siteInfo } from "../../data/site-info"

// Fast way to know if we're on a "breves" page instead
// of article, but might false positive if "breves" is 
// in the article slug.
export const isShortsPage = (path: string): boolean => {
  return path.indexOf(`/${siteInfo.shortRootUrl}`) == 0
}

export const articleUrlFor = (article: Article, absolute = false): string => {
  let url
  if (!article.articleURL || !isNaN(Number(article.articleURL))) {
    url = `${siteInfo.shortRootUrl}/${article.id}`
  } else {
    url = `${siteInfo.articleRootUrl}/${article.articleURL}`
  }
  return absolute ? `${siteInfo.url}/${url}` : `/${url}`
}
