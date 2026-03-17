import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { columns } from "./columns";
import { oprColumns } from "./opr-columns";
import { db } from "@/lib/db/db";
import { user } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import { DataTable } from "@/components/ui/data-table";
import { authOptions } from "@/lib/admin/actions/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function getUserData() {
  const users = await db
    .select({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })
    .from(user)
    .orderBy(desc(user.createdAt));

  return users;
}

export default async function UsersPage() {
  const session = await getServerSession(authOptions);
  const userData = await getUserData();
  if (!session || !session.user || (session.user.role !== "Admin" && session.user.role !== "Operator")) {
    return (
      redirect('/sign-in')
    )
  }

else if (session?.user?.role === "Operator") {
    return (
      <div className="items-stretch w-full min-h-screen p-8 pb-20">
        <main className="flex flex-col gap-3 w-full">
          <div className="flex items-center justify-between">
            <h2 className="text-5xl font-bold font-montserrat text-primary">
              Daftar Pengguna
            </h2>
          </div>
          <div className="mt-6 w-full">
          {userData.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              Tidak ada pengguna yang tersedia.
            </div>
          ) : (
            <DataTable columns={oprColumns} data={userData} />
          )}
        </div>
        </main>
      </div>
    );
  }

  return (
    <div className="items-stretch w-full min-h-screen p-8 pb-20 ">
      <main className="flex flex-col gap-3 w-full">
        <div className="flex items-center justify-between">
          <h2 className="text-5xl font-bold font-montserrat text-primary">
            Daftar Pengguna 
          </h2>
        </div>
        <div className="mt-10 flex">
          <Button variant="default" size="lg" asChild className="font-montserrat">
            <Link href="/admin/users/buat">
              <Plus className="mr-2 h-8 w-8" />
              Tambah Pengguna
            </Link>
          </Button>
        </div>
        <div className="mt-6 w-full">
          {userData.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              Tidak ada pengguna yang tersedia.
            </div>
          ) : (
            <DataTable columns={columns} data={userData} meta={{ currentUserId: session.user.id }} />
          )}
        </div>
      </main>
    </div>
  );
}