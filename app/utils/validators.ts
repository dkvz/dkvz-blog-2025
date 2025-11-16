import type { RouteLocationNormalizedGeneric } from "vue-router";

export const validatePageNumber = (route: RouteLocationNormalizedGeneric): boolean => {
  const page = Number(route.params.page)
  return page > 0 && !isNaN(page);
}
