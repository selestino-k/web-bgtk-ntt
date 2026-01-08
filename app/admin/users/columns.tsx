"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Role } from "@/lib/generated/prisma/client"
import { DeleteUserDialog } from "./delete-user-dialog"

export type User = {
  id: string
  email: string
  name: string
  role: Role
  createdAt: Date
  updatedAt: Date
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const id = row.original.id
      return <span className="text-xs font-mono">{id.substring(0, 8)}...</span>
    },
  },
  {
    accessorKey: "name",
    header: "Nama",
    cell: ({ row }) => {
      return <span className="font-medium">{row.getValue("name")}</span>
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return <span className="text-sm">{row.getValue("email")}</span>
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role") as Role
      return (
        <Badge variant={role === "Admin" ? "destructive" : "default"}>
          {role}
        </Badge>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: "Tanggal Dibuat",
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
      const userId = row.original.id
      const userName = row.original.name

      return (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/admin/users/${userId}/edit`}>
              <Edit className="h-4 w-4" />
            </Link>
          </Button>
          <DeleteUserDialog userId={userId} userName={userName} />
        </div>
      )
    },
  },
]