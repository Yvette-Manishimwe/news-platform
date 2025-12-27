"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { PenLine, Plus, Settings, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import ArticleList from "@/components/article-list"

export default function DashboardPage() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">NewsHub</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container py-8">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Writer Dashboard</h1>
              <p className="text-muted-foreground">Manage your articles and create new content</p>
            </div>
            <Button onClick={() => router.push("/dashboard/new-article")}>
              <Plus className="mr-2 h-4 w-4" />
              New Article
            </Button>
          </div>

          <Separator className="my-6" />

          <Tabs defaultValue="my-articles" className="space-y-6">
            <TabsList>
              <TabsTrigger value="my-articles">My Articles</TabsTrigger>
              <TabsTrigger value="drafts">Drafts</TabsTrigger>
              <TabsTrigger value="published">Published</TabsTrigger>
            </TabsList>

            <TabsContent value="my-articles" className="space-y-6">
              <ArticleList />
            </TabsContent>

            <TabsContent value="drafts" className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="line-clamp-2 text-xl">The Future of Renewable Energy</CardTitle>
                    <CardDescription className="line-clamp-1 text-xs">Draft • Last edited 2 days ago</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="line-clamp-3 text-sm text-muted-foreground">
                      An exploration of emerging technologies in the renewable energy sector and their potential impact
                      on global energy markets.
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button variant="outline" size="sm" className="w-full">
                      <PenLine className="mr-2 h-4 w-4" />
                      Continue Editing
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="line-clamp-2 text-xl">
                      Urban Agriculture: A Solution to Food Deserts?
                    </CardTitle>
                    <CardDescription className="line-clamp-1 text-xs">Draft • Last edited 5 days ago</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="line-clamp-3 text-sm text-muted-foreground">
                      Investigating how urban farming initiatives are addressing food insecurity in metropolitan areas
                      and creating sustainable local food systems.
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button variant="outline" size="sm" className="w-full">
                      <PenLine className="mr-2 h-4 w-4" />
                      Continue Editing
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="published" className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="line-clamp-2 text-xl">The Rise of Quantum Computing</CardTitle>
                    <CardDescription className="line-clamp-1 text-xs">Published • March 5, 2025</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="mb-4 aspect-video overflow-hidden rounded-md bg-muted">
                      <img
                        src="/placeholder.svg?height=200&width=400"
                        alt="Quantum Computing"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium text-primary">Technology</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">1,245 views</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button variant="outline" size="sm" className="w-full">
                      View Analytics
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="line-clamp-2 text-xl">The Psychology of Decision Making</CardTitle>
                    <CardDescription className="line-clamp-1 text-xs">Published • February 28, 2025</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="mb-4 aspect-video overflow-hidden rounded-md bg-muted">
                      <img
                        src="/placeholder.svg?height=200&width=400"
                        alt="Psychology"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium text-primary">Health</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">2,890 views</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button variant="outline" size="sm" className="w-full">
                      View Analytics
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 NewsHub. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/help" className="underline underline-offset-4 hover:text-foreground">
              Help Center
            </Link>
            <Link href="/terms" className="underline underline-offset-4 hover:text-foreground">
              Terms
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

