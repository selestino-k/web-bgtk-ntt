/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Loader2 } from "lucide-react"
import { ImageUploader } from "@/components/cms/image-uploader"
import { DocumentCard } from "@/components/cms/document-card"
import { DocumentDialog } from "@/components/cms/document-dialog"
import { toast } from "sonner"
import Link from "next/link"
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor"
import { Prisma } from "@/lib/generated/prisma/client"
import { JSONContent } from "@tiptap/core"

// TipTap content type
type TipTapContent = JSONContent

export interface PostData {
  title: string
  slug: string
  content: Prisma.JsonValue
  thumbnail: string
  thumbnailFile?: File
  tags: string[]
  document: string | null
  published: boolean
}

interface PostEditorProps {
  initialData?: {
    id?: string
    title?: string
    slug?: string
    content?: Prisma.JsonValue
    thumbnail?: string
    tags?: string[]
    document?: string | null
  }
  onSave?: (data: PostData) => Promise<void>
  onPublish?: (data: PostData) => Promise<void>
}

export function PostEditor({ initialData, onSave, onPublish }: PostEditorProps) {
  const [title, setTitle] = useState(initialData?.title || "")
  const [slug, setSlug] = useState(initialData?.slug || "")
  const [isSlugManuallyEdited] = useState(false)
  const [thumbnail, setThumbnail] = useState(initialData?.thumbnail || "")
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>(initialData?.tags || [])
  const [documentUrl, setDocumentUrl] = useState<string | null>(initialData?.document || null)
  const [isSaving, setIsSaving] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [showDocumentDialog, setShowDocumentDialog] = useState(false)
  const [editorContent, setEditorContent] = useState<TipTapContent>(
    (initialData?.content as TipTapContent) || {
      type: "doc",
      content: [],
    }
  )

  const isEditMode = !!initialData?.id


  const availableTags = [
    "Kabar Balai",
    "Kabar Kementerian",
    "Rumah Pendidikan",
    "Pendidikan",
    "Teknologi",
    "Humas",
    "Internasional",
    "Ramah",
    "Pendidikan Bermutu Untuk Semua", 
    "Pengumuman",
  ]

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const handleTitleChange = (value: string) => {
    setTitle(value)
    if (!isSlugManuallyEdited && !isEditMode) {
      setSlug(generateSlug(value))
    }
  }

  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag))
  }

  const handleThumbnailChange = (url: string, file?: File) => {
    setThumbnail(url)
    if (file) {
      setThumbnailFile(file)
    }
  }

  const handleThumbnailDelete = () => {
    setThumbnail('')
    setThumbnailFile(null)
  }

  const handleAddDocument = (driveUrl: string) => {
    setDocumentUrl(driveUrl)
    toast.success(documentUrl ? 'Dokumen berhasil diubah' : 'Dokumen berhasil ditambahkan')
  }

  const handleRemoveDocument = () => {
    setDocumentUrl(null)
    toast.success('Dokumen dihapus dari daftar')
  }

  const hasContent = (content: TipTapContent): boolean => {
    try {
      if (!content || !content.content || !Array.isArray(content.content)) {
        return false
      }
      
      // Check if there's any non-empty content
      return content.content.some((node: any) => {
        if (node.type === "paragraph" && node.content && Array.isArray(node.content)) {
          return node.content.some((child: any) => 
            child.type === "text" && child.text && child.text.trim().length > 0
          )
        }
        return node.content && Array.isArray(node.content) && node.content.length > 0
      })
    } catch  {
      toast.error('Gagal memeriksa konten editor')
      return false
    }
  }

  const handleSave = async (publish: boolean = false) => {
    // Validation
    if (!title.trim()) {
      toast.error('Judul wajib diisi')
      return
    }

    if (!slug.trim()) {
      toast.error('Slug wajib diisi')
      return
    }

    if (selectedTags.length === 0) {
      toast.error('Harap pilih setidaknya satu kategori/tag')
      return
    }

    // Validate content
    if (!hasContent(editorContent)) {
      toast.error('Konten berita wajib diisi')
      return
    }

    const postData: PostData = {
      title,
      slug,
      content: editorContent as Prisma.JsonValue,
      thumbnail,
      thumbnailFile: thumbnailFile || undefined,
      tags: selectedTags,
      document: documentUrl,
      published: publish,
    }

    try {
      if (publish) {
        setIsPublishing(true)
        await onPublish?.(postData)
      } else {
        setIsSaving(true)
        await onSave?.(postData)
      }
      toast.success(isEditMode ? 'Postingan berhasil diperbarui' : 'Postingan berhasil disimpan')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Gagal menyimpan postingan')
    } finally {
      setIsSaving(false)
      setIsPublishing(false)
    }
  }

  const isLoading = isSaving || isPublishing

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl/7 font-semibold sm:text-5xl sm:tracking-tight text-primary">
            {isEditMode ? 'Edit Berita' : 'Buat Berita Baru'}
          </h2>
        </div>
        <div className="space-x-2">
          <Link href="/admin/posts">
            <Button type="button" variant="outline" disabled={isLoading}>
              Batal
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={() => handleSave(false)}
            disabled={isLoading}
          >
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEditMode ? 'Simpan Perubahan' : 'Simpan Draft'}
          </Button>
          <Button
            onClick={() => handleSave(true)}
            disabled={isLoading}
          >
            {isPublishing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEditMode ? 'Update & Publikasikan' : 'Publikasikan'}
          </Button>
        </div>
      </div>
      <div className="text-sm text-muted-foreground">
        (*) Wajib diisi
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Utama</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label htmlFor="title">Judul Berita *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Masukkan judul berita..."
                  className="text-lg"
                  disabled={isLoading}
                />
              </div>

              <div>
                <Label htmlFor="slug">Slug URL {!isEditMode && '(Otomatis)'} *</Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Pratinjau: /posts/{slug}
                </p>
              </div>
            </CardContent>
          </Card>


          {/* Content Editor */}
          <Card className="flex flex-col" style={{ height: '600px' }}>
            <CardHeader className="flex-shrink-0">
              <CardTitle>Konten Berita *</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
              <SimpleEditor 
                initialContent={editorContent}
                onChange={setEditorContent}
              />
            </CardContent>
          </Card>

          {/* Document Attachment */}
          <DocumentCard
            documentUrl={documentUrl}
            onAdd={() => setShowDocumentDialog(true)}
            onRemove={handleRemoveDocument}
            disabled={isLoading}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Thumbnail</CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUploader
                value={thumbnail}
                onChange={handleThumbnailChange}
                onDelete={handleThumbnailDelete}
                folder="posts/thumbnails"
                disabled={isLoading}
                label="Gambar Thumbnail"
                aspectRatio="video"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tag Berita *</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="mb-2 space-y-3">
                <Label htmlFor="tag-select">Pilih Tag</Label>
                <Select onValueChange={addTag} disabled={isLoading}>
                  <SelectTrigger id="tag-select">
                    <SelectValue placeholder="Pilih tag..." />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTags
                      .filter(tag => !selectedTags.includes(tag))
                      .map((tag) => (
                        <SelectItem key={tag} value={tag}>
                          {tag}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedTags.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Belum ada tag dipilih
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {selectedTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="default"
                      className="gap-1 text-sm cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation()
                        if (!isLoading) removeTag(tag)
                      }}
                    >
                      {tag}
                      <X className="h-3 w-3" />
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Document Dialog */}
      <DocumentDialog
        open={showDocumentDialog}
        onOpenChange={setShowDocumentDialog}
        onConfirm={handleAddDocument}
        initialValue={documentUrl}
      />
    </div>
  )
}