// Fast way to know if we're on a "breves" page instead
// of article, but might false positive if "breves" is 
// in the article slug.
export const isShortsPage = (path: string): boolean => {
  return path.indexOf("/breves") == 0
}
