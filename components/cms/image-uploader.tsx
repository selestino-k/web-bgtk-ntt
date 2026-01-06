"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, Image as ImageIcon, Loader2, X } from "lucide-react"
import { uploadImageToS3, deleteImageFromS3 } from "@/lib/admin/actions/s3-actions"
import { toast } from "sonner"

interface ImageUploaderProps {
  value?: string
  onChange: (url: string, file?: File) => void
  onDelete?: () => void
  folder?: string
  maxSizeMB?: number
  disabled?: boolean
  showUrlInput?: boolean
  label?: string
  aspectRatio?: "video" | "square" | "auto"
}

export function ImageUploader({
  value,
  onChange,
  onDelete,
  folder = "images",
  maxSizeMB = 10,
  disabled = false,
  showUrlInput = true,
  label = "Gambar",
  aspectRatio = "video"
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Harap unggah file gambar')
      return
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(`Ukuran file harus kurang dari ${maxSizeMB}MB`)
      return
    }

    setIsUploading(true)

    try {
      // Delete old image from S3 if exists
      if (value) {
        const deleteResult = await deleteImageFromS3(value)
        if (!deleteResult.success) {
          console.warn('Failed to delete old image:', deleteResult.error)
        }
      }

      // Upload new image
      const result = await uploadImageToS3(file, folder)

      if (!result.success || !result.url) {
        throw new Error(result.error || 'Gagal mengunggah gambar')
      }

      onChange(result.url, file)
      toast.success('Gambar berhasil diunggah')
    } catch (error) {
      console.error('Upload error:', error)
      toast.error(error instanceof Error ? error.message : 'Gagal mengunggah gambar')
    } finally {
      setIsUploading(false)
    }
  }

  const handleDelete = async () => {
    if (!value) return

    try {
      // Delete from S3
      const deleteResult = await deleteImageFromS3(value)
      if (!deleteResult.success) {
        console.warn('Failed to delete image:', deleteResult.error)
      }

      onChange('')
      onDelete?.()
      toast.success('Gambar dihapus')
    } catch (error) {
      console.error('Delete image error:', error)
      toast.error('Gagal menghapus gambar')
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (!disabled) {
      setIsDragging(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (disabled) return

    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const getAspectClass = () => {
    switch (aspectRatio) {
      case "video":
        return "aspect-video"
      case "square":
        return "aspect-square"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-4">
      <Label>{label}</Label>
      
      {!value ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging
              ? 'border-primary bg-primary/5'
              : 'border-gray-300 hover:border-primary/50'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            disabled={disabled || isUploading}
          />
          <div className="space-y-4">
            <div className="flex justify-center">
              {isUploading ? (
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
              ) : (
                <Upload className="h-12 w-12 text-gray-400" />
              )}
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                {isUploading ? 'Mengunggah...' : 'Drag and drop gambar atau'}
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={disabled || isUploading}
                onClick={() => document.getElementById('image-upload')?.click()}
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                Pilih Gambar
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              PNG, JPG, GIF hingga {maxSizeMB}MB
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className={`relative ${getAspectClass()} rounded-md overflow-hidden border`}>
            <Image
              src={value}
              alt="Preview"
              fill
              className="object-cover"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={handleDelete}
              disabled={disabled}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => document.getElementById('image-upload')?.click()}
            disabled={disabled || isUploading}
          >
            <Upload className="h-4 w-4 mr-2" />
            Ganti Gambar
          </Button>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            disabled={disabled || isUploading}
          />
        </div>
      )}

      {showUrlInput && (
        <>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Atau
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image-url">URL Gambar</Label>
            <Input
              id="image-url"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder="https://..."
              disabled={disabled}
            />
          </div>
        </>
      )}
    </div>
  )
}