import { DefaultSeo } from "next-seo"
import type { AppProps } from "next/app"

import { DEFAULT_SEO_DATA } from "@/constants"

import "@/globals.css"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...DEFAULT_SEO_DATA} />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
