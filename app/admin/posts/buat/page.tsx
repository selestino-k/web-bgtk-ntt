"use client"

import { PostEditor, PostData } from "@/components/cms/post-editor"
import { createPost } from "@/lib/admin/actions/post-action"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function NewPostPage() {
  const router = useRouter()

  // TODO: Get actual user ID from authentication
  // For now, use a default UUID or create a default user
  const DEFAULT_AUTHOR_ID = "07f15db1-8acd-4249-b72f-5fadc05c2b15" // Placeholder UUID

  const handleSave = async (data: PostData) => {
    try {
      const formData = new FormData()
      formData.append("title", data.title)
      formData.append("slug", data.slug)
      formData.append("content", JSON.stringify(data.content))
      formData.append("tags", data.tags.join(","))
      formData.append("published", "false")
      formData.append("authorId", DEFAULT_AUTHOR_ID) // Use valid UUID
      
      if (data.thumbnailFile) {
        formData.append("thumbnail", data.thumbnailFile)
      }

      const result = await createPost(formData)

      if (!result.success) {
        throw new Error(result.error || 'Failed to save draft')
      }

      toast.success(result.message || 'Draft saved successfully')
      
      if (result.post?.id) {
        router.push(`/admin/posts/edit/${result.post.id}`)
      }
    } catch (error) {
      console.error('Error saving draft:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to save draft')
      throw error
    }
  }

  const handlePublish = async (data: PostData) => {
    try {
      const formData = new FormData()
      formData.append("title", data.title)
      formData.append("slug", data.slug)
      formData.append("content", JSON.stringify(data.content))
      formData.append("tags", data.tags.join(","))
      formData.append("published", "true")
      formData.append("authorId", DEFAULT_AUTHOR_ID) // Use valid UUID
      
      if (data.thumbnailFile) {
        formData.append("thumbnail", data.thumbnailFile)
      }

      const result = await createPost(formData)

      if (!result.success) {
        throw new Error(result.error || 'Failed to publish post')
      }

      toast.success(result.message || 'Post published successfully')
      router.push('/admin/posts')
    } catch (error) {
      console.error('Error publishing post:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to publish post')
      throw error
    }
  }

  return (
    <div className="items-stretch w-full min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-3 w-full">
        <PostEditor 
          onSave={handleSave}
          onPublish={handlePublish}
        />
      </main>
    </div>
  )
}