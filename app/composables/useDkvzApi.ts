// Supposed to behave like useFetch
export const useDkvzApi: typeof useFetch = (request, opts?) => {
  const config = useAppConfig()

  const base = config.dkvzApiUrl
  if (!base) {
    throw new Error("Missing dkvzApiUrl app config string")
  }

  return useFetch(request, { baseURL: base as string, ...opts })
}
