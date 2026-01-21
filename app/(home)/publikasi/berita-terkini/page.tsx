import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import Link from "next/link";
import { TagType } from "@/lib/generated/prisma/client";
import NewsListWithPagination from "@/components/news-card";

export const metadata: Metadata = {
    title: "Berita Terkini",
    description: "Halaman Berita Terkini",
};

async function fetchNews(page = 1, limit = 10, tagId?: number) {
    const where = tagId 
        ? {
            published: true,
            tags: {
                some: {
                    tagId: tagId,
                },
            },
        }
        : { published: true };

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

async function fetchTags() {
    return await prisma.tag.findMany({
        where: {
            type: TagType.CATEGORY,
        },
        orderBy: {
            name: 'asc',
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
                },
            },
        }
        : { published: true };

    return await prisma.post.count({ where });
}

export default async function BeritaTerkini({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; tag?: string }>;
}) {
    const params = await searchParams;
    const page = parseInt(params.page || '1');
    const tagId = params.tag ? parseInt(params.tag) : undefined;
    
    const [news, tags, totalPosts] = await Promise.all([
        fetchNews(page, 10, tagId),
        fetchTags(),
        getTotalPosts(tagId),
    ]);

    const totalPages = Math.ceil(totalPosts / 10);

    // Convert bigint to string for serialization
    const serializedNews = news.map(post => ({
        ...post,
        id: post.id.toString(),
        tags: post.tags.map(tagRelation => ({
            ...tagRelation,
            postId: tagRelation.postId.toString(),
            tag: tagRelation.tag,
        })),
    }));

    return (
        <div id="berita-terkini" className="mt-20 flex place-items-start w-full px-10">
            <main className="relative z-10 gap-20 p-8 md:flex w-full block">
                <div className="mb-5 md:w-1/6">
                    <h2 className="text-md md:text-xl font-semibold sm:tracking-tight mb-1 md:mb-5 font-geist text-primary">
                        Tag Berita
                    </h2>
                    <div className="md:flex md:flex-col md:gap-2 inline-grid grid-cols-2 gap-5 w-full">
                        <Link href="/publikasi/berita-terkini">
                            <Button 
                                variant={!tagId ? "default" : "outline"} 
                                size="sm"
                                className="w-full rounded-full font-montserrat font-semibold"
                            >
                                Semua
                            </Button>
                        </Link>
                        {tags.map((tag) => (
                            <Link 
                                key={tag.id} 
                                href={`/publikasi/berita-terkini?tag=${tag.id}`}
                            >
                                <Button 
                                    variant={tagId === tag.id ? "default" : "outline"} 
                                    size="sm"
                                    className="w-full rounded-full font-montserrat font-semibold"
                                >
                                    {tag.name}
                                </Button>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="text-left md:w-5/6">
                    <h2 className="text-2xl md:text-5xl font-semibold sm:tracking-tight mb-1 md:mb-5 font-geist text-primary">
                        Berita Terkini
                    </h2>
                    
                    {serializedNews.length === 0 ? (
                        <div className="text-center py-10">
                            <p className="text-gray-500">Tidak ada berita yang ditemukan.</p>
                        </div>
                    ) : (
                        <div className="flex flex-wrap gap-6 w-full ">
                            <NewsListWithPagination key={page} news={serializedNews} itemsPerPage={10} />
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center gap-2 mt-8">
                            {page > 1 && (
                                <Link 
                                    href={`/publikasi/berita-terkini?page=${page - 1}${tagId ? `&tag=${tagId}` : ''}`}
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
                                        href={`/publikasi/berita-terkini?page=${pageNum}${tagId ? `&tag=${tagId}` : ''}`}
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
                                    href={`/publikasi/berita-terkini?page=${page + 1}${tagId ? `&tag=${tagId}` : ''}`}
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