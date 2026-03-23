"use server"

import { revalidatePath } from "next/cache"
import { eq, and, ne, max } from "drizzle-orm"
import {db} from "@/lib/db/db"
import { post, tag, postTag } from "@/lib/db/schema"
import { uploadImageToAssets, deleteFileFromAssets } from "./file-actions"

// Helper function to validate UUID
function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return uuidRegex.test(uuid)
}

// Create new post
export async function createPost(formData: FormData) {
  try {
    const title = formData.get("title") as string
    const slug = formData.get("slug") as string
    const content = formData.get("content") as string
    const tags = formData.get("tags") as string
    const published = formData.get("published") === "true"
    const authorId = formData.get("authorId") as string
    const document = formData.get("document") as string
    const thumbnailFile = formData.get("thumbnail") as File | null

    // Validate required fields
    if (!title || !slug || !content) {
      return {
        success: false,
        error: "Title, slug, and content are required"
      }
    }

    if (!authorId || !isValidUUID(authorId)) {
      return {
        success: false,
        error: "Valid author ID is required"
      }
    }

    const existingPost = await db
      .select({ id: post.id })
      .from(post)
      .where(eq(post.slug, slug))
      .limit(1)

    if (existingPost.length > 0) {
      return {
        success: false,
        error: "Slug already exists"
      }
    }

    // In createPost: only upload if no URL already set
    let thumbnailUrl = ""
    const existingThumbnailUrl = formData.get("existingThumbnailUrl") as string

    if (existingThumbnailUrl) {
      // Already uploaded by ImageUploader component
      thumbnailUrl = existingThumbnailUrl
    } else if (thumbnailFile && thumbnailFile.size > 0) {
      const uploadResult = await uploadImageToAssets(thumbnailFile, "posts")

      if (!uploadResult.success) {
        return {
          success: false,
          error: uploadResult.error || "Failed to upload thumbnail"
        }
      }

      thumbnailUrl = uploadResult.url || ""
    }

    const contentJson = JSON.parse(content)
    const tagNames = tags ? tags.split(",").map(t => t.trim()).filter(Boolean) : []

    // Generate a post ID using MAX(id) + 1
    const [maxResult] = await db.select({ maxId: max(post.id) }).from(post)
    const postId = (maxResult?.maxId ?? 0) + 1

    const [newPost] = await db
      .insert(post)
      .values({
        id: Number(postId),
        title,
        slug,
        content: contentJson,
        thumbnail: thumbnailUrl || null,
        document: document || null,
        published,
        authorId,
        updatedAt: new Date(),
      })
      .returning()

    // Upsert tags and create post-tag relations
    for (const tagName of tagNames) {
      const tagType = tagName.toLowerCase() === "pengumuman" ? "ANNOUNCEMENT" : "CATEGORY"

      const [existingTag] = await db
        .select()
        .from(tag)
        .where(eq(tag.name, tagName))
        .limit(1)

      let tagId: number

      if (existingTag) {
        await db
          .update(tag)
          .set({ type: tagType })
          .where(eq(tag.id, existingTag.id))
        tagId = existingTag.id
      } else {
        const [newTag] = await db
          .insert(tag)
          .values({
            name: tagName,
            slug: tagName.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, ""),
            type: tagType,
          })
          .returning()
        tagId = newTag.id
      }

      await db.insert(postTag).values({
        postId: newPost.id,
        tagId,
      })
    }

    revalidatePath("/admin/posts")
    revalidatePath("/posts")
    if (published) {
      revalidatePath(`/posts/${slug}`)
    }

    return {
      success: true,
      post: newPost,
      message: published ? "Postingan berhasil diterbitkan" : "Draft berhasil disimpan"
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal menyimpan postingan",
    }
  }
}

// Update existing post
export async function updatePost(postId: string, formData: FormData) {
  try {
    const title = formData.get("title") as string
    const slug = formData.get("slug") as string
    const content = formData.get("content") as string
    const tags = formData.get("tags") as string
    const document = formData.get("document") as string
    const published = formData.get("published") === "true"
    const existingThumbnail = formData.get("existingThumbnail") as string

    const [existingPost] = await db
      .select()
      .from(post)
      .where(eq(post.id, Number(postId)))
      .limit(1)

    if (!existingPost) {
      return {
        success: false,
        error: "Post not found"
      }
    }

    if (slug !== existingPost.slug) {
      const [slugExists] = await db
        .select({ id: post.id })
        .from(post)
        .where(and(eq(post.slug, slug), ne(post.id, Number(postId))))
        .limit(1)

      if (slugExists) {
        return {
          success: false,
          error: "Slug already exists"
        }
      }
    }

    // Thumbnail is always pre-uploaded by ImageUploader — use URL directly
    const thumbnailUrl = (formData.get("existingThumbnailUrl") as string)
      || existingThumbnail
      || existingPost.thumbnail
      || ""

    const contentJson = JSON.parse(content)
    const tagsArray = tags ? tags.split(",").map(t => t.trim()).filter(Boolean) : []

    // Update post
    const [updatedPost] = await db
      .update(post)
      .set({
        title,
        slug,
        content: contentJson,
        thumbnail: thumbnailUrl || null,
        document: document || null,
        published,
        createdAt: published && !existingPost.published ? new Date() : existingPost.createdAt,
        updatedAt: new Date(),
      })
      .where(eq(post.id, Number(postId)))
      .returning()

    // Delete all existing post-tag relations
    await db.delete(postTag).where(eq(postTag.postId, Number(postId)))

    // Re-create tags and post-tag relations
    for (const tagName of tagsArray) {
      const tagType = tagName.toLowerCase() === "pengumuman" ? "ANNOUNCEMENT" : "CATEGORY"

      const [existingTag] = await db
        .select()
        .from(tag)
        .where(eq(tag.name, tagName))
        .limit(1)

      let tagId: number

      if (existingTag) {
        tagId = existingTag.id
      } else {
        const [newTag] = await db
          .insert(tag)
          .values({
            name: tagName,
            slug: tagName.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, ""),
            type: tagType,
          })
          .returning()
        tagId = newTag.id
      }

      await db.insert(postTag).values({
        postId: Number(postId),
        tagId,
      })
    }

    revalidatePath("/admin/posts")
    revalidatePath("/posts")
    revalidatePath(`/posts/${existingPost.slug}`)
    if (slug !== existingPost.slug) {
      revalidatePath(`/posts/${slug}`)
    }

    return {
      success: true,
      post: updatedPost,
      message: "Post updated successfully"
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update post"
    }
  }
}

// Delete post
export async function deletePost(postId: string) {
  try {
    const [existingPost] = await db
      .select()
      .from(post)
      .where(eq(post.id, Number(postId)))
      .limit(1)

    if (!existingPost) {
      return {
        success: false,
        error: "Post not found"
      }
    }

    if (existingPost.thumbnail) {
      await deleteFileFromAssets(existingPost.thumbnail)
    }

    // postTag rows are deleted automatically via cascade
    await db.delete(post).where(eq(post.id, Number(postId)))

    revalidatePath("/admin/posts")
    revalidatePath("/posts")
    if (existingPost.slug) {
      revalidatePath(`/posts/${existingPost.slug}`)
    }

    return {
      success: true,
      message: "Post deleted successfully"
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete post"
    }
  }
}

// Get single post
export async function getPost(postId: string) {
  try {
    const [existingPost] = await db
      .select()
      .from(post)
      .where(eq(post.id, Number(postId)))
      .limit(1)

    if (!existingPost) {
      return {
        success: false,
        error: "Post not found"
      }
    }

    return {
      success: true,
      post: existingPost
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch post"
    }
  }
}

