import { XMLParser } from "fast-xml-parser"

export default defineSource(async () => {
  const res = await fetch(
    "https://developers.googleblog.com/feeds/posts/default?alt=rss",
  )

  const xml = await res.text()

  const parser = new XMLParser({
    ignoreAttributes: false,
  })

  const data = parser.parse(xml)

  const items = data?.rss?.channel?.item
  if (!Array.isArray(items)) return []

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
