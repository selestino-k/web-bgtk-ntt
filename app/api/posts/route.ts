import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// Create new post (draft or published)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, slug, content, thumbnail, tags, published, authorId } = body

    // Check if slug already exists
    const existingPost = await prisma.post.findUnique({
      where: { slug }
    })

    if (existingPost) {
      return NextResponse.json(
        { error: 'Slug already exists' },
        { status: 400 }
      )
    }

    // Create new post
    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content: JSON.stringify(content),
        thumbnail,
        tags,
        published,
        createdAt: published ? new Date() : undefined,
        authorId,
      }
    })

    return NextResponse.json({ 
      success: true, 
      post,
      message: published ? 'Post published successfully' : 'Draft saved successfully'
    })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}

// Get all posts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const published = searchParams.get('published')

    const posts = await prisma.post.findMany({
      where: published ? { published: published === 'true' } : undefined,
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ posts })
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}