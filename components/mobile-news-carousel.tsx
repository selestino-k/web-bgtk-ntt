"use client"
import Image from "next/image"
import Link from "next/link"
import { User, Calendar } from "lucide-react"
import { motion } from "framer-motion"
import { Badge } from "./ui/badge"
import { useEffect, useState } from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

type NewsPost = {
  id: string;
  title: string;
  slug: string;
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

interface MobileNewsCarouselProps {
  initialPosts?: NewsPost[];
}

export default function MobileNewsCarousel({ initialPosts = [] }: MobileNewsCarouselProps) {
  const [news, setNews] = useState<NewsPost[]>(initialPosts);
  const [isLoading, setIsLoading] = useState(initialPosts.length === 0);

  useEffect(() => {
    // Only fetch if no initial posts were provided
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
      <Carousel className="w-full mt-5 mx-auto">
        <CarouselContent className="flex">
          {Array.from({ length: 3 }).map((_, index) => (
            <CarouselItem key={index} className="basis-full md:basis-1/2 lg:basis-1/4 mb-4">
              <div className="p-1">
                <Card className="shadow-lg border border-primary/30 dark:border-gray-700">
                  <CardContent className="flex aspect-square flex-col p-0 rounded-lg backdrop-blur-sm text-start font-geist">
                    <div className="flex flex-col w-full p-4 animate-pulse">
                      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                      <div className="h-20 bg-gray-300 rounded mb-2"></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
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
    <Carousel className="w-full mt-5 mx-auto">
      <CarouselContent className="flex">
        {news.map((post) => {
          const formattedDate = new Date(post.createdAt).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });

          return (
            <CarouselItem key={post.id} className="basis-full md:basis-1/2 lg:basis-1/4 mb-4">
              <div className="p-1">
                <Link href={`/publikasi/berita-terkini/detail/${post.slug}`}>
                  <Card className="shadow-lg hover:shadow-xl/20 transition-shadow duration-300 border border-primary/30 dark:border-gray-700 cursor-pointer">
                    <motion.div
                      whileHover={{ y: -10 }}
                      className="h-full"
                    >
                      <CardContent className="flex aspect-square flex-col p-0 rounded-lg backdrop-blur-sm text-start font-geist">
                        <div className="flex flex-col w-full p-4">
                          <div className="flex space-x-2 text-xs text-gray-500 mb-2">
                            <span className="flex items-center space-x-1">
                              <User className="h-4 w-4 mr-1"/>
                              <span>{post.author?.name || "Admin"}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4 mr-1"/>
                              <span>{formattedDate}</span>
                            </span>
                          </div>
                          
                          <h3 className="text-lg font-bold mb-1 line-clamp-2 hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                          
                          <div className="flex flex-wrap gap-1 mb-2">
                            {post.tags.slice(0, 2).map((tagRelation) => (
                              <Badge key={tagRelation.tag.id} className="self-start">
                                {tagRelation.tag.name}
                              </Badge>
                            ))}
                          </div>

                          <p className="mt-2 text-xs text-gray-600 flex-grow mb-10 line-clamp-3">
                            {post.title}
                          </p>
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
         
      <CarouselPrevious/>
      <CarouselNext />
    </Carousel>
  );
}
