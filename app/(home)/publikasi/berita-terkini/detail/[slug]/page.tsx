import Image from "next/image";
import { User, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Prisma } from "@/lib/generated/prisma/client";
import { JSX } from "react";


type LexicalNode = {
  type?: string
  text?: string
  format?: number
  children?: LexicalNode[]
  tag?: string
  url?: string
  [key: string]: unknown
}

type LexicalContent = {
  root?: {
    children?: LexicalNode[]
    [key: string]: unknown
  }
  [key: string]: unknown
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

// Helper function to render Lexical JSON as HTML
function renderLexicalContent(content: Prisma.JsonValue): JSX.Element {
  if (!content || typeof content !== 'object') {
    return <p className="text-gray-400">No content</p>
  }
  
  try {
    const contentObj = content as LexicalContent
    if (!contentObj.root || !contentObj.root.children) {
      return <p className="text-gray-400">No content</p>
    }
    
    const renderNode = (node: LexicalNode, index: number): JSX.Element | string => {
      if (!node) return ""
      
      // Text node
      if (node.type === "text" || node.text) {
        let text = node.text || ""
        
        // Handle text formatting
        if (node.format) {
          const format = node.format as number
          if (format & 1) text = `<strong>${text}</strong>` // Bold
          if (format & 2) text = `<em>${text}</em>` // Italic
          if (format & 8) text = `<u>${text}</u>` // Underline
          if (format & 16) text = `<s>${text}</s>` // Strikethrough
        }
        
        return <span key={index} dangerouslySetInnerHTML={{ __html: text }} />
      }
      
      // Paragraph node
      if (node.type === "paragraph") {
        return (
          <p key={index} className="mb-4 leading-relaxed text-md md:text-base font-inter text-justify">
            {node.children?.map((child, i) => renderNode(child, i))}
          </p>
        )
      }
      
      // Heading nodes
      if (node.type === "heading") {
        const validTags = ["h1", "h2", "h3", "h4", "h5", "h6"] as const
        const tag = validTags.includes(node.tag as typeof validTags[number]) ? node.tag as typeof validTags[number] : "h2"
        const HeadingTag = tag as "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
        const headingClasses = {
          h1: "text-3xl font-bold mb-4 mt-6",
          h2: "text-2xl font-bold mb-3 mt-5",
          h3: "text-xl font-bold mb-2 mt-4",
          h4: "text-lg font-bold mb-2 mt-3",
          h5: "text-base font-bold mb-2 mt-2",
          h6: "text-sm font-bold mb-2 mt-2",
        }
        
        return (
          <HeadingTag key={index} className={headingClasses[HeadingTag] || ""}>
            {node.children?.map((child, i) => renderNode(child, i))}
          </HeadingTag>
        )
      }
      
      // List nodes
      if (node.type === "list") {
        const ListTag = (node.tag === "ol" ? "ol" : "ul") as "ol" | "ul"
        const listClass = ListTag === "ol" ? "list-decimal ml-6 mb-4" : "list-disc ml-6 mb-4"
        
        return (
          <ListTag key={index} className={listClass}>
            {node.children?.map((child, i) => renderNode(child, i))}
          </ListTag>
        )
      }
      
      // List item
      if (node.type === "listitem") {
        return (
          <li key={index} className="mb-1">
            {node.children?.map((child, i) => renderNode(child, i))}
          </li>
        )
      }
      
      // Quote node
      if (node.type === "quote") {
        return (
          <blockquote key={index} className="border-l-4 border-gray-300 pl-4 italic my-4 text-gray-700">
            {node.children?.map((child, i) => renderNode(child, i))}
          </blockquote>
        )
      }
      
      // Code block
      if (node.type === "code") {
        return (
          <pre key={index} className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-4">
            <code>{node.children?.map((child, i) => renderNode(child, i))}</code>
          </pre>
        )
      }
      
      // Link node
      if (node.type === "link") {
        return (
          <a 
            key={index} 
            href={(node.url as string) || "#"} 
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {node.children?.map((child, i) => renderNode(child, i))}
          </a>
        )
      }
      
      // Default: render children if available
      if (node.children && Array.isArray(node.children)) {
        return (
          <span key={index}>
            {node.children.map((child, i) => renderNode(child, i))}
          </span>
        )
      }
      
      return <span key={index}></span>
    }
    
    return (
      <div className="prose prose-sm max-w-none">
        {contentObj.root.children.map((child, index) => renderNode(child, index))}
      </div>
    )
  } catch (error) {
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

  return (
    <div id="berita-terkini-detail" className="mt-20 flex place-items-start w-full px-10">
      <main className="relative z-10 gap-20 p-8 md:flex w-full block">
        <div className="text-left w-full">
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
            <div className="relative max-w-2xl h-auto items-center mx-auto">
              <Image
                src={post.thumbnail}
                alt={post.title}
                width={800}
                height={450}
                className="rounded-lg mb-6 aspect-video object-cover w-full h-auto"
                priority
              />
            </div>
          )}
          <div className="mt-6">
            {renderLexicalContent(post.content)}
          </div>
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
