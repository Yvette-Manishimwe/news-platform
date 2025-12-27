"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const categories = [
  { name: "Politics", href: "/category/politics" },
  { name: "Technology", href: "/category/technology" },
  { name: "Sports", href: "/category/sports" },
  { name: "Business", href: "/category/business" },
  { name: "Entertainment", href: "/category/entertainment" },
  { name: "Health", href: "/category/health" },
]

export default function NewsCategories() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <nav className="hidden md:flex items-center gap-6">
      {categories.map((category) => (
        <Link
          key={category.href}
          href={category.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === category.href ? "text-foreground" : "text-muted-foreground",
          )}
        >
          {category.name}
        </Link>
      ))}
    </nav>
  )
}

