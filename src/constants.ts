import { DefaultSeoProps } from "next-seo"

export const PODCAST_RSS_FEED =
  "https://feeds.soundon.fm/podcasts/5364a71a-64f7-4690-9c56-d69c603edd85.xml"

export const PODCAST_SOUNDON_URL = "https://sndn.link/web-glitch"
export const PODCAST_APPLE_PODCAST_URL =
  "https://podcasts.apple.com/podcast/1635018501"

export const DEFAULT_SITE_TITLE = "網頁雜頻"

export const SITE_HOST = "https://podcast.senlima.dev"

export const DEFAULT_SEO_DATA: DefaultSeoProps = {
  defaultTitle: DEFAULT_SITE_TITLE,
  titleTemplate: `${DEFAULT_SITE_TITLE} | %s`,
  canonical: SITE_HOST,
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: SITE_HOST,
    site_name: DEFAULT_SITE_TITLE,
  },
  twitter: {
    handle: "@senlima4",
    site: "@senlima4",
    cardType: "summary_large_image",
  },
}
