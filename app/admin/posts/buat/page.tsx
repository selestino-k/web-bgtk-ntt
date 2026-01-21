"use client"

import { PostEditor, PostData } from "@/components/cms/post-editor"
import { createPost } from "@/lib/admin/actions/post-action"
import { useRouter } from "next/navigation"
import {useToast} from "@/hooks/use-toast"
import { useSession } from "next-auth/react"
import { useEffect } from "react"



export default function NewPostPage() {
  const router = useRouter()
  const {toast} = useToast()
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in")
    }
  }, [status, router])

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (!session?.user?.id) {
    return null
  }

  const handleSave = async (data: PostData) => {
    try {
      const formData = new FormData()
      formData.append("title", data.title)
      formData.append("slug", data.slug)
      formData.append("content", JSON.stringify(data.content))
      formData.append("tags", data.tags.join(","))
      formData.append("published", "false")
      formData.append("authorId", session.user!.id)
      
      if (data.thumbnailFile) {
        formData.append("thumbnail", data.thumbnailFile)
      } else if (data.thumbnail) {
        formData.append("thumbnailUrl", data.thumbnail)
      }

      // Add single document URL
      if (data.document) {
        formData.append("document", data.document)
      }

      const result = await createPost(formData)

      if (!result.success) {
        throw new Error(result.error || 'Gagal menyimpan draft')
      }
      toast({
        title: "Sukses",
        description: result.message || 'Draft berhasil disimpan',
      })      
      if (result.post?.id) {
        router.push(`/admin/posts/edit/${result.post.id}`)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Gagal menyimpan draft',
        variant: "destructive",
      })
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
      formData.append("authorId", session.user!.id)
      
      if (data.thumbnailFile) {
        formData.append("thumbnail", data.thumbnailFile)
      } else if (data.thumbnail) {
        formData.append("thumbnailUrl", data.thumbnail)
      }

      // Add single document URL
      if (data.document) {
        formData.append("document", data.document)
      }

      const result = await createPost(formData)

      if (!result.success) {
        throw new Error(result.error || 'Gagal menerbitkan postingan')
      }

      toast({
        title: "Sukses",
        description: result.message || 'Postingan berhasil diterbitkan',
      })
      
      router.push('/admin/posts')
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Gagal menerbitkan postingan',
        variant: "destructive",
      })
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