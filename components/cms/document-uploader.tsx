"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Upload, X, Loader2 } from "lucide-react"
import { uploadDocumentToS3, deleteDocumentFromS3 } from "@/lib/admin/actions/s3-actions"
import { toast } from "sonner"

interface DocumentUploaderProps {
  value?: string
  onChange: (url: string | null, file?: File) => void
  folder?: string
  accept?: string
  maxSizeMB?: number
}

export function DocumentUploader({
  value,
  onChange,
  folder = "documents",
  accept = ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt",
  maxSizeMB = 50
}: DocumentUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const getFileName = (url: string) => {
    const parts = url.split('/')
    const fileName = parts[parts.length - 1]
    // Remove timestamp prefix
    return fileName.replace(/^\d+-/, '')
  }

  const handleFileUpload = async (file: File) => {
    // Validate file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(`Ukuran file harus kurang dari ${maxSizeMB}MB`)
      return
    }

    setIsUploading(true)
    
    try {
      // Delete old document if exists
      if (value) {
        await deleteDocumentFromS3(value)
      }

      // Upload new document
      const result = await uploadDocumentToS3(file, folder)
      
      if (!result.success || !result.url) {
        throw new Error(result.error || 'Gagal mengunggah dokumen')
      }
      
      onChange(result.url, file)
      toast.success('Dokumen berhasil diunggah')
    } catch (error) {
      console.error('Upload error:', error)
      toast.error(error instanceof Error ? error.message : 'Gagal mengunggah dokumen')
    } finally {
      setIsUploading(false)
    }
  }

  const handleDelete = async () => {
    if (!value) return

    try {
      await deleteDocumentFromS3(value)
      onChange(null)
      toast.success('Dokumen berhasil dihapus')
    } catch (error) {
      console.error('Delete error:', error)
      toast.error('Gagal menghapus dokumen')
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
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

  if (value) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm font-medium">{getFileName(value)}</p>
                <a
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline"
                >
                  Lihat dokumen
                </a>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDelete}
              disabled={isUploading}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      className={`border-2 border-dashed transition-colors ${
        isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <CardContent className="p-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          {isUploading ? (
            <>
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Mengunggah dokumen...</p>
            </>
          ) : (
            <>
              <Upload className="h-12 w-12 text-muted-foreground" />
              <div className="text-center">
                <p className="text-sm font-medium">
                  Seret dan lepas dokumen di sini
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  atau klik tombol di bawah untuk memilih file
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PDF, Word, Excel, PowerPoint (Maks. {maxSizeMB}MB)
                </p>
              </div>
              <Button variant="outline" asChild>
                <label className="cursor-pointer">
                  Pilih Dokumen
                  <input
                    type="file"
                    className="hidden"
                    accept={accept}
                    onChange={handleFileSelect}
                  />
                </label>
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}