import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import EditPostForm from "./edit-post-form";

async function getPost(id: string) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: BigInt(id),
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (!post) {
      return null;
    }

    // Convert bigint to string for JSON serialization
    return {
      ...post,
      id: post.id.toString(),
      tags: post.tags.map((tagRelation) => ({
        ...tagRelation,
        postId: tagRelation.postId.toString(),
        tag: tagRelation.tag,
      })),
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

async function getTags() {
  const tags = await prisma.tag.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  return tags;
}

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(id);
  
  if (!post) {
    notFound();
  }

  const tags = await getTags();

  return (
    <div className="items-stretch w-full min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-3 w-full max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl/7 font-semibold sm:truncate sm:text-5xl sm:tracking-tight text-primary">
            Edit Postingan
          </h2>
        </div>
        <EditPostForm post={post} availableTags={tags} />
      </main>
    </div>
  );
}