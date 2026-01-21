"use client"

import { PostEditor, PostData } from "@/components/cms/post-editor"
import { updatePost } from "@/lib/admin/actions/post-action"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Prisma } from "@/lib/generated/prisma/client"

interface EditPostClientProps {
  postId: string
  initialData: {
    id: string
    title: string
    slug: string
    content: Prisma.JsonValue
    thumbnail: string | null
    tags: string[]
    document: string | null
    published: boolean
  }
}

export function EditPostClient({ postId, initialData }: EditPostClientProps) {
  const router = useRouter()

  const handleSave = async (data: PostData) => {
    try {
      const formData = new FormData()
      formData.append("title", data.title)
      formData.append("slug", data.slug)
      formData.append("content", typeof data.content === 'string' ? data.content : JSON.stringify(data.content))
      formData.append("tags", data.tags.join(","))
      formData.append("published", "false") // Save as draft

      // Handle thumbnail
      if (data.thumbnailFile) {
        formData.append("thumbnail", data.thumbnailFile)
      } else if (data.thumbnail) {
        formData.append("existingThumbnail", data.thumbnail)
      }

      // Handle document
      if (data.document) {
        formData.append("document", data.document)
      }

      const result = await updatePost(postId, formData)

      if (!result.success) {
        throw new Error(result.error || "Gagal menyimpan perubahan")
      }

      toast.success(result.message || "Perubahan berhasil disimpan")
      router.push("/admin/posts")
      router.refresh()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gagal menyimpan perubahan")
      throw error
    }
  }

  const handlePublish = async (data: PostData) => {
    try {
      const formData = new FormData()
      formData.append("title", data.title)
      formData.append("slug", data.slug)
      formData.append("content", typeof data.content === 'string' ? data.content : JSON.stringify(data.content))
      formData.append("tags", data.tags.join(","))
      formData.append("published", "true") // Publish

      // Handle thumbnail
      if (data.thumbnailFile) {
        formData.append("thumbnail", data.thumbnailFile)
      } else if (data.thumbnail) {
        formData.append("existingThumbnail", data.thumbnail)
      }

      // Handle document
      if (data.document) {
        formData.append("document", data.document)
      }

      const result = await updatePost(postId, formData)

      if (!result.success) {
        throw new Error(result.error || "Gagal menerbitkan postingan")
      }

      toast.success(result.message || "Postingan berhasil diterbitkan")
      router.push("/admin/posts")
      router.refresh()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gagal menerbitkan postingan")
      throw error
    }
  }

  return (
    <div className="items-stretch w-full min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-3 w-full">
        <PostEditor
          initialData={{
            id: initialData.id,
            title: initialData.title,
            slug: initialData.slug,
            content: initialData.content,
            thumbnail: initialData.thumbnail || "",
            tags: initialData.tags,
            document: initialData.document,
          }}
          onSave={handleSave}
          onPublish={handlePublish}
        />
      </main>
    </div>
  )
}