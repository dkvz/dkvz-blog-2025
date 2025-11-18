import type { RouteLocationNormalizedGeneric } from "vue-router";

export const validatePageNumber = (route: RouteLocationNormalizedGeneric): boolean => {
  const page = Number(route.params.page)
  return page > 0 && !isNaN(page);
}

export const validateTagPage = (route: RouteLocationNormalizedGeneric): boolean => {
  let tagValid = false
  if (route.params.tag) {
    const tag = route.params.toString()
    if (tag.trim().length > 0) {
      tagValid = true
    }
  }

  return validatePageNumber(route) && tagValid
}
