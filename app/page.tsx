import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import NewsCategories from "@/components/news-categories"
import LatestNews from "@/components/latest-news"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">NewsHub</span>
            </Link>
            <NewsCategories />
          </div>
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Register</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="container py-8 md:py-12">
          <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between">
            <div className="max-w-[800px]">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Latest News & Updates</h1>
              <p className="mt-4 text-muted-foreground">
                Stay informed with the most recent news and stories from around the world.
              </p>
            </div>
          </div>
        </section>
        <section className="container py-8">
          <h2 className="mb-6 text-2xl font-bold">Featured Stories</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="line-clamp-2 text-xl">Global Climate Summit Reaches Historic Agreement</CardTitle>
                <CardDescription className="line-clamp-1 text-xs">Politics • 2 hours ago</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="aspect-video overflow-hidden rounded-md bg-muted">
                  <img
                    src="/placeholder.svg?height=200&width=400"
                    alt="Climate Summit"
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="mt-4 line-clamp-3 text-sm text-muted-foreground">
                  World leaders have reached a groundbreaking agreement at the Global Climate Summit, pledging to reduce
                  carbon emissions by 50% before 2030.
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Link href="/article/1" className="inline-flex items-center text-sm font-medium text-primary">
                  Read more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="line-clamp-2 text-xl">Tech Giant Unveils Revolutionary AI Assistant</CardTitle>
                <CardDescription className="line-clamp-1 text-xs">Technology • 5 hours ago</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="aspect-video overflow-hidden rounded-md bg-muted">
                  <img
                    src="/placeholder.svg?height=200&width=400"
                    alt="AI Assistant"
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="mt-4 line-clamp-3 text-sm text-muted-foreground">
                  A leading tech company has announced a breakthrough in artificial intelligence, launching an assistant
                  that can understand and respond to complex human emotions.
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Link href="/article/2" className="inline-flex items-center text-sm font-medium text-primary">
                  Read more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="line-clamp-2 text-xl">Sports Championship Ends with Unexpected Victory</CardTitle>
                <CardDescription className="line-clamp-1 text-xs">Sports • 12 hours ago</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="aspect-video overflow-hidden rounded-md bg-muted">
                  <img
                    src="/placeholder.svg?height=200&width=400"
                    alt="Sports Championship"
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="mt-4 line-clamp-3 text-sm text-muted-foreground">
                  In a stunning turn of events, the underdog team claimed victory in the championship final, overcoming
                  the defending champions with a last-minute score.
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Link href="/article/3" className="inline-flex items-center text-sm font-medium text-primary">
                  Read more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
          </div>
        </section>
        <section className="container py-8">
          <h2 className="mb-6 text-2xl font-bold">Latest News</h2>
          <LatestNews />
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 NewsHub. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/about" className="underline underline-offset-4 hover:text-foreground">
              About
            </Link>
            <Link href="/contact" className="underline underline-offset-4 hover:text-foreground">
              Contact
            </Link>
            <Link href="/privacy" className="underline underline-offset-4 hover:text-foreground">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

