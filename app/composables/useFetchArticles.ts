
// Planned to extend the FetchOptions but it's just TypeScript hell
// I'll pass

import type { AsyncDataRequestStatus } from "#app"

export interface UseFetchArticlesOptions {
  // The article type as the API sees it (e.g. "shorts")
  articleType: string,
  page: number,
  maxItems: number,
  isOrderAsc: Ref<boolean> | undefined,
  tag?: string
}

export interface UseFetchArticlesResponse {
  articles: Ref<Article[] | undefined>,
  status: Ref<AsyncDataRequestStatus>,
  lastPage: Ref<number | null>
}

export const useFetchArticles = async (opts: UseFetchArticlesOptions): Promise<UseFetchArticlesResponse> => {
  // Required to be state because the client doesn't re-run the fetch 
  // the first time and thus doesn't know about the last page from that
  // request.
  const lastPage = useState<number | null>("lastPage", () => null)

  const url = computed(
    () => {
      const start = (opts.page - 1) * opts.maxItems
      const order = (opts.isOrderAsc && opts.isOrderAsc.value) ? "asc" : "desc"

      let url = `/${opts.articleType}-starting-from/${start}?max=${opts.maxItems}&order=${order}`
      if (opts.tag) {
        // API allows multiple tags but the site only allows 1.
        // Yeah whatever, no one uses the tags page
        url += `&tags=${encodeURIComponent(opts.tag)}`
      }
      return url
    }
  )

  const { data: articles, status, error } = await useDkvzApi<Article[]>(
    url,
    {
      lazy: true,
      deep: false,
      // The last page is a header from the response because 
      // I wanted this to be a challenge.
      onResponse({ response }) {
        const link = response.headers.get("link")
        if (link) {
          // We could have multiple ones in the response.
          // Guess I should already have the code to parse
          // all the links but only use the "last" one.
          const links = link.split(",")
          for (const l of links) {
            if (l.includes("rel=\"last\"")) {
              // Attempt to extract the last offset from it:
              const lp = extractLastPageFromLink(l)
              // Being past the last page will redirect to a 404 page
              lastPage.value = Math.floor(lp / opts.maxItems) + 1
              break;
            }
          }
        }
      }
    }
  )

  // We force redirect in case of error and thus do not
  // display it in the page below which as nothing to 
  // show for non-success (or loading) states.
  watch(error, (err) => {
    if (status.value === "error") {
      console.log("Got articles listing error: ", err)
      if (err && err.statusCode !== 404) {
        throw createError({
          statusCode: 500,
          statusMessage: 'Encountered unexpected error',
          fatal: true
        })
      } else {
        throw createError({
          statusCode: 404,
          statusMessage: 'Article not found',
          fatal: true
        })
      }
    }
  }, {
    // watch doesn't tigger at all server side unless we make
    // it "immediate", so this is required for server side 
    // errors to work.
    immediate: true
  })

  return {
    lastPage,
    articles,
    status
  }
}
