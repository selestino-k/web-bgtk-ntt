import { Button } from "@/components/ui/button";
import { db } from "@/lib/db/db";
import { post, tag, postTag } from "@/lib/db/schema";
import { Metadata } from "next";
import Link from "next/link";
import { eq, desc, and, inArray, sql } from "drizzle-orm";
import PengumumanListWithPagination from "@/components/pengumuman-card";

export const metadata: Metadata = {
    title: "Pengumuman",
    description: "Halaman Pengumuman",
};
export const dynamic = 'force-dynamic';

async function getAnnouncementPostIds(tagId?: number) {
    // Get post IDs that have at least one ANNOUNCEMENT tag
    const rows = tagId
        ? await db
            .selectDistinct({ postId: postTag.postId })
            .from(postTag)
            .innerJoin(tag, eq(postTag.tagId, tag.id))
            .where(and(
                eq(postTag.tagId, tagId),
                eq(tag.type, 'ANNOUNCEMENT')
            ))
        : await db
            .selectDistinct({ postId: postTag.postId })
            .from(postTag)
            .innerJoin(tag, eq(postTag.tagId, tag.id))
            .where(eq(tag.type, 'ANNOUNCEMENT'));

    return rows.map(r => r.postId);
}

async function fetchNews(page = 1, limit = 10, tagId?: number) {
    const announcementPostIds = await getAnnouncementPostIds(tagId);

    if (announcementPostIds.length === 0) return [];

    return await db.query.post.findMany({
        where: (p, { eq: eqFn, and: andFn, inArray: inArrayFn }) =>
            andFn(eqFn(p.published, true), inArrayFn(p.id, announcementPostIds)),
        orderBy: (p) => [desc(p.createdAt)],
        offset: (page - 1) * limit,
        limit,
        with: {
            author: {
                columns: { name: true },
            },
            tags: {
                with: {
                    tag: {
                        columns: { id: true, name: true },
                    },
                },
                columns: {
                    postId: true,
                    tagId: true,
                },
            },
        },
        columns: {
            id: true,
            title: true,
            slug: true,
            thumbnail: true,
            content: true,
            createdAt: true,
        },
    });
}

async function getTotalPosts(tagId?: number) {
    const announcementPostIds = await getAnnouncementPostIds(tagId);

    if (announcementPostIds.length === 0) return 0;

    const result = await db
        .select({ count: sql<number>`cast(count(*) as int)` })
        .from(post)
        .where(and(
            eq(post.published, true),
            inArray(post.id, announcementPostIds)
        ));

    return result[0]?.count ?? 0;
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

    const serializedNews = news.map((p) => ({
        id: p.id.toString(),
        title: p.title,
        slug: p.slug,
        thumbnail: p.thumbnail,
        content: p.content,
        createdAt: p.createdAt,
        author: {
            name: p.author?.name ?? 'Admin',
        },
        tags: p.tags.map((pt) => ({
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
                    <h2 className="text-2xl md:text-5xl font-bold sm:tracking-tight mb-1 md:mb-5 font-montserrat text-primary">
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
                                <Link href={`/publikasi/pengumuman?page=${page - 1}${tagId ? `&tag=${tagId}` : ''}`}>
                                    <Button variant="outline" size="sm">Previous</Button>
                                </Link>
                            )}

                            <div className="flex items-center gap-2">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                                    <Link
                                        key={pageNum}
                                        href={`/publikasi/pengumuman?page=${pageNum}${tagId ? `&tag=${tagId}` : ''}`}
                                    >
                                        <Button variant={page === pageNum ? "default" : "outline"} size="sm">
                                            {pageNum}
                                        </Button>
                                    </Link>
                                ))}
                            </div>

                            {page < totalPages && (
                                <Link href={`/publikasi/pengumuman?page=${page + 1}${tagId ? `&tag=${tagId}` : ''}`}>
                                    <Button variant="outline" size="sm">Next</Button>
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}