import type { RouteLocationNormalizedGeneric } from "vue-router";

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
