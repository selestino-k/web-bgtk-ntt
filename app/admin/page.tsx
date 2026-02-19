import { Button } from "@/components/ui/button";
import { Newspaper, ImagePlay, Book, User, Plus, Monitor, Smartphone } from "lucide-react";
import { DashboardChart } from "@/components/admin/dash-chart";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { authOptions } from "@/lib/admin/actions/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function getDashboardData() {
    const baseUrl = process.env.NEXT_PROD_BASE_URL || 'http://localhost:3000';
    
    const [dbStats, viewStats] = await Promise.all([
        {
            totalPosts: await prisma.post.count(),
            totalMedia: await prisma.post.count({
                where: { thumbnail: { not: null } },
            }),
            totalDocuments: await prisma.document.count({
            }),
            totalAdmins: await prisma.user.count(),
        },
        fetch(`${baseUrl}/api/stats?type=summary`, { 
            cache: 'no-store',
            next: { revalidate: 0 }
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .catch(() => {
                return {
                    today: { total: 0, mobile: 0, desktop: 0 },
                    thisMonth: { total: 0, mobile: 0, desktop: 0 },
                    thisYear: { total: 0, mobile: 0, desktop: 0 },
                    homepage: { total: 0, mobile: 0, desktop: 0 }
                };
            })
    ]);

    return { ...dbStats, ...viewStats };
}

export default async function AdminPage() {
    const session = await getServerSession(authOptions);
    const dashboardData = await getDashboardData();

    
    if (!session || !session.user || (session.user.role !== "Admin" && session.user.role !== "Operator")) {
        redirect('/sign-in');
    }

    return (
        <div className="items-stretch w-full min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-3 w-full">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl/7 font-semibold sm:truncate sm:text-5xl sm:tracking-tight text-primary">
                        Dashboard
                    </h2>
                    <Button variant="default" size="lg" asChild>
                        <Link href="/admin/posts/buat">
                            <Plus className="mr-2 h-8 w-8" />
                            Buat Postingan
                        </Link>
                    </Button>
                </div>

                {/* Database Stats */}
                <div className="mt-5">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Statistik Konten</h3>
                    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="p-4 border rounded-lg  shadow-sm">
                            <h4 className="text-lg text-muted-foreground font-medium font-montserrat">Total Postingan</h4>
                            <h2 className="text-3xl font-bold">
                                <Newspaper className="inline-block mr-2 h-6 w-6 text-primary" />
                                {dashboardData.totalPosts}
                            </h2>
                        </div>
                        <div className="p-4 border rounded-lg shadow-sm">
                            <h4 className="text-lg text-muted-foreground font-medium font-montserrat">Jumlah Media</h4>
                            <h2 className="text-3xl font-bold">
                                <ImagePlay className="inline-block mr-2 h-6 w-6 text-primary" />
                                {dashboardData.totalMedia}
                            </h2>
                        </div>
                        <div className="p-4 border rounded-lg shadow-sm">
                            <h4 className="text-lg text-muted-foreground font-medium font-montserrat">Jumlah Dokumen</h4>
                            <h2 className="text-3xl font-bold">
                                <Book className="inline-block mr-2 h-6 w-6 text-primary" />
                                {dashboardData.totalDocuments}
                            </h2>
                        </div>
                        <div className="p-4 border rounded-lg shadow-sm">
                            <h4 className="text-lg text-muted-foreground font-medium font-montserrat">Total Admin</h4>
                            <h2 className="text-3xl font-bold">
                                <User className="inline-block mr-2 h-6 w-6 text-primary" />
                                {dashboardData.totalAdmins}
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <DashboardChart />
                </div>

                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Statistik Kunjungan</h3>
                    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="p-4 border rounded-lg shadow-sm">
                            <h4 className="text-lg text-muted-foreground font-medium font-montserrat">Kunjungan Hari Ini</h4>
                            <h2 className="text-3xl font-bold text-primary">
                                {dashboardData.today?.total || 0}
                            </h2>
                            <p className="text-sm text-muted-foreground flex items-center gap-2 mt-2">
                                <Smartphone className="h-4 w-4" /> {dashboardData.today?.mobile || 0} 
                                <Monitor className="h-4 w-4 ml-2" /> {dashboardData.today?.desktop || 0}
                            </p>
                        </div>
                        <div className="p-4 border rounded-lg shadow-sm">
                            <h4 className="text-lg text-muted-foreground font-medium font-montserrat">Kunjungan Bulan Ini</h4>
                            <h2 className="text-3xl font-bold text-primary">
                                {dashboardData.thisMonth?.total || 0}
                            </h2>
                            <p className="text-sm text-muted-foreground flex items-center gap-2 mt-2">
                                <Smartphone className="h-4 w-4" /> {dashboardData.thisMonth?.mobile || 0}
                                <Monitor className="h-4 w-4 ml-2" /> {dashboardData.thisMonth?.desktop || 0}
                            </p>
                        </div>
                        <div className="p-4 border rounded-lg shadow-sm">
                            <h4 className="text-lg text-muted-foreground font-medium font-montserrat">Kunjungan Tahun Ini</h4>
                            <h2 className="text-3xl font-bold text-primary">
                                {dashboardData.thisYear?.total || 0}
                            </h2>
                            <p className="text-sm text-muted-foreground flex items-center gap-2 mt-2">
                                <Smartphone className="h-4 w-4" /> {dashboardData.thisYear?.mobile || 0}
                                <Monitor className="h-4 w-4 ml-2" /> {dashboardData.thisYear?.desktop || 0}
                            </p>
                        </div>
                        <div className="p-4 border rounded-lg shadow-sm">
                            <h4 className="text-lg text-muted-foreground font-medium font-montserrat">Total Kunjungan Homepage</h4>
                            <h2 className="text-3xl font-bold text-primary">
                                {dashboardData.homepage?.total || 0}
                            </h2>
                            <p className="text-sm text-muted-foreground flex items-center gap-2 mt-2">
                                <Smartphone className="h-4 w-4" /> {dashboardData.homepage?.mobile || 0}
                                <Monitor className="h-4 w-4 ml-2" /> {dashboardData.homepage?.desktop || 0}
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}






