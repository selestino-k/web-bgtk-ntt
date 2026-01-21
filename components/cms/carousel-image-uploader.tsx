"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, Loader2, X, Link2, Eye } from "lucide-react"
import { uploadCarouselImageToS3, deleteCarouselImageFromS3 } from "@/lib/admin/actions/s3-actions"
import { toast } from "sonner"

interface CarouselImageUploaderProps {
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

export function CarouselImageUploader({
  value,
  onChange,
  onDelete,
  folder = "images",
  maxSizeMB = 10,
  disabled = false,
  showUrlInput = true,
  label = "Gambar",
  aspectRatio = "video"
}: CarouselImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadMode, setUploadMode] = useState<"file" | "url">("file")
  const [externalUrl, setExternalUrl] = useState("")
  const [showUrlPreview, setShowUrlPreview] = useState(true)

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
      // Delete old image from S3 if exists and is S3 URL
      if (value && value.includes('.amazonaws.com/')) {
        await deleteCarouselImageFromS3(value)
      }

      // Upload new image
      const result = await uploadCarouselImageToS3(file, folder)
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

  const handleExternalUrlSubmit = () => {
    if (!externalUrl.trim()) {
      toast.error('Harap masukkan URL gambar')
      return
    }

    // Basic URL validation
    try {
      new URL(externalUrl)
      onChange(externalUrl)
      toast.success('URL gambar berhasil ditambahkan')
    } catch {
      toast.error('URL tidak valid')
    }
  }

  const handleDelete = async () => {
    if (!value) return

    try {
      // Delete from S3 only if it's an S3 URL
      if (value.includes('.amazonaws.com/')) {
        const deleteResult = await deleteCarouselImageFromS3(value)
        if (!deleteResult.success) {
          throw new Error(deleteResult.error || 'Gagal menghapus gambar')
        }
      }

      onChange('')
      setExternalUrl('')
      onDelete?.()
      toast.success('Gambar dihapus')
    } catch (error) {
      console.error('Delete image error:', error)
      toast.error('Gagal menghapus gambar')
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (!disabled && uploadMode === "file") {
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

    if (disabled || uploadMode !== "file") return

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

  const copyToClipboard = async () => {
    if (value) {
      await navigator.clipboard.writeText(value)
      toast.success('URL berhasil disalin')
    }
  }

  const isS3Url = value?.includes('.amazonaws.com/')

  return (
    <div className="space-y-4">
      <Label>{label}</Label>

      {/* Toggle Buttons */}
      {!value && (
        <div className="flex gap-2 p-1 bg-gray-100 rounded-lg w-fit">
          <Button
            type="button"
            variant={uploadMode === "file" ? "default" : "ghost"}
            size="sm"
            onClick={() => setUploadMode("file")}
            disabled={disabled}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload File
          </Button>
          <Button
            type="button"
            variant={uploadMode === "url" ? "default" : "ghost"}
            size="sm"
            onClick={() => setUploadMode("url")}
            disabled={disabled}
          >
            <Link2 className="h-4 w-4 mr-2" />
            URL Eksternal
          </Button>
        </div>
      )}
      
      {!value ? (
        <>
          {uploadMode === "file" ? (
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
              
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                {isUploading ? (
                  <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                ) : (
                  <Upload className="h-12 w-12 text-gray-400 mb-4" />
                )}
                <p className="text-sm font-medium text-gray-700 mb-1">
                  {isUploading ? 'Mengunggah...' : 'Klik untuk unggah atau seret gambar ke sini'}
                </p>
                <p className="text-xs text-gray-500">
                  Maksimal {maxSizeMB}MB - Format: JPG, PNG, GIF, WebP
                </p>
              </label>
            </div>
          ) : (
            <div className="space-y-3 border-2 border-dashed rounded-lg p-6">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <Link2 className="h-4 w-4" />
                <span>Masukkan URL gambar eksternal</span>
              </div>
              <div className="space-y-2">
                <Input
                  value={externalUrl}
                  onChange={(e) => setExternalUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  disabled={disabled}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleExternalUrlSubmit()
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={handleExternalUrlSubmit}
                  disabled={disabled || !externalUrl.trim()}
                  className="w-full"
                >
                  Gunakan URL Ini
                </Button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="space-y-4">
          <div className={`relative rounded-lg overflow-hidden border border-gray-200 ${getAspectClass()}`}>
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

          {showUrlInput && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium">
                  {isS3Url ? 'URL Gambar S3' : 'URL Gambar Eksternal'}
                </Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowUrlPreview(!showUrlPreview)}
                  className="h-6 px-2"
                >
                  <Eye className="h-3 w-3 mr-1" />
                  {showUrlPreview ? 'Sembunyikan' : 'Tampilkan'}
                </Button>
              </div>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Link2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    value={value}
                    readOnly
                    className="pl-9 font-mono text-xs bg-gray-50"
                    onClick={(e) => e.currentTarget.select()}
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={copyToClipboard}
                >
                  Salin URL
                </Button>
              </div>

              {showUrlPreview && (
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-xs font-medium text-gray-700 mb-2">Preview URL:</p>
                  <div className="relative w-full h-48 rounded-md overflow-hidden">
                    <Image
                      src={value}
                      alt="URL Preview"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2 break-all">{value}</p>
                </div>
              )}
            </div>
          )}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => document.getElementById('image-upload')?.click()}
            disabled={disabled}
            className="w-full"
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
    </div>
  )
}