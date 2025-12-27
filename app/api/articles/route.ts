import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import jwt from "jsonwebtoken"

// JWT verification function
function verifyToken(token: string) {
  try {
    return jwt.verify(
      token,
      process.env.JWT_SECRET || "fallback-secret-do-not-use-in-production"
    ) as { id: string; email: string; role: string }
  } catch (error) {
    return null
  }
}

// GET articles with optional filtering
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const skip = (page - 1) * limit

    // Build query conditions
    const where = {
      status: "published",
      ...(category ? { category: { name: category } } : {}),
    }

    // Get articles with pagination
    const articles = await prisma.article.findMany({
      where,
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
      orderBy: { createdAt: "desc" },
      take: limit,
      skip,
    })

    // Get total count for pagination
    const totalArticles = await prisma.article.count({ where })

    return NextResponse.json({
      articles: articles.map((article) => ({
        id: article.id,
        title: article.title,
        category: article.category.name,
        author: article.author.name,
        imageUrl: article.imageUrl,
        createdAt: article.createdAt,
        views: article.views,
      })),
      pagination: {
        total: totalArticles,
        pages: Math.ceil(totalArticles / limit),
        current: page,
        limit,
      },
    })
  } catch (error) {
    console.error("Error fetching articles:", error)
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 })
  }
}

// Create a new article
const articleSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  categoryId: z.string().uuid("Invalid category ID"),
  status: z.enum(["draft", "published"]).default("draft"),
  imageUrl: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    // Get authorization header
    const authHeader = request.headers.get("authorization")
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    // Extract token
    const token = authHeader.split(" ")[1]
    
    // Verify token
    const decodedToken = verifyToken(token)
    
    if (!decodedToken) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }
    
    // Get user ID from token
    const userId = decodedToken.id
    
    // Debug the user ID
    console.log("User ID from token:", userId)

    const body = await request.json()

    // Validate request body
    const validatedData = articleSchema.parse(body)

    // Create new article using the user ID from the token
    const newArticle = await prisma.article.create({
      data: {
        title: validatedData.title,
        content: validatedData.content,
        status: validatedData.status,
        imageUrl: validatedData.imageUrl,
        author: { connect: { id: userId } },
        category: { connect: { id: validatedData.categoryId } },
      },
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

    return NextResponse.json({ message: "Article created successfully", article: newArticle }, { status: 201 })
  } catch (error) {
    console.error("Error creating article:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Failed to create article" }, { status: 500 })
  }
}
