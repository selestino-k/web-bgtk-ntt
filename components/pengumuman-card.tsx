"use client"
import { Card } from "./ui/card";
import Image from "next/image";
import { User, Calendar } from "lucide-react";
import { Badge } from "./ui/badge";
import Link from "next/link";

interface PengumumanCardProps {
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

export default function PengumumanCard({
  id,
  title,
  slug,
  thumbnail,
  excerpt,
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
    <Link href={`/publikasi/pengumuman/detail/${slug}`} className="w-full">
      <Card className="group border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full flex w-full">
        {thumbnail && (
          <div className="relative w-1/4 min-h-[150px] overflow-hidden">
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-4 w-3/4 flex flex-col">
          <div className="flex space-x-2 text-xs text-gray-500 mb-2">
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formattedDate}
            </span>
          </div>
          <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag.id} variant="secondary" className="text-xs">
                {tag.name}
              </Badge>
            ))}
          </div>
        </div>
      </Card>
    </Link>
  );
}