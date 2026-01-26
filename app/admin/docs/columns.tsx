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
    accessorKey: "fileUrl",
    header: "",
    cell: ({ row }) => {
      const fileUrl = row.original.fileUrl
      return (
        <Button
          variant="default"
          size="sm"
          asChild
        >
          <Link href={fileUrl} target="_blank" rel="noopener noreferrer" download>
            <Download className="mr-2 h-4 w-4" />
            Unduh
          </Link>
        </Button>
      )
    }
  },
  {
    accessorKey: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const docId = row.original.id
      return (
        <div className="flex items-center gap-2">
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
