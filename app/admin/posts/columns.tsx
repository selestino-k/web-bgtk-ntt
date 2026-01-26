/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Edit } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Prisma } from "@/lib/generated/prisma/client"
import { Badge } from "@/components/ui/badge"
import { DeletePostDialog } from "./delete-post-dialog"
import { JSX } from "react"

// Update your Post type to include author information
export type Post = {
  id: bigint
  title: string
  content: Prisma.JsonValue | null
  thumbnail: string | null
  published: boolean
  tags: Array<{ tag: { name: string } }>
  authorId: string
  author?: {
    name: string | null
    email: string | null
  }
  createdAt: Date
  updatedAt: Date
}



// Helper function to render TipTap JSON as HTML (matching berita detail page)
function renderTipTapContent(content: Prisma.JsonValue): JSX.Element {
  if (!content) {
    return <p className="text-gray-400">No content</p>
  }
  
  try {
    let contentObj: any
    
    if (typeof content === 'string') {
      contentObj = JSON.parse(content)
    } else if (typeof content === 'object' && content !== null) {
      contentObj = content
    } else {
      return <p className="text-gray-400">Invalid content format</p>
    }
    
    if (!contentObj.content || !Array.isArray(contentObj.content)) {
      return <p className="text-gray-400">No content</p>
    }
    
    const applyMarks = (text: string, marks?: any[]): JSX.Element => {
      if (!marks || marks.length === 0) {
        return <span>{text}</span>
      }

      // Check if there's a link mark first
      const linkMark = marks.find(mark => mark.type === "link")
      if (linkMark) {
        const href = linkMark.attrs?.href as string || "#"
        const target = linkMark.attrs?.target as string || "_blank"
        
        // Apply other marks to the link text
        const otherMarks = marks.filter(mark => mark.type !== "link")
        let className = "text-blue-600 hover:text-blue-800 hover:underline underline-offset-2 transition-colors"
        const style: React.CSSProperties = {}
        let styledText = text

        otherMarks.forEach(mark => {
          switch (mark.type) {
            case "bold":
              className += " font-bold"
              break
            case "italic":
              className += " italic"
              break
            case "underline":
              className += " underline"
              break
            case "strike":
              styledText = `<s>${styledText}</s>`
              break
            case "code":
              className += " bg-gray-100 px-1 py-0.5 rounded font-mono text-sm"
              break
            case "highlight":
              if (mark.attrs?.color) {
                style.backgroundColor = mark.attrs.color as string
              }
              break
            case "textStyle":
              if (mark.attrs?.color) {
                style.color = mark.attrs.color as string
              }
              break
            case "subscript":
              styledText = `<sub>${styledText}</sub>`
              break
            case "superscript":
              styledText = `<sup>${styledText}</sup>`
              break
          }
        })

        return (
          <a 
            href={href}
            className={className}
            style={style}
            target={target}
            rel="noopener noreferrer"
            dangerouslySetInnerHTML={styledText !== text ? { __html: styledText } : undefined}
          >
            {styledText === text ? text : undefined}
          </a>
        )
      }

      // Original code for non-link marks
      let styledText = text
      let className = ""
      const style: React.CSSProperties = {}

      marks.forEach(mark => {
        switch (mark.type) {
          case "bold":
            styledText = `<strong>${styledText}</strong>`
            break
          case "italic":
            styledText = `<em>${styledText}</em>`
            break
          case "underline":
            styledText = `<u>${styledText}</u>`
            break
          case "strike":
            styledText = `<s>${styledText}</s>`
            break
          case "code":
            className += " bg-gray-100 px-1 py-0.5 rounded font-mono text-sm"
            break
          case "highlight":
            if (mark.attrs?.color) {
              style.backgroundColor = mark.attrs.color as string
            }
            break
          case "textStyle":
            if (mark.attrs?.color) {
              style.color = mark.attrs.color as string
            }
            break
          case "subscript":
            styledText = `<sub>${styledText}</sub>`
            break
          case "superscript":
            styledText = `<sup>${styledText}</sup>`
            break
        }
      })

      return (
        <span 
          className={className} 
          style={style}
          dangerouslySetInnerHTML={{ __html: styledText }} 
        />
      )
    }
    
    const renderNode = (node: any, index: number): JSX.Element | null => {
      if (!node) return null
      
      if (node.type === "text" && node.text) {
        return <span key={index}>{applyMarks(node.text, node.marks)}</span>
      }
      
      if (node.type === "paragraph") {
        const textAlign = node.attrs?.textAlign
        return (
          <p 
            key={index} 
            className="mb-4 leading-relaxed text-sm"
            style={{ textAlign: textAlign || "left" }}
          >
            {node.content?.map((child: any, i: number) => renderNode(child, i))}
          </p>
        )
      }
      
      if (node.type === "heading") {
        const level = node.attrs?.level || 2
        const textAlign = node.attrs?.textAlign
        const HeadingTag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
        const headingClasses = {
          h1: "text-2xl font-bold mb-3 mt-4",
          h2: "text-xl font-bold mb-2 mt-3",
          h3: "text-lg font-bold mb-2 mt-3",
          h4: "text-base font-bold mb-2 mt-2",
          h5: "text-sm font-bold mb-2 mt-2",
          h6: "text-xs font-bold mb-2 mt-2",
        }
        
        return (
          <HeadingTag 
            key={index} 
            className={headingClasses[HeadingTag] || ""}
            style={{ textAlign: textAlign || "left" }}
          >
            {node.content?.map((child: any, i: number) => renderNode(child, i))}
          </HeadingTag>
        )
      }
      
      if (node.type === "bulletList") {
        return (
          <ul key={index} className="list-disc ml-6 mb-4">
            {node.content?.map((child: any, i: number) => renderNode(child, i))}
          </ul>
        )
      }
      
      if (node.type === "orderedList") {
        return (
          <ol key={index} className="list-decimal ml-6 mb-4">
            {node.content?.map((child: any, i: number) => renderNode(child, i))}
          </ol>
        )
      }
      
      if (node.type === "listItem") {
        return (
          <li key={index} className="mb-1">
            {node.content?.map((child: any, i: number) => renderNode(child, i))}
          </li>
        )
      }
      
      if (node.type === "taskList") {
        return (
          <ul key={index} className="space-y-2 mb-4">
            {node.content?.map((child: any, i: number) => renderNode(child, i))}
          </ul>
        )
      }
      
      if (node.type === "taskItem") {
        const checked = node.attrs?.checked || false
        return (
          <li key={index} className="flex items-start gap-2">
            <input 
              type="checkbox" 
              checked={checked} 
              disabled 
              className="mt-1"
            />
            <div className="flex-1">
              {node.content?.map((child: any, i: number) => renderNode(child, i))}
            </div>
          </li>
        )
      }
      
      if (node.type === "blockquote") {
        return (
          <blockquote key={index} className="border-l-4 border-gray-300 pl-4 italic my-4 text-gray-700">
            {node.content?.map((child: any, i: number) => renderNode(child, i))}
          </blockquote>
        )
      }
      
      if (node.type === "codeBlock") {
        const language = node.attrs?.language
        return (
          <pre key={index} className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-4 text-xs">
            <code className={language ? `language-${language}` : ""}>
              {node.content?.map((child: any) => 
                child.type === "text" ? child.text : ""
              ).join("")}
            </code>
          </pre>
        )
      }
      
      if (node.type === "hardBreak") {
        return <br key={index} />
      }
      
      if (node.type === "horizontalRule") {
        return <hr key={index} className="my-4 border-gray-300" />
      }
      
      if (node.type === "image" || node.type === "imageUpload") {
        const src = node.attrs?.src
        const alt = node.attrs?.alt || ""
        
        if (!src) return null
        
        return (
          <div key={index} className="relative w-full my-4">
            <Image 
              src={src}
              alt={alt}
              width={600}
              height={400}
              className="max-w-full h-auto rounded-lg"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        )
      }
      
      return null
    }
    
    return (
      <div className="prose prose-sm max-w-none">
        {contentObj.content.map((child: any, index: number) => renderNode(child, index))}
      </div>
    )
  } catch (error) {
    console.error('Error rendering content:', error)
    return <p className="text-red-400">Error rendering content</p>
  }
}

function extractTextFromContent(content: Prisma.JsonValue): string {
  if (!content) return "No content"
  
  try {
    let contentObj: any
    
    if (typeof content === 'string') {
      contentObj = JSON.parse(content)
    } else {
      contentObj = content
    }
    
    if (!contentObj.content || !Array.isArray(contentObj.content)) {
      return "No content"
    }
    
    const extractText = (node: any): string => {
      if (node.type === 'text' && node.text) {
        return node.text
      }
      
      if (node.content && Array.isArray(node.content)) {
        return node.content.map(extractText).join(' ')
      }
      
      return ''
    }
    
    const fullText = contentObj.content.map(extractText).join(' ').trim()

    return fullText || "No content"
  } catch (error) {
    console.error('Error extracting text:', error)
    return "Error reading content"
  }
}


export const columns: ColumnDef<Post>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const id = row.original.id.toString()
      return <span className="text-xs font-mono">{id}</span>
    },
  },
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
              width={50}
              height={50}
              className="rounded-md object-cover aspect-square"
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
                  width={50}
                  height={50}
                  className="rounded-md object-cover cursor-pointer aspect-square"
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
      const truncatedTitle = title.length > 50 
        ? title.substring(0, 50) + "..." 
        : title

      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="h-auto p-2 justify-start">
              <div className="max-w-[300px] text-left">
                <p className="font-medium truncate">{truncatedTitle}</p>
              </div>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold mb-4">Judul Lengkap</DialogTitle>
            </DialogHeader>
            <div className="p-4">
              <p className="text-lg font-medium leading-relaxed">{title}</p>
            </div>
          </DialogContent>
        </Dialog>
      )
    },
  },
  {
    accessorKey: "content",
    header: "Konten",
    cell: ({ row }) => {
      const content = row.getValue("content") as Prisma.JsonValue
      const preview = extractTextFromContent(content)
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
              {renderTipTapContent(content)}
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
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="h-auto p-2 justify-start">
              <div className="flex flex-wrap gap-1">
                {tags.slice(0, 2).map((tagRelation, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tagRelation.tag.name}
                  </Badge>
                ))}
                {tags.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{tags.length - 2}
                  </Badge>
                )}
              </div>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold mb-4">Semua Kategori</DialogTitle>
            </DialogHeader>
            <div className="flex flex-wrap gap-2 p-4">
              {tags.map((tagRelation, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {tagRelation.tag.name}
                </Badge>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )
    },
  },
  {
    accessorKey: "author",
    header: "Penulis",
    cell: ({ row }) => {
      const author = row.original.author
      
      if (!author || !author.name) {
        return <span className="text-sm text-gray-400">Unknown</span>
      }

      return (
        <div className="flex flex-col">
          <span className="text-sm font-medium">{author.name}</span>
          {author.email && (
            <span className="text-xs text-gray-500">{author.email}</span>
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
      const postTitle = row.original.title

      return (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/admin/posts/${postId}/edit`}>
              <Edit className="h-4 w-4" />
            </Link>
          </Button>
          <DeletePostDialog postId={postId} postTitle={postTitle} />
        </div>
      )
    },
  },
]