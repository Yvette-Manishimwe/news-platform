"use client"

import { useState } from "react"
import { Bold, Italic, List, ListOrdered, Quote, Undo, Redo, LinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [linkUrl, setLinkUrl] = useState("")
  const [linkText, setLinkText] = useState("")
  const [isLinkOpen, setIsLinkOpen] = useState(false)

  // This is a simplified rich text editor for demonstration
  // In a real application, you would use a library like TipTap, Slate, or Draft.js

  const handleFormat = (format: string) => {
    // This is a simplified implementation
    // In a real editor, you would use proper formatting logic

    let newValue = value

    switch (format) {
      case "bold":
        newValue += " **bold text** "
        break
      case "italic":
        newValue += " *italic text* "
        break
      case "bullet":
        newValue += "\n- List item"
        break
      case "ordered":
        newValue += "\n1. List item"
        break
      case "quote":
        newValue += "\n> Blockquote"
        break
      default:
        break
    }

    onChange(newValue)
  }

  const handleAddLink = () => {
    if (linkUrl && linkText) {
      const linkMarkdown = `[${linkText}](${linkUrl})`
      onChange(value + linkMarkdown)
      setLinkUrl("")
      setLinkText("")
      setIsLinkOpen(false)
    }
  }

  return (
    <div className="rounded-md border">
      <div className="flex flex-wrap items-center gap-1 border-b bg-muted/50 p-1">
        <Button variant="ghost" size="sm" onClick={() => handleFormat("bold")} className="h-8 w-8 p-0" type="button">
          <Bold className="h-4 w-4" />
          <span className="sr-only">Bold</span>
        </Button>
        <Button variant="ghost" size="sm" onClick={() => handleFormat("italic")} className="h-8 w-8 p-0" type="button">
          <Italic className="h-4 w-4" />
          <span className="sr-only">Italic</span>
        </Button>
        <Separator orientation="vertical" className="mx-1 h-6" />
        <Button variant="ghost" size="sm" onClick={() => handleFormat("bullet")} className="h-8 w-8 p-0" type="button">
          <List className="h-4 w-4" />
          <span className="sr-only">Bullet List</span>
        </Button>
        <Button variant="ghost" size="sm" onClick={() => handleFormat("ordered")} className="h-8 w-8 p-0" type="button">
          <ListOrdered className="h-4 w-4" />
          <span className="sr-only">Numbered List</span>
        </Button>
        <Separator orientation="vertical" className="mx-1 h-6" />
        <Button variant="ghost" size="sm" onClick={() => handleFormat("quote")} className="h-8 w-8 p-0" type="button">
          <Quote className="h-4 w-4" />
          <span className="sr-only">Quote</span>
        </Button>
        <Popover open={isLinkOpen} onOpenChange={setIsLinkOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" type="button">
              <LinkIcon className="h-4 w-4" />
              <span className="sr-only">Link</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="link-text">Link Text</Label>
                <Input
                  id="link-text"
                  placeholder="Text to display"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="link-url">URL</Label>
                <Input
                  id="link-url"
                  placeholder="https://example.com"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                />
              </div>
              <Button onClick={handleAddLink} className="w-full">
                Add Link
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        <div className="ml-auto flex">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" type="button">
            <Undo className="h-4 w-4" />
            <span className="sr-only">Undo</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" type="button">
            <Redo className="h-4 w-4" />
            <span className="sr-only">Redo</span>
          </Button>
        </div>
      </div>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write your article content here..."
        className="min-h-[400px] resize-y rounded-none border-0 p-4 focus-visible:ring-0"
      />
      <div className="border-t bg-muted/50 p-2">
        <p className="text-xs text-muted-foreground">
          Use Markdown for formatting. *italic*, **bold**, [link](url), &gt; quote, - list item, 1. numbered list
        </p>
      </div>
    </div>
  )
}

