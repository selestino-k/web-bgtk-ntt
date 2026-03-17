import { Button } from "@/components/ui/button";
import { PostDataTable } from "@/app/admin/posts/post-data-table";
import { Plus } from "lucide-react";
import { columns } from "./columns";
import { db } from "@/lib/db/db";
import { post, postTag, tag } from "@/lib/db/schema";
import { desc, eq, ilike, and } from "drizzle-orm";
import type { InferSelectModel } from "drizzle-orm";
import Link from "next/link";
import { authOptions } from "@/lib/admin/actions/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export type PostWithRelations = InferSelectModel<typeof post> & {
  thumbnail: string;
  tags: {
    tag: InferSelectModel<typeof tag>;
    assignedAt: Date;
    postId: number;
    tagId: number;
  }[];
  author: {
    name: string;
    email: string;
  };
};

async function getPostData(): Promise<PostWithRelations[]> {
  const pengumumanPosts = await db.query.post.findMany({
    where: (post, { exists }) =>
      exists(
        db
          .select()
          .from(postTag)
          .innerJoin(tag, eq(postTag.tagId, tag.id))
          .where(
            and(
              eq(postTag.postId, post.id),
              eq(tag.type, 'ANNOUNCEMENT'),
              ilike(tag.name, 'pengumuman')
            )
          )
      ),
    orderBy: [desc(post.createdAt)],
    with: {
      tags: {
        with: {
          tag: true,
        },
      },
      author: {
        columns: {
          name: true,
          email: true,
        },
      },
    },
  });

  return pengumumanPosts.map(p => ({
    ...p,
    thumbnail: p.thumbnail ?? '',
  })) as PostWithRelations[];
}

export default async function PengumumanPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || (session.user.role !== "Admin" && session.user.role !== "Operator")) {
    redirect('/sign-in');
  }

  const postData = await getPostData();

  return (
    <div className="items-stretch w-full min-h-screen p-8 pb-20">
      <main className="flex flex-col gap-3 w-full">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold font-montserrat sm:truncate sm:text-5xl sm:tracking-tight text-primary">
            Pengumuman
          </h2>
        </div>
        <div className="mt-10 flex">
          <Button variant="default" size="lg" asChild className="font-montserrat">
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

