import Link from "next/link"

// This would normally come from an API
const getRelatedArticles = (currentId: string) => {
  // Filter out the current article and return others
  const allArticles = [
    {
      id: "1",
      title: "Global Climate Summit Reaches Historic Agreement",
      category: "Politics",
      timeAgo: "2 hours ago",
      excerpt:
        "World leaders have reached a groundbreaking agreement at the Global Climate Summit, pledging to reduce carbon emissions by 50% before 2030.",
      imageUrl: "/placeholder.svg?height=100&width=200",
    },
    {
      id: "2",
      title: "Tech Giant Unveils Revolutionary AI Assistant",
      category: "Technology",
      timeAgo: "5 hours ago",
      excerpt:
        "A leading tech company has announced a breakthrough in artificial intelligence, launching an assistant that can understand and respond to complex human emotions.",
      imageUrl: "/placeholder.svg?height=100&width=200",
    },
    {
      id: "3",
      title: "Sports Championship Ends with Unexpected Victory",
      category: "Sports",
      timeAgo: "12 hours ago",
      excerpt:
        "In a stunning turn of events, the underdog team claimed victory in the championship final, overcoming the defending champions with a last-minute score.",
      imageUrl: "/placeholder.svg?height=100&width=200",
    },
    {
      id: "4",
      title: "New Medical Breakthrough Could Transform Cancer Treatment",
      category: "Health",
      timeAgo: "3 hours ago",
      excerpt:
        "Researchers have discovered a novel approach to cancer treatment that targets specific genetic mutations with unprecedented precision.",
      imageUrl: "/placeholder.svg?height=100&width=200",
    },
  ]

  return allArticles.filter((article) => article.id !== currentId).slice(0, 3)
}

export default function RelatedArticles({ currentArticleId }: { currentArticleId: string }) {
  const relatedArticles = getRelatedArticles(currentArticleId)

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {relatedArticles.map((article) => (
        <div key={article.id} className="group relative flex flex-col space-y-2">
          <div className="aspect-video overflow-hidden rounded-md bg-muted">
            <img
              src={article.imageUrl || "/placeholder.svg"}
              alt={article.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium text-primary">{article.category}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{article.timeAgo}</span>
            </div>
            <h3 className="line-clamp-2 text-lg font-bold">{article.title}</h3>
            <p className="line-clamp-2 text-sm text-muted-foreground">{article.excerpt}</p>
          </div>
          <Link href={`/article/${article.id}`} className="absolute inset-0">
            <span className="sr-only">View article</span>
          </Link>
        </div>
      ))}
    </div>
  )
}

