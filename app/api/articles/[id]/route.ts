import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { z } from "zod"

// GET a single article by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Find article by ID
    const article = await prisma.article.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 })
    }

    // Increment view count
    await prisma.article.update({
      where: { id },
      data: { views: { increment: 1 } },
    })

    return NextResponse.json({ article })
  } catch (error) {
    console.error("Error fetching article:", error)
    return NextResponse.json({ error: "Failed to fetch article" }, { status: 500 })
  }
}

// Update an article
const updateArticleSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").optional(),
  content: z.string().min(50, "Content must be at least 50 characters").optional(),
  categoryId: z.string().uuid("Invalid category ID").optional(),
  status: z.enum(["draft", "published"]).optional(),
  imageUrl: z.string().optional(),
})

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Verify authentication
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if article exists and belongs to the user
    const article = await prisma.article.findUnique({
      where: { id },
      select: { authorId: true },
    })

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 })
    }

    // Check if user is the author or an admin
    if (article.authorId !== session.user.id && session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const body = await request.json()

    // Validate request body
    const validatedData = updateArticleSchema.parse(body)

    // Prepare update data
    const updateData: any = {}

    if (validatedData.title) updateData.title = validatedData.title
    if (validatedData.content) updateData.content = validatedData.content
    if (validatedData.status) updateData.status = validatedData.status
    if (validatedData.imageUrl) updateData.imageUrl = validatedData.imageUrl

    // Add category connection if categoryId is provided
    if (validatedData.categoryId) {
      updateData.category = { connect: { id: validatedData.categoryId } }
    }

    // Update article
    const updatedArticle = await prisma.article.update({
      where: { id },
      data: updateData,
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    return NextResponse.json({ article: updatedArticle })
  } catch (error) {
    console.error("Error updating article:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Failed to update article" }, { status: 500 })
  }
}

// Delete an article
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Verify authentication
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if article exists and belongs to the user
    const article = await prisma.article.findUnique({
      where: { id },
      select: { authorId: true },
    })

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 })
    }

    // Check if user is the author or an admin
    if (article.authorId !== session.user.id && session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Delete article
    await prisma.article.delete({ where: { id } })

    return NextResponse.json({ message: "Article deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting article:", error)
    return NextResponse.json({ error: "Failed to delete article" }, { status: 500 })
  }
}

