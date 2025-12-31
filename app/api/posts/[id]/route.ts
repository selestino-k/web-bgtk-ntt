import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";


// GET single post
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const post = await prisma.post.findUnique({
      where: {
        id: BigInt(id),
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({
      ...post,
      id: post.id.toString(),
    });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

// PUT update post
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
   
    const { id } = await params;
    const body = await request.json();
    const { title, content, thumbnail, published, tagIds } = body;

    // Validate required fields
    if (!title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    // Update post
    const updatedPost = await prisma.post.update({
      where: {
        id: BigInt(id),
      },
      data: {
        title,
        content: content || null,
        thumbnail: thumbnail || null,
        published: published ?? false,
        updatedAt: new Date(),
      },
    });

    // Update tags if provided
    if (tagIds && Array.isArray(tagIds)) {
      // First, delete existing tag relations
      await prisma.postTag.deleteMany({
        where: {
          postId: BigInt(id),
        },
      });

      // Then, create new tag relations
      if (tagIds.length > 0) {
        await prisma.postTag.createMany({
          data: tagIds.map((tagId: number) => ({
            postId: BigInt(id),
            tagId: Number(tagId),
          })),
        });
      }
    }

    return NextResponse.json({
      message: "Post updated successfully",
      post: {
        ...updatedPost,
        id: updatedPost.id.toString(),
      },
    });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { error: "Failed to update post", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// DELETE post
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {

   
    const { id } = await params;

    // Delete associated tags first
    await prisma.postTag.deleteMany({
      where: {
        postId: BigInt(id),
      },
    });

    // Delete the post
    await prisma.post.delete({
      where: {
        id: BigInt(id),
      },
    });

    return NextResponse.json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}