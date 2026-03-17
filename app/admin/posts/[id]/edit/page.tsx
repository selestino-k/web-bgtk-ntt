import { db } from "@/lib/db/db";
import { post, postTag, tag, user } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/admin/actions/auth";
import { EditPostClient } from "./edit-post-client";

async function getPost(id: string) {
  const result = await db
    .select({
      id: post.id,
      title: post.title,
      slug: post.slug,
      content: post.content,
      thumbnail: post.thumbnail,
      document: post.document,
      published: post.published,
      authorName: user.name,
      authorEmail: user.email,
      tagName: tag.name,
    })
    .from(post)
    .leftJoin(user, eq(post.authorId, user.id))
    .leftJoin(postTag, eq(post.id, postTag.postId))
    .leftJoin(tag, eq(postTag.tagId, tag.id))
    .where(eq(post.id, Number(id)));

  if (!result || result.length === 0) {
    notFound();
  }

  const basePost = result[0];

  return {
    id: basePost.id,
    title: basePost.title,
    slug: basePost.slug,
    content: basePost.content,
    thumbnail: basePost.thumbnail,
    document: basePost.document,
    published: basePost.published,
    author: {
      name: basePost.authorName,
      email: basePost.authorEmail,
    },
    tags: result
      .filter((r) => r.tagName !== null)
      .map((r) => r.tagName as string),
  };
}

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  const post = await getPost((await params).id);

  const initialData = {
    id: post.id.toString(),
    title: post.title,
    slug: post.slug,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content: post.content as any,
    thumbnail: post.thumbnail || "",
    tags: post.tags,
    document: post.document,
    published: post.published,
  };

  return (
    <div className="items-stretch w-full min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-3 w-full">
        <EditPostClient postId={post.id.toString()} initialData={initialData} />
      </main>
    </div>
  );
}