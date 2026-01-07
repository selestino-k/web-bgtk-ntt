import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { columns } from "./columns";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { DataTable } from "@/components/ui/data-table";

async function getDocsData() {
  const posts = await prisma.post.findMany({
    where: {
      document: {
        not: null,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      title: true,
      document: true,
      createdAt: true,
      published: true,
    },
  });

  // Transform the data to match the DocsPage type
  return posts.map(post => ({
    id: post.id.toString(),
    title: post.title,
    description: post.published ? 'Published' : 'Draft',
    fileUrl: post.document || '',
    createdAt: post.createdAt,
    fileName: extractFileName(post.document || ''),
    postId: post.id.toString(),
  }));
}

// Helper function to extract file name from URL
function extractFileName(url: string): string {
  try {
    // For Google Drive URLs
    if (url.includes('drive.google.com')) {
      return 'Google Drive Document';
    }
    // For regular URLs, get the last part
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 1] || 'Document';
  } catch {
    return 'Document';
  }
}

export default async function DocsPage() {
  const docsData = await getDocsData();

  return (
    <div className="items-stretch w-full min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-3 w-full">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl/7 font-semibold sm:truncate sm:text-5xl sm:tracking-tight text-primary">
            Dokumen
          </h2>
        </div>
        <div className="mt-10 flex">

          <Button variant="default" size="lg" asChild>
            <Link href="/admin/posts/buat">
              <Plus className="mr-2 h-8 w-8" />
              Buat Postingan dengan Dokumen
            </Link>
          </Button>
        </div>
        <div className="mt-6 w-full">
          {docsData.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              Tidak ada dokumen yang tersedia.
            </div>
          ) : (
            <DataTable columns={columns} data={docsData} />
          )}
        </div>
      </main>
    </div>
  );
}

