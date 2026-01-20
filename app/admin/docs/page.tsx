import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { columns } from "./columns";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { DataTable } from "@/components/ui/data-table";
import { authOptions } from "@/lib/admin/actions/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function getDocsData() {
   return await prisma.document.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

}

export default async function DocsPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || (session.user.role !== "Admin" && session.user.role !== "Operator")) {
    redirect('/sign-in');
  }
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
          <Link href="/admin/docs/upload">
            <Button variant="default" size="lg">
              <Plus className="mr-2 h-8 w-8" />
              Upload Dokumen
            </Button>
          </Link>
        </div>
        <div className="mt-6 w-full">
            <DataTable columns={columns} data={docsData} />
        </div>
      </main>
    </div>
  );
}
