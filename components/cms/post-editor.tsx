"use client"

import { useState } from "react"
import { SerializedEditorState } from "lexical"
import { Editor } from "@/components/blocks/editor-00/editor"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

export interface PostData {
  title: string
  slug: string
  excerpt: string
  content: SerializedEditorState
  thumbnail: string
  tags: string[]
  published: boolean
}

interface PostEditorProps {
  initialData?: {
    title?: string
    slug?: string
    excerpt?: string
    content?: SerializedEditorState
    thumbnail?: string
    tags?: string[]
  }
  onSave?: (data: PostData) => void
  onPublish?: (data: PostData) => void
}

export function PostEditor({ initialData, onSave, onPublish }: PostEditorProps) {
  const [title, setTitle] = useState(initialData?.title || "")
  const [slug, setSlug] = useState(initialData?.slug || "")
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "")
  const [thumbnail, setThumbnail] = useState(initialData?.thumbnail || "")
  const [selectedTags, setSelectedTags] = useState<string[]>(initialData?.tags || [])
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
    if (!slug) {
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

  const handleSave = (publish: boolean = false) => {
    const postData = {
      title,
      slug,
      excerpt,
      content: editorState,
      thumbnail,
      tags: selectedTags,
      published: publish,
    }

    if (publish) {
      onPublish?.(postData)
    } else {
      onSave?.(postData)
    }
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Buat Berita Baru</h1>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => handleSave(false)}>
            Simpan Draft
          </Button>
          <Button onClick={() => handleSave(true)}>
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
              <div>
                <Label htmlFor="title">Judul Berita</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Masukkan judul berita..."
                  className="text-lg"
                />
              </div>

              <div>
                <Label htmlFor="slug">Slug URL</Label>
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="judul-berita-url"
                />
              </div>

              <div>
                <Label htmlFor="excerpt">Ringkasan</Label>
                <Textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Tulis ringkasan singkat berita..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Konten Berita</CardTitle>
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
              <CardTitle>Thumbnail</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="thumbnail">URL Gambar</Label>
                <Input
                  id="thumbnail"
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  placeholder="https://..."
                />
              </div>
              {thumbnail && (
                <div className="relative aspect-video rounded-md overflow-hidden border">
                  <img
                    src={thumbnail}
                    alt="Thumbnail preview"
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tag Berita</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="tag-select">Pilih Tag</Label>
                <Select onValueChange={addTag}>
                  <SelectTrigger id="tag-select">
                    <SelectValue placeholder="Pilih tag..." />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTags.map((tag) => (
                      <SelectItem key={tag} value={tag}>
                        {tag}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedTags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    {tag}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => removeTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}