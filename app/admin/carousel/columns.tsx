"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Edit } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { DeleteFotoDialog } from "./delete-foto-dialog"
import { CarouselPhoto } from "@/lib/generated/prisma/client"

// Update your Foto type to match the database schema
export type carouselPhoto = {
  id: number
  imageUrl: string
  caption : string | null
  createdAt: Date
  order : number
}

export const columns: ColumnDef<CarouselPhoto>[] = [
  {
    accessorKey: "order",
    header: "Urutan",
    cell: ({ row }) => {  
      const order = row.getValue("order") as number
      return <span className="text-sm font-medium">{order}</span>
    }
    
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const id = row.original.id.toString()
      return <span className="text-xs font-mono">{id}</span>
    },
  },
  {
    accessorKey: "imageUrl",
    header: "Foto",
    cell: ({ row }) => {
      const photo = row.getValue("imageUrl") as string
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
                  alt="Foto"
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
                  alt="Foto"
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
    accessorKey: "caption",
    header: "Caption",
    cell: ({ row }) => {
      const title = row.getValue("caption") as string | null
      
      // Handle null or empty caption
      if (!title) {
        return <span className="text-sm text-muted-foreground italic">Tidak ada caption</span>
      }
      
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
      const fotoId = Number(row.original.id)
      const fotoName = row.original.caption || "Foto tanpa judul"

      return (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/admin/carousel/${fotoId}/edit`}>
              <Edit className="h-4 w-4" />
            </Link>
          </Button>
          <DeleteFotoDialog id={fotoId} photoName={fotoName} />
        </div>
      )
    },
  },
]