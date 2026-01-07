"use client"

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import Image from "next/image"
import { ZoomIn } from "lucide-react"
import { useState } from "react"
import { DialogTitle } from "@radix-ui/react-dialog"

interface ImagePreviewDialogProps {
  src: string
  alt: string
  width?: number
  height?: number
}

export default function ImagePreviewDialog({
  src,
  alt,
  width = 800,
  height = 450,
}: ImagePreviewDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="sr-only">Pratinjau Gambar</DialogTitle>
      <DialogTrigger asChild>
        <div className="relative max-w-2xl h-auto items-center mx-auto cursor-pointer group">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="rounded-lg mb-6 aspect-video object-cover w-full h-auto transition-transform duration-300 group-hover:scale-[1.02]"
            priority
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-lg flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 p-3 rounded-full">
              <ZoomIn className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-7xl w-full p-0 bg-black/95 border-none">
        <div className="relative w-full h-[90vh] flex items-center justify-center">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain"
            sizes="(max-width: 1920px) 100vw"
            quality={100}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}