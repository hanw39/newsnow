// import type { NewsItem } from "@shared/types"
//
// export default defineSource(async () => {
//   const rss = await rss2json("https://www.blog.langchain.com/rss/")
//   if (!rss) return []
//
//   const news: NewsItem[] = []
//   for (const item of rss.items) {
//     news.push({
//       id: item.id,
//       title: item.title,
//       url: item.link,
//       extra: {
//         date: item.created,
//         hover: item.description,
//       },
//     })
//   }
//
//
//
//   return news
// })

import { XMLParser } from "fast-xml-parser"

export default defineSource(async () => {
  const res = await fetch(
    "https://www.blog.langchain.com/rss?alt=rss",
  )

  const xml = await res.text()

  const parser = new XMLParser({
    ignoreAttributes: false,
  })

  const data = parser.parse(xml)

  const items = data?.rss?.channel?.item
  if (!Array.isArray(items)) return []
  //   logger.success(`fetch ${JSON.stringify(items, null, 2)}`)

  return items.map(item => ({
    id: item.guid,
    title: item.title,
    url: item.link,
    extra: {
      hover: item.description,
      date: item.pubDate,
    },
  }))
})
