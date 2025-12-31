"use client"
import { Card } from "./ui/card";
import Image from "next/image";
import { User, Calendar } from "lucide-react";
import { Badge } from "./ui/badge";
import Link from "next/link";

interface NewsCardProps {
    id: string;
    title: string;
    slug: string;
    thumbnail: string | null;
    excerpt: string;
    createdAt: Date;
    author: string;
    tags: Array<{
        id: number;
        name: string;
        slug: string;
    }>;
}

export default function NewsCard({
  id,
  title,
  slug,
  thumbnail,
  excerpt,
  createdAt,
  author,
  tags,
}: NewsCardProps) {
  const formattedDate = new Date(createdAt).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Link href={`/publikasi/berita-terkini/detail/${slug}`} className="w-full">
      <div className="group border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full flex flex-col w-full">
        {thumbnail && (
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-4 w-full flex-1 flex flex-col">
          <div className="flex flex-wrap gap-1 mb-2">
            {tags.slice(0, 2).map((tag) => (
              <Badge key={tag.id} variant="secondary" className="text-xs">
                {tag.name}
              </Badge>
            ))}
          </div>
          <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">
            {excerpt}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formattedDate}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}