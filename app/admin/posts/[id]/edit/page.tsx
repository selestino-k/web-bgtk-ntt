import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/admin/actions/auth";
import { EditPostClient } from "./edit-post-client";

async function getPost(id: string) {
  const post = await prisma.post.findUnique({
    where: { id: BigInt(id) },
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
      author: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  if (!post) {
    notFound();
  }

  return post;
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
    tags: post.tags.map((t) => t.tag.name),
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