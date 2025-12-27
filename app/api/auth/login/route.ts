import { NextResponse } from "next/server"
import { z } from "zod"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { prisma } from "@/lib/prisma"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate request body
    const validatedData = loginSchema.parse(body)

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    })

    // Check if user exists
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Check if password is correct
    const passwordMatch = await bcrypt.compare(validatedData.password, user.password)

    if (!passwordMatch) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "fallback-secret-do-not-use-in-production",
      { expiresIn: "1d" },
    )

    // Return success response with token
    return NextResponse.json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    })
  } catch (error) {
    console.error("Login error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

