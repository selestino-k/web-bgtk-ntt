"use client"

import { useState } from "react"
import { SerializedEditorState } from "lexical"
import { Editor } from "@/components/blocks/editor-00/editor"
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

export interface PostData {
  title: string
  slug: string
  content: SerializedEditorState
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
    content?: SerializedEditorState
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
  const [editorState, setEditorState] = useState<SerializedEditorState>(
    initialData?.content || {
      root: {
        children: [{
          children: [],
          direction: "ltr",
          format: "",
          indent: 0,
          type: "paragraph",
          version: 1,
        }],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "root",
        version: 1,
      },
    } as unknown as SerializedEditorState
  )

  const availableTags = [
    "Kabar Balai",
    "Kabar Kementerian",
    "Rumah Pendidikan",
    "Pendidikan",
    "Teknologi",
    "Humas",
    "Internasional",
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
    if (!isSlugManuallyEdited) {
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

    const postData: PostData = {
      title,
      slug,
      content: editorState,
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
    } catch (error) {
      console.error('Save error:', error)
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
        <h2 className="text-2xl/7 font-semibold sm:truncate sm:text-5xl sm:tracking-tight text-primary">
          {initialData?.id ? 'Edit Berita' : 'Buat Berita Baru'}
        </h2>
        <div className="space-x-2">
          <Button
            variant="outline"
            onClick={() => handleSave(false)}
            disabled={isLoading}
          >
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Simpan Draft
          </Button>
          <Button
            onClick={() => handleSave(true)}
            disabled={isLoading}
          >
            {isPublishing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Publikasikan
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
                <Label htmlFor="slug">Slug URL (Otomatis) *</Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Preview: /posts/{slug}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Konten Berita *</CardTitle>
            </CardHeader>
            <CardContent>
              <Editor
                editorSerializedState={editorState}
                onSerializedChange={(value) => setEditorState(value)}
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