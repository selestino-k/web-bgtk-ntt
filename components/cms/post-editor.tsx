"use client"

import { useState } from "react"
import { SerializedEditorState } from "lexical"
import Image from "next/image"
import { Editor } from "@/components/blocks/editor-00/editor"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Upload, Image as ImageIcon, Loader2 } from "lucide-react"
import { uploadImageToS3 } from "@/lib/admin/actions/s3-actions"
import { toast } from "sonner"

export interface PostData {
  title: string
  slug: string
  content: SerializedEditorState
  thumbnail: string
  thumbnailFile?: File
  tags: string[]
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
  }
  onSave?: (data: PostData) => Promise<void>
  onPublish?: (data: PostData) => Promise<void>
}

export function PostEditor({ initialData, onSave, onPublish }: PostEditorProps) {
  const [title, setTitle] = useState(initialData?.title || "")
  const [slug, setSlug] = useState(initialData?.slug || "")
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false)
  const [thumbnail, setThumbnail] = useState(initialData?.thumbnail || "")
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>(initialData?.tags || [])
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
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

  // Available tags (fetch from API in production)
  const availableTags = [
    "Berita Terkini",
    "Pengumuman",
    "Kegiatan",
    "Pendidikan",
    "Hari Guru Nasional",
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

  const handleSlugChange = (value: string) => {
    setSlug(value)
    setIsSlugManuallyEdited(true)
  }

  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag))
  }

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file')
      return
    }

    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB')
      return
    }

    setIsUploading(true)
    
    try {
      // Upload to S3 using server action
      const result = await uploadImageToS3(file, "posts/thumbnails")
      
      if (!result.success || !result.url) {
        throw new Error(result.error || 'Upload failed')
      }
      
      setThumbnail(result.url)
      setThumbnailFile(file)
      toast.success('Image uploaded successfully')
    } catch (error) {
      console.error('Upload error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to upload image')
    } finally {
      setIsUploading(false)
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

  const handleSave = async (publish: boolean = false) => {
    // Validation
    if (!title.trim()) {
      toast.error('Title is required')
      return
    }

    if (!slug.trim()) {
      toast.error('Slug is required')
      return
    }

    if (!thumbnail) {
      toast.error('Thumbnail is required')
      return
    }

    if (selectedTags.length === 0) {
      toast.error('Please select at least one tag')
      return
    }

    const postData: PostData = {
      title,
      slug,
      content: editorState,
      thumbnail,
      thumbnailFile: thumbnailFile || undefined,
      tags: selectedTags,
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
      toast.error(error instanceof Error ? error.message : 'Failed to save post')
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
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Thumbnail *</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!thumbnail ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    isDragging 
                      ? 'border-primary bg-primary/5' 
                      : 'border-gray-300 hover:border-primary/50'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    disabled={isLoading || isUploading}
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
                        {isUploading ? 'Uploading...' : 'Drag and drop gambar atau'}
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={isLoading || isUploading}
                        onClick={() => document.getElementById('file-upload')?.click()}
                      >
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Pilih Gambar
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative aspect-video rounded-md overflow-hidden border">
                    <Image
                      src={thumbnail}
                      alt="Thumbnail preview"
                      fill
                      className="object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        setThumbnail('')
                        setThumbnailFile(null)
                      }}
                      disabled={isLoading}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => document.getElementById('file-upload')?.click()}
                    disabled={isLoading || isUploading}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Ganti Gambar
                  </Button>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    disabled={isLoading || isUploading}
                  />
                </div>
              )}
              
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

              <div className="space-y-3">
                <Label htmlFor="thumbnail-url">URL Gambar</Label>
                <Input
                  id="thumbnail-url"
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  placeholder="https://..."
                  disabled={isLoading}
                />
              </div>
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
                    <Badge key={tag} variant="secondary" className="gap-1">
                      {tag}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => !isLoading && removeTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}