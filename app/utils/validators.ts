import type { RouteLocationNormalizedGeneric } from "vue-router";
import { siteInfo } from "~~/data/site-info";

export const validatePageNumber = (route: RouteLocationNormalizedGeneric): boolean => {
  const page = Number(route.params.page)
  return page > 0 && !isNaN(page) && Number.isInteger(page)
}

export const validateTag = (route: RouteLocationNormalizedGeneric): boolean => {
  if (route.params.tag) {
    const tag = route.params.toString()
    if (tag.trim().length > 0) {
      return true
    }
  }
  return false
}

export const validateTagPage = (route: RouteLocationNormalizedGeneric): boolean =>
  validateTag(route) && validatePageNumber(route)

export const validateArticleType = (route: RouteLocationNormalizedGeneric): boolean => {
  if (!route.params.articleType) return false
  const articleType = route.params.articleType.toString()
  return articleType === siteInfo.articleRootUrl || articleType === siteInfo.shortRootUrl
}
