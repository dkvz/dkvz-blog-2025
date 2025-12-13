export { Article, Tag, Comment, SearchResult }

declare global {
  interface Tag {
    name: string,
    id: number
  }

  interface Article {
    title: string,
    summary: string,
    date: string,
    thumbImage: string,
    author: string,
    commentsCount: number,
    id: number,
    articleURL: string,
    content: string,
    tags: Tag[],
    articleExtras?: ArticleExtras
  }

  // Extra elements I compute when an article is received
  // from the API
  interface ArticleExtras {
    readingTimeStr: string,
    // Table of content
    toc: string
  }

  interface UIArticle extends Article {
    transition?: boolean
  }

  interface Comment {
    id: number,
    author: string,
    date: string,
    comment: string
  }

  interface SearchResult {
    id: number,
    title: string,
    articleURL: string,
    snippet: string
  }
}
