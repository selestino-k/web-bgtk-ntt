"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { DeleteDocumentDialog } from "./delete-document-dialog"
import { EditDocumentDialog } from "./edit-document-dialog"
import Link from "next/link"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type DocsPage = {
  id: number
  title: string
  description: string | null
  fileSize: number
  fileUrl: string
  createdAt: Date
  fileName: string
}

export const columns: ColumnDef<DocsPage>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Judul",
  },
  {
    accessorKey: "description",
    header: "Deskripsi (Opsional)",
  
    cell: ({ row }) => {
      const descriptionTruncated = row.original.description 
        ? row.original.description.length > 20
          ? row.original.description.slice(0, 18) + '...'
          : row.original.description
        : '-'
      return descriptionTruncated
    }
  },
  {
    accessorKey: "category",
    header: "Kategori",
  },
  {
    accessorKey: "fileSize",
    header: "Ukuran",
    cell: ({ row }) => {
      const sizeInBytes = row.original.fileSize
      const sizeInKB = sizeInBytes / 1024
      if (sizeInKB < 1024) {
        return `${sizeInKB.toFixed(2)} KB`
      } else {
        const sizeInMB = sizeInKB / 1024
        return `${sizeInMB.toFixed(2)} MB`
      }
    }
  },
  {
    accessorKey: "fileName",
    header: "Nama File",
    cell: ({ row }) => {
      const fileNameTruncated = row.original.fileName .length > 20
        ? row.original.fileName.slice(0, 18) + '...'
        : row.original.fileName
      return fileNameTruncated

    }
     
  },
  {
    accessorKey: "createdAt",
    header: "Tanggal Diunggah",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt)
      return date.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
    },
  },
  {
    accessorKey: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const docId = row.original.id
      const fileUrl = row.original.fileUrl
      return (
        <div className="flex items-center gap-2">
          <Button
          variant="default"
          size="sm"
          asChild
        >
          <Link href={fileUrl} target="_blank" rel="noopener noreferrer" download>
            <Download className="h-4 w-4" />
          </Link>
        </Button>
          <EditDocumentDialog 
            id={docId} 
            title={row.original.title}
            description={row.original.description}
          />
          <DeleteDocumentDialog id={docId} title={row.original.title} />
        </div>
      )
    }
  }
]
