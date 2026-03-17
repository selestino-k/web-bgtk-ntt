import { Button } from "@/components/ui/button";
import { db } from "@/lib/db/db";
import { post, tag, postTag } from "@/lib/db/schema";
import { Metadata } from "next";
import Link from "next/link";
import NewsListWithPagination from "@/components/news-card";
import { Badge } from "@/components/ui/badge";
import { eq, desc, and, inArray, notInArray, sql, ne } from "drizzle-orm";

export const metadata: Metadata = {
    title: "Berita Terkini | BGTK Provinsi NTT",
    description: "Halaman Berita Terkini | BGTK Provinsi NTT",
};

export const revalidate = 60;
export const dynamic = 'force-dynamic';

async function fetchNews(page = 1, limit = 10, tagId?: number) {
    // Get post IDs that match filter criteria
    const matchingPostIds = tagId
        ? await db
            .selectDistinct({ postId: postTag.postId })
            .from(postTag)
            .innerJoin(tag, eq(postTag.tagId, tag.id))
            .where(eq(postTag.tagId, tagId))
            .then(async (rows) => {
                const ids = rows.map(r => r.postId);
                if (ids.length === 0) return [];

                // Exclude posts that have an ANNOUNCEMENT tag
                const announcementPosts = await db
                    .selectDistinct({ postId: postTag.postId })
                    .from(postTag)
                    .innerJoin(tag, eq(postTag.tagId, tag.id))
                    .where(and(
                        inArray(postTag.postId, ids),
                        eq(tag.type, 'ANNOUNCEMENT')
                    ));

                const announcementIds = announcementPosts.map(r => r.postId);
                return announcementIds.length > 0
                    ? ids.filter(id => !announcementIds.includes(id))
                    : ids;
            })
        : await db
            .selectDistinct({ postId: postTag.postId })
            .from(postTag)
            .innerJoin(tag, eq(postTag.tagId, tag.id))
            .where(eq(tag.type, 'CATEGORY'))
            .then(rows => rows.map(r => r.postId));

    if (matchingPostIds.length === 0) return [];

    const posts = await db.query.post.findMany({
        where: (p, { eq: eqFn, and: andFn, inArray: inArrayFn }) =>
            andFn(eqFn(p.published, true), inArrayFn(p.id, matchingPostIds)),
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

    return posts;
}

async function fetchTags() {
    return await db
        .select({ id: tag.id, name: tag.name })
        .from(tag)
        .where(ne(tag.type, 'ANNOUNCEMENT'))
        .orderBy(tag.name);
}

async function getTotalPosts(tagId?: number) {
    const matchingPostIds = tagId
        ? await db
            .selectDistinct({ postId: postTag.postId })
            .from(postTag)
            .innerJoin(tag, eq(postTag.tagId, tag.id))
            .where(eq(postTag.tagId, tagId))
            .then(async (rows) => {
                const ids = rows.map(r => r.postId);
                if (ids.length === 0) return [];

                const announcementPosts = await db
                    .selectDistinct({ postId: postTag.postId })
                    .from(postTag)
                    .innerJoin(tag, eq(postTag.tagId, tag.id))
                    .where(and(
                        inArray(postTag.postId, ids),
                        eq(tag.type, 'ANNOUNCEMENT')
                    ));

                const announcementIds = announcementPosts.map(r => r.postId);
                return announcementIds.length > 0
                    ? ids.filter(id => !announcementIds.includes(id))
                    : ids;
            })
        : await db
            .selectDistinct({ postId: postTag.postId })
            .from(postTag)
            .innerJoin(tag, eq(postTag.tagId, tag.id))
            .where(eq(tag.type, 'CATEGORY'))
            .then(rows => rows.map(r => r.postId));

    if (matchingPostIds.length === 0) return 0;

    const result = await db
        .select({ count: sql<number>`cast(count(*) as int)` })
        .from(post)
        .where(and(
            eq(post.published, true),
            inArray(post.id, matchingPostIds)
        ));

    return result[0]?.count ?? 0;
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

    const serializedNews = news.map(p => ({
        ...p,
        id: p.id.toString(),
        tags: p.tags.map(tagRelation => ({
            ...tagRelation,
            postId: tagRelation.postId.toString(),
            tag: tagRelation.tag,
        })),
    }));

    return (
        <div id="berita-terkini" className="mt-20 flex place-items-start w-full px-10">
            <main className="relative z-10 gap-20 p-8 md:flex w-full block">
                <div className="text-left md:w-5/6 md:pl-5">
                    <h2 className="text-3xl md:text-5xl font-bold sm:tracking-tight mb-10 md:mb-5 font-montserrat text-primary">
                        Berita Terkini
                    </h2>

                    {serializedNews.length === 0 ? (
                        <div className="text-center py-10">
                            <p className="text-gray-500">Tidak ada berita yang ditemukan.</p>
                        </div>
                    ) : (
                        <div className="flex flex-wrap gap-6 w-full">
                            <NewsListWithPagination key={page} news={serializedNews} itemsPerPage={10} />
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center gap-2 mt-8">
                            {page > 1 && (
                                <Link href={`/publikasi/berita-terkini?page=${page - 1}${tagId ? `&tag=${tagId}` : ''}`}>
                                    <Button variant="outline" size="sm">Previous</Button>
                                </Link>
                            )}

                            <div className="flex items-center gap-2">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                                    <Link
                                        key={pageNum}
                                        href={`/publikasi/berita-terkini?page=${pageNum}${tagId ? `&tag=${tagId}` : ''}`}
                                    >
                                        <Button variant={page === pageNum ? "default" : "outline"} size="sm">
                                            {pageNum}
                                        </Button>
                                    </Link>
                                ))}
                            </div>

                            {page < totalPages && (
                                <Link href={`/publikasi/berita-terkini?page=${page + 1}${tagId ? `&tag=${tagId}` : ''}`}>
                                    <Button variant="outline" size="sm">Next</Button>
                                </Link>
                            )}
                        </div>
                    )}
                </div>

                <div className="mb-5 md:w-1/6 mt-10 md:mt-0">
                    <h2 className="text-md md:text-xl font-semibold sm:tracking-tight mb-1 md:mb-5 font-montserrat text-primary">
                        Tag Berita
                    </h2>
                    <div className="flex w-full mt-5 md:mt-0 flex-wrap gap-2 px-3 font-montserrat">
                        <Badge variant={!tagId ? "default" : "secondary"} asChild className="md:lg:py-1 px-1 lg:px-3">
                            <Link href="/publikasi/berita-terkini" className="font-semibold lg:text-xs text-xs">
                                Semua
                            </Link>
                        </Badge>
                        {tags.map((t) => (
                            <Badge
                                key={t.id}
                                variant={tagId === t.id ? "default" : "secondary"}
                                asChild
                                className="md:lg:py-1 px-1 lg:px-3"
                            >
                                <Link href={`/publikasi/berita-terkini?tag=${t.id}`} className="font-semibold lg:text-xs text-xs">
                                    {t.name}
                                </Link>
                            </Badge>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}