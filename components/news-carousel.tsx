/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import Image from "next/image"
import { User, Calendar } from "lucide-react"
import { motion } from "framer-motion"
import { Badge } from "./ui/badge"
import Link from "next/link"
import { useEffect, useState } from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Prisma } from "@/lib/generated/prisma/browser"

type NewsPost = {
  id: string;
  title: string;
  slug: string;
  content : Prisma.JsonValue;
  thumbnail: string | null;
  createdAt: Date;
  author?: {
    name: string;
  };
  tags: Array<{
    tag: {
      id: number;
      name: string;
    };
  }>;
};

interface NewsCarouselProps {
  initialPosts?: NewsPost[];
}

function extractTextFromContent(content: Prisma.JsonValue): string {
  if (!content) return "No content"
  
  try {
    let contentObj: any
    
    if (typeof content === 'string') {
      contentObj = JSON.parse(content)
    } else {
      contentObj = content
    }
    
    if (!contentObj.content || !Array.isArray(contentObj.content)) {
      return "No content"
    }
    
    const extractText = (node: any): string => {
      if (node.type === 'text' && node.text) {
        return node.text
      }
      
      if (node.content && Array.isArray(node.content)) {
        return node.content.map(extractText).join(' ')
      }
      
      return ''
    }
    
    const fullText = contentObj.content.map(extractText).join(' ').trim()

    return fullText || "No content"
  } catch (error) {
    console.error('Error extracting text:', error)
    return "Error reading content"
  }
}

export default function NewsCarousel({ initialPosts = [] }: NewsCarouselProps) {
  const [news, setNews] = useState<NewsPost[]>(initialPosts);
  const [isLoading, setIsLoading] = useState(initialPosts.length === 0);

  useEffect(() => {
    if (initialPosts.length === 0) {
      async function fetchNews() {
        try {
          const response = await fetch('/api/posts/latest');
          if (response.ok) {
            const data = await response.json();
            setNews(data);
          }
        } catch (error) {
          console.error('Error fetching news:', error);
        } finally {
          setIsLoading(false);
        }
      }

      fetchNews();
    }
  }, [initialPosts.length]);

  if (isLoading) {
    return (
      <Carousel 
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card className="shadow-lg border border-primary/30">
                  <CardContent className="p-0 h-full min-h-[400px]">
                    <div className="relative w-full h-48 bg-gray-200 animate-pulse rounded-t-lg" />
                    <div className="flex flex-col w-full p-4 space-y-3 animate-pulse">
                      <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-300 rounded w-full"></div>
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-300 rounded w-1/4"></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    );
  }

  if (news.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Tidak ada berita tersedia.</p>
      </div>
    );
  }

  return (
    <Carousel
      className="max-w-7xl mx-auto"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {news.map((post) => {
          const formattedDate = new Date(post.createdAt).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });

          return (
            <CarouselItem key={post.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <div className="p-1 h-full">
                <Link href={`/publikasi/berita-terkini/detail/${post.slug}`} className="block h-full">
                  <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border border-primary/30 cursor-pointer h-full">
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="h-full"
                    >
                      <CardContent className="flex flex-col p-0 h-full">
                        {post.thumbnail ? (
                          <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                            <Image
                              src={post.thumbnail}
                              alt={post.title}
                              width={1024}
                              height={576}
                              className=" aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                              
                            />
                          </div>
                        ) : (
                          <div className="relative w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
                            <Image
                            src="/images/placeholder.svg"
                            alt="No Image"
                            fill
                            className="object-cover"
                            />
                            <span className="text-gray-400">No Image</span>
                          </div>
                        )}
                        
                        <div className="flex flex-col flex-1 p-4">
                          <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-3">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              <span className="truncate">{post.author?.name || "Admin"}</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span className="whitespace-nowrap">{formattedDate}</span>
                            </span>
                          </div>

                          <h3 className="text-base font-montserrat font-bold mb-3 line-clamp-2 min-h-[3rem] hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-sm text-gray-600 flex-1 font-inter mb-4 line-clamp-3">
                            {extractTextFromContent(post.content)}...
                          </p>
                          
                          <div className="flex flex-wrap gap-1 mt-auto">
                            {post.tags.slice(0, 2).map((tagRelation) => (
                              <Badge key={tagRelation.tag.id} variant="secondary" className="text-xs">
                                {tagRelation.tag.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </motion.div>
                  </Card>
                </Link>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>

      <CarouselPrevious className="left-0" />
      <CarouselNext className="right-0" />
    </Carousel>
  );
}
