"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Edit, Trash2, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export type Post = {
  id: string
  title: string
  photo: string
  user: string
  kategori: string
  tanggalUpload: Date
}

export const columns: ColumnDef<Post>[] = [
  {
    accessorKey: "photo",
    header: "",
    cell: ({ row }) => {
      const photo = row.getValue("photo") as string
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="py-5 px-2 mt-5">
              <Image
                src={photo}
                alt="Post photo"
                width={50}
                height={50}
                className="rounded-md object-cover cursor-pointer hover:opacity-80"
              />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Tampilkan Foto</DialogTitle>
            </DialogHeader>
            <div className="flex justify-center">
              <Image
                src={photo}
                alt="Post photo"
                width={500}
                height={500}
                className="rounded-lg object-cover"
              />
            </div>
          </DialogContent>
        </Dialog>
      )
    },
  },
  {
    accessorKey: "title",
    header: "Judul",
    cell: ({ row }) => <span>{row.getValue("title")}</span>,

  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => <span>{row.getValue("user")}</span>,
  },
  {
    accessorKey: "kategori",
    header: "Kategori",
    cell: ({ row }) => <span>{row.getValue("kategori")}</span>,
  },
  {
    accessorKey: "tanggalUpload",
    header: "Tanggal Upload",
    cell: ({ row }) => {
      const date = new Date(row.getValue("tanggalUpload") as Date)
      return <span>{date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })}</span>
    },
  },
  {
    accessorKey: "id",
    header: "Aksi",
    cell: ({ row }) => {
      const postId = row.getValue("id") as string
      return (
        <div className="flex items-center gap-2">
          <Link href={`/admin/posts/${postId}/edit`}>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
          </Link>
          <Link href={`/admin/posts/${postId}/delete`}>
            <Button variant="destructive" size="sm">
              <Trash2 className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      )
    },
  },
]