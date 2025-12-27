import { NextResponse } from "next/server"
import { z } from "zod"
import bcrypt from "bcrypt"
import { prisma } from "@/lib/prisma"

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  nationalId: z.string().min(5, "National ID must be at least 5 characters"),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate request body
    const validatedData = registerSchema.parse(body)

    // Check if email already exists
    const emailExists = await prisma.user.findUnique({
      where: { email: validatedData.email },
    })

    if (emailExists) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 })
    }

    // Check if national ID already exists
    const nationalIdExists = await prisma.user.findFirst({
      where: { nationalId: validatedData.nationalId },
    })

    if (nationalIdExists) {
      return NextResponse.json({ error: "National ID already registered" }, { status: 400 })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10)

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
        nationalId: validatedData.nationalId,
        role: "writer",
      },
    })

    // Return success response
    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

