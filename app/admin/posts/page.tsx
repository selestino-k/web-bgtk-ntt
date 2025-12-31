import { Button } from "@/components/ui/button";
import { PostDataTable } from "./post-data-table";
import { Plus } from "lucide-react";
import { columns } from "./columns";
import prisma from "@/lib/prisma";
import Link from "next/link";

async function getPostData() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  return posts.map(post => ({
    ...post,
    thumbnail: post.thumbnail || '', // Convert null to empty string
  }));
}

export default async function PostsPage() {
  const postData = await getPostData();

  return (
    <div className="items-stretch w-full min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-3 w-full">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl/7 font-semibold sm:truncate sm:text-5xl sm:tracking-tight text-primary">
            Postingan
          </h2>
        </div>
        <div className="mt-10 flex">
          <Link href="/admin/posts/buat">
            <Button variant="default" size="lg">
              <Plus className="mr-2 h-8 w-8" />
              Buat Postingan
            </Button>
          </Link>
        </div>
        <div className="mt-6 w-full">
          <PostDataTable columns={columns} data={postData} />
        </div>
      </main>
    </div>
  );
}

