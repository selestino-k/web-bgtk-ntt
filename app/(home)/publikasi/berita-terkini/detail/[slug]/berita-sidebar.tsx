import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";

async function getRecentPosts(currentSlug: string, limit = 5) {
  return await prisma.post.findMany({
    where: {
      published: true,
      slug: {
        not: currentSlug, // Exclude current post
      },
      tags: {
        some: {
          tag: {
            type: "CATEGORY", // Exclude announcements
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
    select: {
      id: true,
      title: true,
      slug: true,
      thumbnail: true,
      createdAt: true,
    },
  });
}

export default async function BeritaSidebar({ currentSlug }: { currentSlug: string }) {
  const recentPosts = await getRecentPosts(currentSlug);

  if (recentPosts.length === 0) {
    return null;
  }

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold font-montserrat text-primary">
          Berita Terbaru
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentPosts.map((post) => {
          const formattedDate = new Date(post.createdAt).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
          });

          return (
            <Link
              key={post.id.toString()}
              href={`/publikasi/berita-terkini/detail/${post.slug}`}
              className="block group"
            >
              <div className="flex gap-3 hover:bg-accent/50 p-2 rounded-lg transition-colors">
                {post.thumbnail ? (
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
                    <Image
                      src={post.thumbnail}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 flex-shrink-0 rounded-md bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-xs">No Image</span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors mb-1">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formattedDate}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}