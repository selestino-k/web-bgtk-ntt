"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { Prisma } from "@/lib/generated/prisma/client"
import { uploadImageToAssets, deleteFileFromAssets } from "./file-actions"


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

    // Validate authorId is a valid UUID
    if (!authorId || !isValidUUID(authorId)) {
      return { 
        success: false, 
        error: "Valid author ID is required" 
      }
    }

    // Check if slug already exists
    const existingPost = await prisma.post.findUnique({
      where: { slug }
    })

    if (existingPost) {
      return { 
        success: false, 
        error: "Slug already exists" 
      }
    }

    // Upload thumbnail to Assets if provided
    let thumbnailUrl = ""
    if (thumbnailFile && thumbnailFile.size > 0) {
      const uploadResult = await uploadImageToAssets(thumbnailFile, "posts")
      
      if (!uploadResult.success) {
        return { 
          success: false, 
          error: uploadResult.error || "Failed to upload thumbnail" 
        }
      }
      
      thumbnailUrl = uploadResult.url || ""
    }

    // Parse content as JSON (same as updatePost)
    const contentJson = JSON.parse(content) as Prisma.InputJsonValue

    // Process tags
    const tagNames = tags.split(',').map(t => t.trim()).filter(Boolean);
    const tagConnections = [];

    for (const tagName of tagNames) {
      // Determine tag type based on tag name
      const tagType = tagName.toLowerCase() === 'pengumuman' ? 'ANNOUNCEMENT' : 'CATEGORY';
      
      // Find or create tag with appropriate type
      const tag = await prisma.tag.upsert({
        where: { name: tagName },
        update: {
          type: tagType, // Update type if tag exists
        },
        create: {
          name: tagName,
          slug: tagName.toLowerCase().replace(/\s+/g, '-'),
          type: tagType,
        },
      });

      tagConnections.push({
        tagId: tag.id,
      });
    }

    // Create post with tags
    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content: contentJson, // Use parsed content instead of raw string
        thumbnail: thumbnailUrl,
        document: document || null,
        published,
        authorId,
        tags: {
          create: tagConnections,
        },
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    })

    // Revalidate pages
    revalidatePath("/admin/posts")
    revalidatePath("/posts")
    if (published) {
      revalidatePath(`/posts/${slug}`)
    }

    return { 
      success: true, 
      post,
      message: published ? "Post published successfully" : "Draft saved successfully"
    }
  } catch (error) {
    console.error("Create post error:", error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to create post" 
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
    const thumbnailFile = formData.get("thumbnail") as File | null
    const existingThumbnail = formData.get("existingThumbnail") as string

    // Get existing post
    const existingPost = await prisma.post.findUnique({
      where: { id: BigInt(postId) }
    })

    if (!existingPost) {
      return { 
        success: false, 
        error: "Post not found" 
      }
    }

    // Check if slug is taken by another post
    if (slug !== existingPost.slug) {
      const slugExists = await prisma.post.findFirst({
        where: {
          slug,
          NOT: { id: BigInt(postId) }
        }
      })

      if (slugExists) {
        return { 
          success: false, 
          error: "Slug already exists" 
        }
      }
    }

    // Handle thumbnail upload
    let thumbnailUrl = existingThumbnail || existingPost.thumbnail

    if (thumbnailFile && thumbnailFile.size > 0) {
      // Delete old thumbnail from Assets if exists
      if (existingPost.thumbnail) {
        await deleteFileFromAssets(existingPost.thumbnail)
      }

      // Upload new thumbnail
      const uploadResult = await uploadImageToAssets(thumbnailFile, "posts")
      
      if (!uploadResult.success) {
        return { 
          success: false, 
          error: uploadResult.error || "Failed to upload thumbnail" 
        }
      }
      
      thumbnailUrl = uploadResult.url || ""
    }

    // Parse content as JSON
    const contentJson = JSON.parse(content) as Prisma.InputJsonValue

    // Parse tags
    const tagsArray = tags ? tags.split(",").map(t => t.trim()) : []

    // Update post
    const post = await prisma.post.update({
      where: { id: BigInt(postId) },
      data: {
        title,
        slug,
        content: contentJson,
        thumbnail: thumbnailUrl,
        document: document || null,
        tags: {
          deleteMany: {},
          create: tagsArray.map(tag => ({ 
            tag: { 
              connectOrCreate: { 
                where: { name: tag }, 
                create: { 
                  name: tag,
                  slug: tag.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '')
                } 
              } 
            } 
          }))
        },
        published,
        createdAt: published && !existingPost.published ? new Date() : existingPost.createdAt,
        updatedAt: new Date(),
      }
    })

    // Revalidate pages
    revalidatePath("/admin/posts")
    revalidatePath("/posts")
    revalidatePath(`/posts/${existingPost.slug}`)
    if (slug !== existingPost.slug) {
      revalidatePath(`/posts/${slug}`)
    }

    return { 
      success: true, 
      post,
      message: "Post updated successfully"
    }
  } catch (error) {
    console.error("Update post error:", error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to update post" 
    }
  }
}

// Delete post
export async function deletePost(postId: string) {
  try {
    // Get post to delete thumbnail from Assets
    const post = await prisma.post.findUnique({
      where: { id: BigInt(postId) }
    })

    if (!post) {
      return { 
        success: false, 
        error: "Post not found" 
      }
    }

    // Delete thumbnail from Assets if exists
    if (post.thumbnail) {
      await deleteFileFromAssets(post.thumbnail)
    }

    // Delete post from database
    await prisma.post.delete({
      where: { id: BigInt(postId) }
    })

    // Revalidate pages
    revalidatePath("/admin/posts")
    revalidatePath("/posts")
    if (post.slug) {
      revalidatePath(`/posts/${post.slug}`)
    }

    return { 
      success: true,
      message: "Post deleted successfully"
    }
  } catch (error) {
    console.error("Delete post error:", error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to delete post" 
    }
  }
}

// Get single post
export async function getPost(postId: string) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: BigInt(postId) }
    })

    if (!post) {
      return { 
        success: false, 
        error: "Post not found" 
      }
    }

    return { 
      success: true, 
      post 
    }
  } catch (error) {
    console.error("Get post error:", error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to fetch post" 
    }
  }
}

// Helper function to validate UUID
function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return uuidRegex.test(uuid)
}