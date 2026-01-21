/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import Image from "next/image";
import { User, Calendar } from "lucide-react";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Prisma } from "@/lib/generated/prisma/browser";
import { useState } from "react";
import { Button } from "./ui/button";

interface PengumumanCardProps {
  id: string;
  title: string;
  slug: string;
  thumbnail: string | null;
  content: Prisma.JsonValue;
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
}

interface PengumumanListProps {
  pengumuman: PengumumanCardProps[];
  itemsPerPage?: number;
}

function extractTextFromContent(content: Prisma.JsonValue): string {
  if (!content) return "Tidak ada konten"
  
  try {
    let contentObj: any
    
    if (typeof content === 'string') {
      contentObj = JSON.parse(content)
    } else {
      contentObj = content
    }
    
    if (!contentObj.content || !Array.isArray(contentObj.content)) {
      return "Tidak ada konten"
    }
    
    const extractText = (node: any): string => {
      if (node.type === 'text' && node.text) {
        return node.text
      }
      
      if (node.content && Array.isArray(node.content)) {
        return node.content.map((child: any) => extractText(child)).join(' ')
      }
      
      return ''
    }
    
    const fullText = contentObj.content.map(extractText).join(' ').trim()

    // Return first 100 characters
    return fullText.substring(0, 100) || "Tidak ada konten"
  } catch {
    return "Gagal memuat konten"
  }
}

function PengumumanCard({
  title,
  slug,
  thumbnail,
  content,
  createdAt,
  author,
  tags,
}: PengumumanCardProps) {
  const formattedDate = new Date(createdAt).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Link href={`/publikasi/pengumuman/detail/${slug}`} className="block">
      <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border border-primary/30 cursor-pointer overflow-hidden">
        <motion.div
          whileHover={{ y: -5 }}
        >
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              {/* Image Section - Left */}
              {thumbnail ? (
                <div className="relative w-full md:w-80 h-48 md:h-64 flex-shrink-0">
                  <Image
                    src={thumbnail}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="relative w-full md:w-80 h-48 md:h-64 bg-gray-200 flex items-center justify-center flex-shrink-0">
                  <Image
                    src="/images/placeholder.svg"
                    alt="No Image"
                    fill
                    className="object-cover"
                  />
                  <span className="absolute text-gray-400">No Image</span>
                </div>
              )}
              
              {/* Content Section - Right */}
              <div className="flex flex-col flex-1 p-6">
                <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span className="truncate">{author?.name || "Admin"}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span className="whitespace-nowrap">{formattedDate}</span>
                  </span>
                </div>

                <h3 className="text-xl font-montserrat font-bold mb-3 line-clamp-2 hover:text-primary transition-colors">
                  {title}
                </h3>
                
                <p className="text-sm text-gray-600 font-inter mb-4 line-clamp-3 flex-1">
                  {extractTextFromContent(content)}...
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {tags.slice(0, 3).map((tagRelation) => (
                    <Badge key={tagRelation.tag.id} variant="default" className="text-xs font-montserrat font-semibold">
                      {tagRelation.tag.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </motion.div>
      </Card>
    </Link>
  );
}

export default function PengumumanListWithPagination({ pengumuman, itemsPerPage = 10 }: PengumumanListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(pengumuman.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPengumuman = pengumuman.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (pengumuman.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Tidak ada pengumuman tersedia.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Pengumuman List */}
      <div className="space-y-6">
        {currentPengumuman.map((post) => (
          <PengumumanCard key={post.id} {...post} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="font-montserrat"
          >
            Sebelumnya
          </Button>
          
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              // Show first page, last page, current page, and pages around current
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => handlePageChange(page)}
                    className="w-10 font-montserrat"
                  >
                    {page}
                  </Button>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return <span key={page} className="px-2 py-2">...</span>;
              }
              return null;
            })}
          </div>

          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="font-montserrat"
          >
            Selanjutnya
          </Button>
        </div>
      )}
    </div>
  );
}

export { PengumumanCard };