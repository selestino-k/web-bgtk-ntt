"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { uploadDocument } from "@/lib/admin/actions/doc-action"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, Loader2 } from "lucide-react"
import { DocumentUploader } from "@/components/cms/document-uploader"

export default function UploadDocumentPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    documentFile: null as File | null,
  })

  const handleFileChange = (file: File | null) => {
    setFormData(prev => ({
      ...prev,
      documentFile: file,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      toast.error("Harap masukkan judul dokumen")
      return
    }

    if (!formData.documentFile) {
      toast.error("Harap unggah dokumen")
      return
    }

    setIsSubmitting(true)

    try {
      const submitData = new FormData()
      submitData.append("title", formData.title)
      submitData.append("description", formData.description)
      submitData.append("file", formData.documentFile)

      const result = await uploadDocument(submitData)

      if (!result.success) {
        throw new Error(result.error || "Gagal mengunggah dokumen")
      }

      toast.success("Dokumen berhasil diunggah")
      router.push("/admin/docs")
      router.refresh()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gagal mengunggah dokumen")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="items-stretch w-full min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
        <div className="grid justify-between items-center gap-6 px-2">
          <h2 className="text-2xl/7 font-geist font-semibold sm:truncate sm:text-5xl sm:tracking-tight text-primary">
            Unggah Dokumen
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Informasi Dokumen</CardTitle>
              <CardDescription>
                Isi detail dokumen yang akan diunggah
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">
                  Judul Dokumen <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="Masukkan judul dokumen"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, title: e.target.value }))
                  }
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  Deskripsi
                </Label>
                <Textarea
                  id="description"
                  placeholder="Masukkan deskripsi dokumen (opsional)"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, description: e.target.value }))
                  }
                  disabled={isSubmitting}
                  rows={4}
                />
              </div>

              <DocumentUploader
                file={formData.documentFile}
                onFileChange={handleFileChange}
                disabled={isSubmitting}
                required
              />

              <div className="flex items-center gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting || !formData.documentFile}
                  className="min-w-[150px]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Mengunggah...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Unggah Dokumen
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/admin/docs")}
                  disabled={isSubmitting}
                >
                  Batal
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </main>
    </div>
  )
}