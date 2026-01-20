import { Button } from "@/components/ui/button";
import { PostDataTable } from "@/app/admin/posts/post-data-table";
import { Plus } from "lucide-react";
import { columns } from "./columns";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { authOptions } from "@/lib/admin/actions/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function getPostData() {
  const posts = await prisma.post.findMany({
    where: {
      tags: {
        some: {
          tag: {
            name: {
              equals: 'pengumuman',
              mode: 'insensitive',
            },
            type: 'ANNOUNCEMENT',
          },
        },
      },
    },
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

export default async function PengumumanPage() {
  const postData = await getPostData();
  const session = await getServerSession(authOptions);

  if (!session || !session.user || (session.user.role !== "Admin" && session.user.role !== "Operator")) {
   redirect('/sign-in');
  }

  return (
    <div className="items-stretch w-full min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-3 w-full">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl/7 font-semibold sm:truncate sm:text-5xl sm:tracking-tight text-primary">
            Pengumuman
          </h2>
        </div>
        <div className="mt-10 flex">
          <Button variant="default" size="lg" asChild>
            <Link href="/admin/posts/buat">
              <Plus className="mr-2 h-8 w-8" />
              Buat Postingan Pengumuman
            </Link>
          </Button>
        </div>
        <div className="mt-6 w-full">
          {postData.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              Tidak ada pengumuman yang tersedia.
            </div>
          ) : (
            <PostDataTable columns={columns} data={postData} />
          )}
        </div>
      </main>
    </div>
  );
}

