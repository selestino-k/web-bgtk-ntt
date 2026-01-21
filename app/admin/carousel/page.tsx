import { Button } from "@/components/ui/button";
import { FotoDataTable } from "./foto-data-table";
import { Plus } from "lucide-react";
import { columns } from "./columns";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { authOptions } from "@/lib/admin/actions/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";




async function getCarouselPhotoData() {

    return await prisma.carouselPhoto.findMany({
        orderBy: { order : 'asc' },
        
    },
    );

}

export default async function DaftarFotoPage() {
    const carouselPhotoData = await getCarouselPhotoData();
     const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
       redirect("/sign-in");
    }

    return (
        <div className="items-stretch w-full min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-3 w-full">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl/7 font-semibold sm:truncate sm:text-5xl sm:tracking-tight text-primary">
                        Daftar Carousel Foto
                    </h2>
                </div>
                <div className="mt-10 flex">
                    <Button variant="default" size="lg" asChild>
                        <Link href="/admin/carousel/tambah">
                            <Plus className="mr-2 h-8 w-8" />
                            Tambah Foto Carousel Baru
                        </Link>
                    </Button>
                </div>
                <div className="mt-6 w-full">
                    <FotoDataTable columns={columns} data={carouselPhotoData} />
                </div>
            </main>
        </div>
    );
}
