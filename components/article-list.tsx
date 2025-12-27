import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// This would normally come from an API
const articles = [
  {
    id: "1",
    title: "The Impact of Artificial Intelligence on Modern Healthcare",
    status: "published",
    category: "Technology",
    date: "March 8, 2025",
    views: 1423,
  },
  {
    id: "2",
    title: "Sustainable Fashion: Trends and Innovations",
    status: "published",
    category: "Lifestyle",
    date: "March 6, 2025",
    views: 982,
  },
  {
    id: "3",
    title: "The Future of Remote Work After the Pandemic",
    status: "draft",
    category: "Business",
    date: "Last edited March 9, 2025",
    views: 0,
  },
  {
    id: "4",
    title: "Understanding Cryptocurrency: A Beginner's Guide",
    status: "published",
    category: "Finance",
    date: "March 2, 2025",
    views: 2731,
  },
  {
    id: "5",
    title: "The Science Behind Mindfulness Meditation",
    status: "draft",
    category: "Health",
    date: "Last edited March 7, 2025",
    views: 0,
  },
]

export default function ArticleList() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[400px]">Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Views</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles.map((article) => (
            <TableRow key={article.id}>
              <TableCell className="font-medium">{article.title}</TableCell>
              <TableCell>{article.category}</TableCell>
              <TableCell>
                <Badge variant={article.status === "published" ? "default" : "secondary"}>
                  {article.status === "published" ? "Published" : "Draft"}
                </Badge>
              </TableCell>
              <TableCell>{article.date}</TableCell>
              <TableCell className="text-right">
                {article.status === "published" ? article.views.toLocaleString() : "-"}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    {article.status === "published" && (
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem className="text-destructive focus:text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

