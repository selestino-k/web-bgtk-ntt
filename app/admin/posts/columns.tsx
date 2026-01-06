"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Edit, Trash2, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Prisma } from "@/lib/generated/prisma/client"
import { Badge } from "@/components/ui/badge"
import { JSX } from "react"

// Update your Post type to allow null thumbnails
export type Post = {
  id: bigint
  title: string
  content: Prisma.JsonValue | null
  thumbnail: string | null
  published: boolean
  tags: Array<{ tag: { name: string } }>
  authorId: string
  createdAt: Date
  updatedAt: Date
}

// Types for Lexical JSON structure
type LexicalNode = {
  type?: string
  text?: string
  format?: number
  children?: LexicalNode[]
  tag?: string
  url?: string
  [key: string]: unknown
}

type LexicalContent = {
  root?: {
    children?: LexicalNode[]
    [key: string]: unknown
  }
  [key: string]: unknown
}

// Helper function to extract plain text from Lexical JSON for preview
function extractTextFromLexical(content: Prisma.JsonValue): string {
  if (!content || typeof content !== 'object') return "No content"
  
  try {
    const contentObj = content as LexicalContent
    if (!contentObj.root || !contentObj.root.children) return "No content"
    
    const extractText = (node: LexicalNode): string => {
      if (!node) return ""
      
      if (node.text) return node.text
      
      if (node.children && Array.isArray(node.children)) {
        return node.children.map((child: LexicalNode) => extractText(child)).join("")
      }
      
      return ""
    }
    
    const text = contentObj.root.children
      .map((child: LexicalNode) => extractText(child))
      .join(" ")
      .trim()
    
    return text || "No content"
  } catch (error) {
    return "Invalid content"
  }
}

// Helper function to render Lexical JSON as HTML
function renderLexicalContent(content: Prisma.JsonValue): JSX.Element {
  if (!content || typeof content !== 'object') {
    return <p className="text-gray-400">No content</p>
  }
  
  try {
    const contentObj = content as LexicalContent
    if (!contentObj.root || !contentObj.root.children) {
      return <p className="text-gray-400">No content</p>
    }
    
    const renderNode = (node: LexicalNode, index: number): JSX.Element | string => {
      if (!node) return ""
      
      // Text node
      if (node.type === "text" || node.text) {
        let text = node.text || ""
        
        // Handle text formatting
        if (node.format) {
          const format = node.format as number
          if (format & 1) text = `<strong>${text}</strong>` // Bold
          if (format & 2) text = `<em>${text}</em>` // Italic
          if (format & 8) text = `<u>${text}</u>` // Underline
          if (format & 16) text = `<s>${text}</s>` // Strikethrough
        }
        
        return <span key={index} dangerouslySetInnerHTML={{ __html: text }} />
      }
      
      // Paragraph node
      if (node.type === "paragraph") {
        return (
          <p key={index} className="mb-4 leading-relaxed">
            {node.children?.map((child, i) => renderNode(child, i))}
          </p>
        )
      }
      
      // Heading nodes
      if (node.type === "heading") {
        const HeadingTag = (node.tag || "h2") as keyof JSX.IntrinsicElements
        const headingClasses = {
          h1: "text-3xl font-bold mb-4 mt-6",
          h2: "text-2xl font-bold mb-3 mt-5",
          h3: "text-xl font-bold mb-2 mt-4",
          h4: "text-lg font-bold mb-2 mt-3",
          h5: "text-base font-bold mb-2 mt-2",
          h6: "text-sm font-bold mb-2 mt-2",
        }
        
        return (
          <HeadingTag key={index} className={headingClasses[node.tag as keyof typeof headingClasses] || ""}>
            {node.children?.map((child, i) => renderNode(child, i))}
          </HeadingTag>
        )
      }
      
      // List nodes
      if (node.type === "list") {
        const listTag = node.tag === "ol" ? "ol" : "ul"
        const ListTag = listTag as keyof JSX.IntrinsicElements
        const listClass = listTag === "ol" ? "list-decimal ml-6 mb-4" : "list-disc ml-6 mb-4"
        
        return (
          <ListTag key={index} className={listClass}>
            {node.children?.map((child, i) => renderNode(child, i))}
          </ListTag>
        )
      }
      
      // List item
      if (node.type === "listitem") {
        return (
          <li key={index} className="mb-1">
            {node.children?.map((child, i) => renderNode(child, i))}
          </li>
        )
      }
      
      // Quote node
      if (node.type === "quote") {
        return (
          <blockquote key={index} className="border-l-4 border-gray-300 pl-4 italic my-4 text-gray-700">
            {node.children?.map((child, i) => renderNode(child, i))}
          </blockquote>
        )
      }
      
      // Code block
      if (node.type === "code") {
        return (
          <pre key={index} className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-4">
            <code>{node.children?.map((child, i) => renderNode(child, i))}</code>
          </pre>
        )
      }
      
      // Link node
      if (node.type === "link") {
        return (
          <a 
            key={index} 
            href={node.url || "#"} 
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {node.children?.map((child, i) => renderNode(child, i))}
          </a>
        )
      }
      
      // Default: render children if available
      if (node.children && Array.isArray(node.children)) {
        return (
          <span key={index}>
            {node.children.map((child, i) => renderNode(child, i))}
          </span>
        )
      }
      
      return <span key={index}></span>
    }
    
    return (
      <div className="prose prose-sm max-w-none">
        {contentObj.root.children.map((child, index) => renderNode(child, index))}
      </div>
    )
  } catch {
    return <p className="text-red-400">Gagal memuat konten</p>
  }
}

export const columns: ColumnDef<Post>[] = [
  {
    accessorKey: "thumbnail",
    header: "Thumbnail",
    cell: ({ row }) => {
      const photo = row.getValue("thumbnail") as string
      if (!photo) {
        return (
          <div className="flex items-center justify-center p-0 mr-5 h-auto hover:opacity-80">
            <Image 
              src="/images/placeholder.svg"
              alt="No image available"
              width={80}
              height={56}
              className="rounded-md object-cover"
            />
          </div>
        )
      }
      
      return (
        <div className="flex items-center justify-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="p-0 mr-5 h-auto hover:opacity-80">
                <Image
                  src={photo}
                  alt="Post thumbnail"
                  width={80}
                  height={56}
                  className="rounded-md object-cover cursor-pointer"
                />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Pratinjau Gambar</DialogTitle>
              </DialogHeader>
              <div className="flex justify-center">
                <Image
                  src={photo}
                  alt="Post thumbnail"
                  width={800}
                  height={600}
                  className="rounded-lg object-cover"
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )
    },
  },
  {
    accessorKey: "title",
    header: "Judul",
    cell: ({ row }) => {
      const title = row.getValue("title") as string
      return (
        <div className="max-w-[300px]">
          <p className="font-medium truncate">{title}</p>
        </div>
      )
    },
  },
  {
    accessorKey: "content",
    header: "Konten",
    cell: ({ row }) => {
      const content = row.getValue("content") as Prisma.JsonValue
      const preview = extractTextFromLexical(content)
      const truncatedPreview = preview.length > 100 
        ? preview.substring(0, 100) + "..." 
        : preview
      
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="h-auto p-2 justify-start">
              <div className="max-w-[250px] text-left">
                <p className="text-sm truncate">{truncatedPreview}</p>
              </div>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold mb-4">Pratinjau Konten</DialogTitle>
            </DialogHeader>
            <div className="p-4">
              {renderLexicalContent(content)}
            </div>
          </DialogContent>
        </Dialog>
      )
    },
  },
  {
    accessorKey: "tags",
    header: "Kategori",
    cell: ({ row }) => {
      const tags = row.original.tags
      
      if (!tags || tags.length === 0) {
        return <span className="text-sm text-gray-400">No tags</span>
      }
      
      return (
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 3).map((tagRelation, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tagRelation.tag.name}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{tags.length - 3}
            </Badge>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "published",
    header: "Status",
    cell: ({ row }) => {
      const published = row.getValue("published") as boolean
      return (
        <Badge variant={published ? "default" : "secondary"}>
          {published ? "Published" : "Draft"}
        </Badge>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: "Tanggal Upload",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt") as Date)
      return (
        <span className="text-sm">
          {date.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
      )
    },
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const postId = row.original.id.toString()
      
      return (
        <div className="flex items-center gap-2">
          <Link href={`/admin/posts/${postId}/edit`}>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
          </Link>
          <Button 
            variant="destructive" 
            size="sm"
            onClick={() => {
              // TODO: Implement delete functionality
              console.log("Delete post:", postId)
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
]