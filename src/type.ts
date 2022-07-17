export type Image = {
  url: string
  link: string
  title: string
}

export type Item = {
  content: string
  contentSnippet: string
  creator: string
  guid: string
  isoDate: string
  link: string
  pubDate: string
  title: string
}

export type Info = {
  title: string
  description: string
  generator?: string
  link: string
  feedUrl: string
  language: string
  copyright: string
  lastBuildDate: string

  image: Image
  items: Item[]
}
