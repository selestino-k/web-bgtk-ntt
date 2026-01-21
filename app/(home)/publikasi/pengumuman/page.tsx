import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import Link from "next/link";
import { TagType } from "@/lib/generated/prisma/client";
import PengumumanListWithPagination from "@/components/pengumuman-card";

export const metadata: Metadata = {
    title: "Pengumuman",
    description: "Halaman Pengumuman",
};

async function fetchNews(page = 1, limit = 10, tagId?: number) {
    const where = tagId 
        ? {
            published: true,
            tags: {
                some: {
                    tagId: tagId,
                    tag: {
                        type: TagType.ANNOUNCEMENT,
                    },
                },
            },
        }
        : {
            published: true,
            tags: {
                some: {
                    tag: {
                        type: TagType.ANNOUNCEMENT,
                    },
                },
            },
        };

    return await prisma.post.findMany({
        where,
        orderBy: {
            createdAt: 'desc',
        },
        skip: (page - 1) * limit,
        take: limit,
        include: {
            tags: {
                include: {
                    tag: true,
                },
            },
            author: {
                select: {
                    name: true,
                },
            },
        },
    });
}

async function getTotalPosts(tagId?: number) {
    const where = tagId 
        ? {
            published: true,
            tags: {
                some: {
                    tagId: tagId,
                    tag: {
                        type: TagType.ANNOUNCEMENT,
                    },
                },
            },
        }
        : {
            published: true,
            tags: {
                some: {
                    tag: {
                        type: TagType.ANNOUNCEMENT,
                    },
                },
            },
        };

    return await prisma.post.count({ where });
}

export default async function Pengumuman({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; tag?: string }>;
}) {
    const params = await searchParams;
    const page = parseInt(params.page || '1');
    const tagId = params.tag ? parseInt(params.tag) : undefined;
    
    const [news, totalPosts] = await Promise.all([
        fetchNews(page, 10, tagId),
        getTotalPosts(tagId),
    ]);

    const totalPages = Math.ceil(totalPosts / 10);

    // Convert bigint to string for serialization
    const serializedNews = news.map((post) => ({
        id: post.id.toString(),
        title: post.title,
        slug: post.slug,
        thumbnail: post.thumbnail,
        content: post.content,
        createdAt: post.createdAt,
        author: {
            name: post.author.name,
        },
        tags: post.tags.map((pt) => ({
            tag: {
                id: pt.tag.id,
                name: pt.tag.name,
            },
        })),
    }));

    return (
        <div id="pengumuman" className="mt-20 flex place-items-start w-full px-10">
            <main className="relative z-10 gap-20 p-8 w-full">
                <div className="text-left w-full">
                    <h2 className="text-2xl md:text-5xl font-semibold sm:tracking-tight mb-1 md:mb-5 font-geist text-primary">
                        Pengumuman
                    </h2>
                    
                    {serializedNews.length === 0 ? (
                        <div className="text-center py-10">
                            <p className="text-gray-500">Tidak ada pengumuman yang ditemukan.</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4 w-full">
                           <PengumumanListWithPagination key={page} pengumuman={serializedNews} itemsPerPage={10} />
                           
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center gap-2 mt-8">
                            {page > 1 && (
                                <Link 
                                    href={`/publikasi/pengumuman?page=${page - 1}${tagId ? `&tag=${tagId}` : ''}`}
                                >
                                    <Button variant="outline" size="sm">
                                        Previous
                                    </Button>
                                </Link>
                            )}
                            
                            <div className="flex items-center gap-2">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                                    <Link 
                                        key={pageNum}
                                        href={`/publikasi/pengumuman?page=${pageNum}${tagId ? `&tag=${tagId}` : ''}`}
                                    >
                                        <Button 
                                            variant={page === pageNum ? "default" : "outline"} 
                                            size="sm"
                                        >
                                            {pageNum}
                                        </Button>
                                    </Link>
                                ))}
                            </div>

                            {page < totalPages && (
                                <Link 
                                    href={`/publikasi/pengumuman?page=${page + 1}${tagId ? `&tag=${tagId}` : ''}`}
                                >
                                    <Button variant="outline" size="sm">
                                        Next
                                    </Button>
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}