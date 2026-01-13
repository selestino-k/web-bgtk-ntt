import { User, Calendar, Download, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Prisma } from "@/lib/generated/prisma/client";
import { JSX } from "react";
import Link from "next/link";
import Image from "next/image";
import BeritaSidebar from "./berita-sidebar";
import ImagePreviewDialog from "./image-preview-dialog";

// TipTap JSON structure types
type TipTapMark = {
  type: string
  attrs?: Record<string, unknown>
}

type TipTapNode = {
  type: string
  attrs?: Record<string, unknown>
  content?: TipTapNode[]
  marks?: TipTapMark[]
  text?: string
}

type TipTapContent = {
  type: "doc"
  content: TipTapNode[]
}

async function getPostBySlug(slug: string) {
  try {
    const post = await prisma.post.findFirst({
      where: {
        slug: slug,
        published: true,
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
      return null;
    }

    return {
      ...post,
      id: post.id.toString(),
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

// Helper function to render TipTap JSON as HTML
function renderTipTapContent(content: Prisma.JsonValue): JSX.Element {
  console.log('Rendering content:', JSON.stringify(content, null, 2))
  
  if (!content || typeof content !== 'object') {
    console.log('Content is null or not an object')
    return <p className="text-gray-400">No content</p>
  }
  
  try {
    const contentObj = content as TipTapContent
    console.log('Content object:', contentObj)
    console.log('Content type:', contentObj.type)
    console.log('Content nodes:', contentObj.content)
    
    if (!contentObj.content || !Array.isArray(contentObj.content)) {
      console.log('Content.content is not an array')
      return <p className="text-gray-400">No content</p>
    }
    
    const applyMarks = (text: string, marks?: TipTapMark[]): JSX.Element => {
      if (!marks || marks.length === 0) {
        return <span>{text}</span>
      }

      let styledText = text
      let className = ""
      const style: React.CSSProperties = {}

      marks.forEach(mark => {
        switch (mark.type) {
          case "bold":
            styledText = `<strong>${styledText}</strong>`
            break
          case "italic":
            styledText = `<em>${styledText}</em>`
            break
          case "underline":
            styledText = `<u>${styledText}</u>`
            break
          case "strike":
            styledText = `<s>${styledText}</s>`
            break
          case "code":
            className += " bg-gray-100 px-1 py-0.5 rounded font-mono text-sm"
            break
          case "highlight":
            if (mark.attrs?.color) {
              style.backgroundColor = mark.attrs.color as string
            }
            break
          case "textStyle":
            if (mark.attrs?.color) {
              style.color = mark.attrs.color as string
            }
            break
          case "link":
            return (
              <a 
                href={mark.attrs?.href as string || "#"} 
                className="text-blue-600 hover:underline"
                target={mark.attrs?.target as string || "_blank"}
                rel="noopener noreferrer"
              >
                {text}
              </a>
            )
          case "subscript":
            styledText = `<sub>${styledText}</sub>`
            break
          case "superscript":
            styledText = `<sup>${styledText}</sup>`
            break
        }
      })

      return (
        <span 
          className={className} 
          style={style}
          dangerouslySetInnerHTML={{ __html: styledText }} 
        />
      )
    }
    
    const renderNode = (node: TipTapNode, index: number): JSX.Element | null => {
      if (!node) return null
      
      // Text node
      if (node.type === "text" && node.text) {
        return <span key={index}>{applyMarks(node.text, node.marks)}</span>
      }
      
      // Paragraph node
      if (node.type === "paragraph") {
        const textAlign = node.attrs?.textAlign as React.CSSProperties['textAlign'] | undefined
        return (
          <p 
            key={index} 
            className="mb-4 leading-relaxed text-md md:text-base font-inter text-justify"
            style={{ textAlign: textAlign || "left" }}
          >
            {node.content?.map((child, i) => renderNode(child, i))}
          </p>
        )
      }
      
      // Heading nodes
      if (node.type === "heading") {
        const level = (node.attrs?.level as number) || 2
        const textAlign = node.attrs?.textAlign as React.CSSProperties['textAlign'] | undefined
        const HeadingTag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
        const headingClasses = {
          h1: "text-3xl font-bold mb-4 mt-6",
          h2: "text-2xl font-bold mb-3 mt-5",
          h3: "text-xl font-bold mb-2 mt-4",
          h4: "text-lg font-bold mb-2 mt-3",
          h5: "text-base font-bold mb-2 mt-2",
          h6: "text-sm font-bold mb-2 mt-2",
        }
        
        return (
          <HeadingTag 
            key={index} 
            className={headingClasses[HeadingTag] || ""}
            style={{ textAlign: textAlign || "left" }}
          >
            {node.content?.map((child, i) => renderNode(child, i))}
          </HeadingTag>
        )
      }
      
      // Bullet list
      if (node.type === "bulletList") {
        return (
          <ul key={index} className="list-disc ml-6 mb-4">
            {node.content?.map((child, i) => renderNode(child, i))}
          </ul>
        )
      }
      
      // Ordered list
      if (node.type === "orderedList") {
        return (
          <ol key={index} className="list-decimal ml-6 mb-4">
            {node.content?.map((child, i) => renderNode(child, i))}
          </ol>
        )
      }
      
      // List item
      if (node.type === "listItem") {
        return (
          <li key={index} className="mb-1">
            {node.content?.map((child, i) => renderNode(child, i))}
          </li>
        )
      }
      
      // Task list
      if (node.type === "taskList") {
        return (
          <ul key={index} className="space-y-2 mb-4">
            {node.content?.map((child, i) => renderNode(child, i))}
          </ul>
        )
      }
      
      // Task item
      if (node.type === "taskItem") {
        const checked = node.attrs?.checked as boolean || false
        return (
          <li key={index} className="flex items-start gap-2">
            <input 
              type="checkbox" 
              checked={checked} 
              disabled 
              className="mt-1"
            />
            <div className="flex-1">
              {node.content?.map((child, i) => renderNode(child, i))}
            </div>
          </li>
        )
      }
      
      // Blockquote
      if (node.type === "blockquote") {
        return (
          <blockquote key={index} className="border-l-4 border-gray-300 pl-4 italic my-4 text-gray-700">
            {node.content?.map((child, i) => renderNode(child, i))}
          </blockquote>
        )
      }
      
      // Code block
      if (node.type === "codeBlock") {
        const language = node.attrs?.language as string | undefined
        return (
          <pre key={index} className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-4">
            <code className={language ? `language-${language}` : ""}>
              {node.content?.map((child, i) => 
                child.type === "text" ? child.text : ""
              ).join("")}
            </code>
          </pre>
        )
      }
      
      // Hard break
      if (node.type === "hardBreak") {
        return <br key={index} />
      }
      
      // Horizontal rule
      if (node.type === "horizontalRule") {
        return <hr key={index} className="my-6 border-gray-300" />
      }
      
      // Image
      if (node.type === "image") {
        const src = node.attrs?.src as string
        const alt = node.attrs?.alt as string || ""
        const title = node.attrs?.title as string
        
        if (!src) return null
        
        return (
          <div key={index} className="relative w-full my-4">
            <Image 
              src={src}
              alt={alt}
              title={title}
              width={800}
              height={600}
              className="max-w-full h-auto rounded-lg"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        )
      }
      
      // Image upload node (custom)
      if (node.type === "imageUpload") {
        const src = node.attrs?.src as string
        const alt = node.attrs?.alt as string || ""
        
        if (!src) return null
        
        return (
          <div key={index} className="relative w-full my-4">
            <Image 
              src={src}
              alt={alt}
              width={800}
              height={600}
              className="max-w-full h-auto rounded-lg"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        )
      }
      
      // Fallback: log unhandled node types for debugging
      console.log('Unhandled node type:', node.type, node)
      
      return null
    }
    
    return (
      <div className="prose prose-sm max-w-none">
        {contentObj.content.map((child, index) => {
          const rendered = renderNode(child, index)
          console.log('Rendered node:', child.type, rendered)
          return rendered
        })}
      </div>
    )
  } catch (error) {
    console.error("Error rendering content:", error)
    return <p className="text-red-400">Error rendering content</p>
  }
}

export default async function BeritaTerkiniDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const getGoogleDriveDownloadUrl = (url: string | null) => {
    if (!url) return null;
    
    const driveRegex = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/;
    const match = url.match(driveRegex);
    
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=download&id=${match[1]}`;
    }
    
    return url;
  };

  const downloadUrl = getGoogleDriveDownloadUrl(post.document);

  return (
    <div id="berita-terkini-detail" className="mt-20 flex place-items-start w-full px-10">
      <main className="relative z-10 gap-8 p-8 md:flex w-full">
        <div className="text-left w-full md:w-2/3">
          <h2 className="text-2xl md:text-5xl font-semibold sm:tracking-tight mb-1 md:mb-5 font-geist text-primary">
            {post.title}
          </h2>
          <div className="mb-4 text-sm text-gray-500 flex space-x-4">
            <span className="flex items-center space-x-1">
              <User className="h-4 w-4 mr-1" />
              <span>{post.author?.name || "Admin"}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{formattedDate}</span>
            </span>
          </div>
          {post.thumbnail && (
            <ImagePreviewDialog
              src={post.thumbnail}
              alt={post.title}
              width={800}
              height={450}
            />
          )}
          
          {/* Document Attachment Section */}
          {post.document && (
            <Card className="mb-6 border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Dokumen Lampiran</p>
                      <p className="text-xs text-gray-500">File terlampir tersedia untuk diunduh</p>
                    </div>
                  </div>
                  <Button asChild size="sm" className="gap-2">
                    <Link href={downloadUrl || post.document} target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4" />
                      Unduh
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="mt-6">
            {renderTipTapContent(post.content)}
          </div>

          {/* Download Button at Bottom */}
          {post.document && (
            <div className="mt-8 flex justify-center">
              <Button asChild size="lg" className="gap-2">
                <Link href={downloadUrl || post.document} target="_blank" rel="noopener noreferrer">
                  <Download className="h-5 w-5" />
                  Unduh Dokumen Lampiran
                </Link>
              </Button>
            </div>
          )}

          {post.tags && post.tags.length > 0 && (
            <p className="text-xs md:text-sm font-inter text-justify mt-10">
              Tag:{" "}
              <span className="space-x-1">
                {post.tags.map((tagRelation) => (
                  <Badge key={tagRelation.tag.id} className="font-semibold">
                    {tagRelation.tag.name}
                  </Badge>
                ))}
              </span>
            </p>
          )}
        </div>
        
        {/* Sidebar */}
        <aside className="w-full md:w-1/3 mt-8 md:mt-0">
          <BeritaSidebar currentSlug={slug} />
        </aside>
      </main>
    </div>
  );
}

// Generate static params for static generation (optional)
export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
    select: {
      slug: true,
    },
  });

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.title,
    openGraph: {
      title: post.title,
      description: post.title,
      images: post.thumbnail ? [post.thumbnail] : [],
    },
  };
}
