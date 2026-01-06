"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type DocsPage = {
  id: string
  title: string
  description: string
  fileUrl: string
  createdAt: Date
  fileName: string
  postId: string | null
}

export const columns: ColumnDef<DocsPage>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  
  {
    accessorKey: "description",
    header: "Description",
  },
    {
    accessorKey: "fileName",
    header: "File Name",
  },
    {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
        const date = new Date(row.original.createdAt)
        return date.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
      },
    },
    {
    accessorKey: "fileUrl",
    header: "Download",
    cell: ({ row }) => {
        const fileUrl = row.original.fileUrl
        return (
          <Button 
            variant="outline" 
            size="sm" 
            asChild
          >
            <a href={fileUrl} target="_blank" rel="noopener noreferrer" download>
              <Download className="mr-2 h-4 w-4" />
              Download  
            </a>
          </Button>
        )
      }
    },
    {
    accessorKey: "postId",
    header: "Associated Post ID",
    },
]