import Image from "next/image"
import dynamic from "next/dynamic"
import { NextSeo } from "next-seo"
import Parser from "rss-parser"
import type { NextPage, GetStaticProps } from "next"

import {
  PODCAST_RSS_FEED,
  PODCAST_SOUNDON_URL,
  PODCAST_APPLE_PODCAST_URL,
} from "@/constants"
import type { Info } from "@/type"

const EpisodeRow = dynamic(() => import("@/components/episode-row"), {
  ssr: true,
})

type PageProps = {
  data: Info
}

const Home: NextPage<PageProps> = ({ data }) => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-neutral-800 text-neutral-50">
      <NextSeo title="主頁" description={data.description} />

      <header className="px-4 py-8 w-full md:px-0 md:mx-auto md:w-5/6 flex flex-col md:flex-row">
        <div className="flex-none flex justify-center md:mr-6">
          <Image
            layout="fixed"
            width={300}
            height={300}
            src={data.image.url}
            alt={data.image.title}
          />
        </div>
        <div className="flex-auto w-full pt-10">
          <h1 className="text-3xl font-semibold mb-4">{data.title}</h1>
          <h2 className="w-full leading-4 whitespace-pre-line">
            {data.description}
          </h2>
        </div>
      </header>

      <nav className="px-4 my-2 w-full md:px-0 md:mx-auto md:w-5/6 flex flex-wrap">
        <a
          target="_blank"
          rel="noreferrer noopener"
          href={PODCAST_SOUNDON_URL}
          className="inline-block mr-4">
          <Image
            src="/soundon_badge.svg"
            alt="Listen on SoundOn"
            width={126}
            height={40}
            layout="fixed"
          />
        </a>

        <a
          href={PODCAST_APPLE_PODCAST_URL}
          target="_blank"
          rel="noreferrer noopener">
          <Image
            src="/apple_podcast_badge.svg"
            alt="Listen on Apple Podcast"
            width={165}
            height={40}
            layout="fixed"
          />
        </a>
      </nav>

      <main className="px-4 w-full mb-auto md:mx-auto md:w-5/6">
        {data.items.map((item) => (
          <EpisodeRow key={item.guid} item={item} />
        ))}
      </main>

      <footer className="w-full h-6 flex items-center justify-center text-center text-black bg-neutral-50">
        <p className="text-sm">Made by Senlima Sun</p>
      </footer>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const parser = new Parser()
  const data = (await parser.parseURL(PODCAST_RSS_FEED)) as Info

  return {
    props: { data },
    revalidate: 60 * 60 * 24, // 1d
  }
}

export default Home
