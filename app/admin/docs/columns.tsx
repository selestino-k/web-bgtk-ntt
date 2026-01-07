"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Download, ExternalLink } from "lucide-react"
import Link from "next/link"

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
    header: "Judul",
  },
  {
    accessorKey: "description",
    header: "Status",
  },
  {
    accessorKey: "fileName",
    header: "Nama File",
  },
  {
    accessorKey: "createdAt",
    header: "Dibuat Pada",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt)
      return date.toLocaleDateString('id-ID', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    },
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const fileUrl = row.original.fileUrl
      
      // Extract Google Drive download URL
      const getGoogleDriveDownloadUrl = (url: string) => {
        const driveRegex = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/;
        const match = url.match(driveRegex);
        
        if (match && match[1]) {
          return `https://drive.google.com/uc?export=download&id=${match[1]}`;
        }
        
        return url;
      };

      const downloadUrl = getGoogleDriveDownloadUrl(fileUrl);

      return (
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            asChild
          >
            <Link href={fileUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Kunjungi
            </Link>
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            asChild
          >
            <a href={downloadUrl} target="_blank" rel="noopener noreferrer" download>
              <Download className="mr-2 h-4 w-4" />
              Unduh
            </a>
          </Button>
        </div>
      )
    },
  },
  {
    accessorKey: "postId",
    header: "ID Post",
  },
]