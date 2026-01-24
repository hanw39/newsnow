import type { NewsItem } from "@shared/types"

export default defineSource(async () => {
  const rss = await rss2json("https://raw.githubusercontent.com/Olshansk/rss-feeds/main/feeds/feed_claude.xml")
  if (!rss) return []

  const news: NewsItem[] = []
  for (const item of rss.items) {
    news.push({
      id: item.id,
      title: item.title,
      url: item.link,
      extra: {
        date: item.created,
        hover: item.description,
      },
    })
  }

  return news
})
