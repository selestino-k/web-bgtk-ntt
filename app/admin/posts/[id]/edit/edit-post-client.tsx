"use client"

import { PostEditor, PostData } from "@/components/cms/post-editor"
import { updatePost } from "@/lib/admin/actions/post-action"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { SerializedEditorState } from "lexical"

interface EditPostClientProps {
  postId: string
  initialData: {
    id: string
    title: string
    slug: string
    content: SerializedEditorState
    thumbnail: string
    tags: string[]
    document: string | null
  }
}

export function EditPostClient({ postId, initialData }: EditPostClientProps) {
  const router = useRouter()

  const handleUpdate = async (data: PostData, publish: boolean = false) => {
    try {
      const formData = new FormData()
      formData.append("title", data.title)
      formData.append("slug", data.slug)
      formData.append("content", JSON.stringify(data.content))
      formData.append("tags", data.tags.join(","))
      formData.append("published", publish ? "true" : "false")

      if (data.thumbnailFile) {
        formData.append("thumbnail", data.thumbnailFile)
      } else if (data.thumbnail) {
        formData.append("thumbnailUrl", data.thumbnail)
      }

      if (data.document) {
        formData.append("document", data.document)
      }

      const result = await updatePost(postId, formData)

      if (!result.success) {
        throw new Error(result.error || "Gagal memperbarui postingan")
      }

      toast.success(result.message || "Postingan berhasil diperbarui")
      
      if (publish) {
        router.push("/admin/posts")
      } else {
        router.refresh()
      }

      return result
    } catch (error) {
      console.error("Error updating post:", error)
      toast.error(error instanceof Error ? error.message : "Gagal memperbarui postingan")
      throw error
    }
  }

  return (
    <PostEditor
      initialData={initialData}
      onSave={async (data) => {
        await handleUpdate(data, false)
      }}
      onPublish={async (data) => {
        await handleUpdate(data, true)
      }}
    />
  )
}