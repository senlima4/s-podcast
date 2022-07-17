import * as React from "react"
import { format } from "date-fns"

import type { Item } from "@/type"

type EpisodeRowProps = {
  item: Item
}

const EpisodeRow: React.FC<EpisodeRowProps> = ({ item }) => {
  return (
    <section key={item.guid} className="w-full h-[100px] flex flex-col">
      <a href={item.link} target="_blank" rel="noreferrer noopener">
        <h3 className="text-lg font-medium">{item.title}</h3>
      </a>
      <p className="mb-auto">{item.content}</p>
      <time className="text-gray-400 text-sm">
        {format(new Date(item.pubDate), "yyyy-MM-dd")}
      </time>
    </section>
  )
}

export default React.memo(EpisodeRow)
