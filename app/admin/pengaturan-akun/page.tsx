import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/admin/actions/auth";
import { getUserById } from "@/lib/admin/actions/user-action";
import { EditUserForm } from "./edit-current-user-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  const result = await getUserById({ id: session.user.id });

  if (!result.success || !result.data) {
    notFound();
  }

  return (
    <div className="container mx-10 py-8 space-y-6">
      <div className="grid justify-between items-center gap-2 px-2">
        <h2 className="pb-2 text-5xl font-montserrat font-bold text-primary">
          Pengaturan Akun
        </h2>
        <h4 className="text-md text-muted-foreground">
          Kelola informasi akun Anda
        </h4>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informasi Pengguna</CardTitle>
          <CardDescription>
            Ubah detail pengguna. Kosongkan password jika tidak ingin mengubahnya.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EditUserForm 
            user={result.data} 
            isOwnProfile={true}
            isAdmin={session.user.role === "Admin"}
          />
        </CardContent>
      </Card>
    </div>
  );
}