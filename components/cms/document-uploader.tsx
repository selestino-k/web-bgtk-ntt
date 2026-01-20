"use client"

import React, { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, FileText, X } from "lucide-react"

interface DocumentUploaderProps {
  file: File | null
  onFileChange: (file: File | null) => void
  disabled?: boolean
  required?: boolean
}

export function DocumentUploader({ 
  file, 
  onFileChange, 
  disabled = false,
  required = false 
}: DocumentUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleFileValidation = (selectedFile: File) => {
    const maxSizeMB = 50
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain',
    ]

    if (!allowedTypes.includes(selectedFile.type)) {
      toast.error("Tipe file tidak didukung. Harap unggah PDF, Word, Excel, PowerPoint, atau Text file.")
      return false
    }

    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      toast.error(`Ukuran file harus kurang dari ${maxSizeMB}MB`)
      return false
    }

    return true
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && handleFileValidation(selectedFile)) {
      onFileChange(selectedFile)
      toast.success("File berhasil dipilih")
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
    
    const selectedFile = e.dataTransfer.files[0]
    if (selectedFile && handleFileValidation(selectedFile)) {
      onFileChange(selectedFile)
      toast.success("File berhasil dipilih")
    }
  }

  const handleRemoveFile = () => {
    onFileChange(null)
  }

  return (
    <div className="space-y-2">
      <Label>
        File Dokumen {required && <span className="text-red-500">*</span>}
      </Label>
      
      {file ? (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleRemoveFile}
                disabled={disabled}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
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
              <Upload className="h-12 w-12 text-muted-foreground" />
              <div className="text-center">
                <p className="text-sm font-medium">
                  Seret dan lepas dokumen di sini
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  atau klik tombol di bawah untuk memilih file
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PDF, Word, Excel, PowerPoint, Text (Maks. 50MB)
                </p>
              </div>
              <Button type="button" variant="outline" asChild>
                <label className="cursor-pointer">
                  Pilih Dokumen
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                    onChange={handleFileChange}
                    disabled={disabled}
                  />
                </label>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}