"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type UnduhTable = {
  id: string
  nama: string
  tipe: "Regulasi" | "Dokumen" | "Buku" 
}

export const columns: ColumnDef<UnduhTable>[] = [
  {
    accessorKey: "nama",
    header: "Nama",
  },
  
  {
    accessorKey: "tipe",
    header: "Tipe",
  },
  {
    accessorKey: "unduh",
    header: "Aksi",
    cell: () => (
        <Button variant="default">
            <Download/> Unduh
        </Button>
    ),
  }
]