"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Image, Save } from "lucide-react"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import RichTextEditor from "@/components/rich-text-editor"

// Define types
interface Category {
  id: string
  name: string
}

// Define validation schema
const articleSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  categoryId: z.string().uuid("Please select a valid category"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  status: z.enum(["draft", "published"]),
  imageUrl: z.string().optional(),
})

export default function NewArticlePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true)
  const [categoryError, setCategoryError] = useState<string | null>(null)
  const [articleData, setArticleData] = useState({
    title: "",
    categoryId: "",
    content: "",
    image: null as File | null,
    imageUrl: "",
    status: "draft" as "draft" | "published",
  })

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      toast({
        title: "Unauthorized",
        description: "Please log in to create articles",
        variant: "destructive",
      })
      router.push("/login")
      return
    }
  }, [router, toast])

  // Fetch categories
  useEffect(() => {
    async function fetchCategories() {
      setIsCategoriesLoading(true)
      setCategoryError(null)

      try {
        console.log("Fetching categories...")
        const response = await fetch("/api/categories", {
          // Add cache: 'no-store' to prevent caching issues
          cache: "no-store",
          // Add headers to ensure we get JSON back
          headers: {
            Accept: "application/json",
          },
        })

        // Log the response for debugging
        console.log("Response status:", response.status)

        // Check if response is JSON
        const contentType = response.headers.get("content-type")
        if (!contentType || !contentType.includes("application/json")) {
          // If not JSON, get the text and log it
          const text = await response.text()
          console.error("Received non-JSON response:", text.substring(0, 100) + "...")
          throw new Error("Server returned non-JSON response")
        }

        if (!response.ok) {
          throw new Error(`Failed to fetch categories: ${response.statusText}`)
        }

        const data = await response.json()
        console.log("Categories data:", data)

        if (!data.categories || !Array.isArray(data.categories)) {
          console.error("Unexpected API response format:", data)
          throw new Error("Invalid response format from categories API")
        }

        setCategories(data.categories)
      } catch (error) {
        console.error("Error fetching categories:", error)
        setCategoryError(error instanceof Error ? error.message : "Failed to load categories")
        toast({
          title: "Error loading categories",
          description: error instanceof Error ? error.message : "An unknown error occurred",
          variant: "destructive",
        })
      } finally {
        setIsCategoriesLoading(false)
      }
    }

    fetchCategories()
  }, [toast])

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setArticleData((prev) => ({ ...prev, [name]: value }))
  }

  const handleContentChange = (content: string) => {
    setArticleData((prev) => ({ ...prev, content }))
  }

  const handleCategoryChange = (value: string) => {
    setArticleData((prev) => ({ ...prev, categoryId: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setArticleData((prev) => ({
        ...prev,
        image: file,
        imageUrl: URL.createObjectURL(file),
      }))
    }
  }

  // Save or publish article
  const saveArticle = async (status: "draft" | "published") => {
    setIsLoading(true)

    try {
      const token = localStorage.getItem("token")
      if (!token) {
        throw new Error("You must be logged in to create an article")
      }

      // Validate article data
      const articleToSave = {
        ...articleData,
        status,
      }

      const validatedData = articleSchema.parse(articleToSave)

      // Handle image upload if needed
      let finalImageUrl = articleData.imageUrl
      if (articleData.image) {
        // In a real app, you would upload the image to a storage service
        // and get back a URL to store in the database
        // For now, we'll just use the local URL
        finalImageUrl = articleData.imageUrl
      }

      // Send article data to API
      const response = await fetch("/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...validatedData,
          imageUrl: finalImageUrl,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Failed to save article: ${response.statusText}`)
      }

      const data = await response.json()

      toast({
        title: "Success",
        description: status === "published" ? "Article published successfully!" : "Draft saved successfully!",
      })

      router.push("/dashboard")
    } catch (error) {
      console.error("Error saving article:", error)

      if (error instanceof z.ZodError) {
        // Format validation errors
        const errorMessages = error.errors.map((err) => `${err.path.join(".")}: ${err.message}`).join(", ")
        toast({
          title: "Validation Error",
          description: errorMessages,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to save article",
          variant: "destructive",
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="text-lg font-medium">New Article</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => saveArticle("draft")} disabled={isLoading}>
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
            <Button onClick={() => saveArticle("published")} disabled={isLoading}>
              {isLoading ? "Saving..." : "Publish"}
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container py-8">
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Article Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter article title"
                value={articleData.title}
                onChange={handleChange}
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={articleData.categoryId} onValueChange={handleCategoryChange}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {isCategoriesLoading ? (
                    <SelectItem value="loading" disabled>
                      Loading categories...
                    </SelectItem>
                  ) : categoryError ? (
                    <SelectItem value="error" disabled>
                      Error: {categoryError}
                    </SelectItem>
                  ) : categories.length === 0 ? (
                    <SelectItem value="empty" disabled>
                      No categories available
                    </SelectItem>
                  ) : (
                    categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Featured Image</Label>
              <div className="flex items-center gap-4">
                <Button variant="outline" className="w-full" asChild>
                  <label htmlFor="image" className="cursor-pointer">
                    <Image className="mr-2 h-4 w-4" />
                    {articleData.image ? "Change Image" : "Upload Image"}
                    <input id="image" type="file" accept="image/*" onChange={handleImageChange} className="sr-only" />
                  </label>
                </Button>
                {articleData.image && <span className="text-sm text-muted-foreground">{articleData.image.name}</span>}
              </div>
              {articleData.imageUrl && (
                <div className="mt-2 aspect-video overflow-hidden rounded-md bg-muted">
                  <img
                    src={articleData.imageUrl || "/placeholder.svg"}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="content">Article Content</Label>
              <RichTextEditor value={articleData.content} onChange={handleContentChange} />
              {articleData.content.length < 50 && articleData.content.length > 0 && (
                <p className="text-xs text-destructive">
                  Content must be at least 50 characters. Current length: {articleData.content.length}
                </p>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 NewsHub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

