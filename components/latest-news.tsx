import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Separator } from "@/components/ui/separator"

// This would normally come from an API
const latestNews = [
  {
    id: "4",
    title: "New Medical Breakthrough Could Transform Cancer Treatment",
    category: "Health",
    timeAgo: "3 hours ago",
    excerpt:
      "Researchers have discovered a novel approach to cancer treatment that targets specific genetic mutations with unprecedented precision.",
    imageUrl: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "5",
    title: "Economic Forecast Predicts Strong Growth in Coming Quarter",
    category: "Business",
    timeAgo: "5 hours ago",
    excerpt:
      "Leading economists are projecting a significant upturn in global markets, citing improved supply chains and consumer confidence.",
    imageUrl: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "6",
    title: "Cultural Festival Celebrates Diversity with Record Attendance",
    category: "Entertainment",
    timeAgo: "8 hours ago",
    excerpt:
      "The annual International Cultural Festival saw its highest attendance ever, with performances and exhibitions from over 50 countries.",
    imageUrl: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "7",
    title: "New Infrastructure Bill Promises Major Urban Renovations",
    category: "Politics",
    timeAgo: "10 hours ago",
    excerpt:
      "Lawmakers have passed a comprehensive infrastructure package that will fund critical updates to transportation and public utilities.",
    imageUrl: "/placeholder.svg?height=100&width=200",
  },
]

export default function LatestNews() {
  return (
    <div className="space-y-6">
      {latestNews.map((article, index) => (
        <div key={article.id}>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="md:w-1/4">
              <div className="aspect-video overflow-hidden rounded-md bg-muted md:aspect-square">
                <img
                  src={article.imageUrl || "/placeholder.svg"}
                  alt={article.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-primary">{article.category}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{article.timeAgo}</span>
                </div>
                <h3 className="mt-2 text-xl font-bold">{article.title}</h3>
                <p className="mt-2 line-clamp-3 text-muted-foreground">{article.excerpt}</p>
              </div>
              <div className="mt-4">
                <Link
                  href={`/article/${article.id}`}
                  className="inline-flex items-center text-sm font-medium text-primary"
                >
                  Read more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
          {index < latestNews.length - 1 && <Separator className="my-6" />}
        </div>
      ))}
    </div>
  )
}

