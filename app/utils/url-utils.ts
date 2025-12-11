import { siteInfo } from "../../data/site-info"

// All of these are supposed to be lowercase
// Uppercase them live when needed
interface ArticleTypeParams {
  // For instance "brève"
  descriptionSingular: string,
  // For instance "brèves"
  descriptionPlural: string,
  // For instance "breves"
  urlPart: string,
  // For instance "shorts" (always in english)
  apiDescription: string
}

// TODO: These values should be in site-info.
export const paramsForArticleType = (isShort: boolean): ArticleTypeParams => {
  if (isShort) {
    return {
      urlPart: siteInfo.shortRootUrl,
      descriptionSingular: "brève",
      descriptionPlural: "brèves",
      apiDescription: siteInfo.shortApiDescription
    }
  }

  return {
    urlPart: siteInfo.articleRootUrl,
    descriptionSingular: "article",
    descriptionPlural: "articles",
    apiDescription: siteInfo.articleRootUrl
  }
}

export const extractLastPageFromLink = (link: string): number => {
  const reg = /.+\/(\d+)/
  const m = link.match(reg)
  if (m && m.length > 1) return Number(m[1])
  return 0
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
