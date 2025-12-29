import { Button } from "@/components/ui/button";
import { Newspaper, ImagePlay, Book, User, Plus } from "lucide-react";
import { DashboardChart } from "@/components/admin/dash-chart";

export default function AdminPage() {
    return (
        <div className="items-stretch w-full min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-3 w-full">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl/7 font-semibold sm:truncate sm:text-5xl sm:tracking-tight text-primary">
                        Dashboard
                    </h2>
                    <Button variant="default" size="lg">
                        <Plus className="mr-2 h-8 w-8" />
                        Buat Postingan
                    </Button>
                </div>
                <div className="mt-5 flex ">
                    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div>
                            <h4 className="text-lg text-muted-foreground">Total Postingan</h4>
                            <h2 className="text-3xl font-bold">
                                <Newspaper className="inline-block mr-2 h-6 w-6 text-primary" />
                                75
                            </h2>
                        </div>
                        <div>
                            <h4 className="text-lg text-muted-foreground">Jumlah Media</h4>
                            <h2 className="text-3xl font-bold">
                                <ImagePlay className="inline-block mr-2 h-6 w-6 text-primary" />
                                55
                            </h2>
                        </div>
                        <div>
                            <h4 className="text-lg text-muted-foreground">Jumlah Dokumen</h4>
                            <h2 className="text-3xl font-bold">
                                <Book className="inline-block mr-2 h-6 w-6 text-primary" />
                                12
                            </h2>
                        </div>
                        <div>
                            <h4 className="text-lg text-muted-foreground">Total Admin</h4>
                            <h2 className="text-3xl font-bold">
                                <User className="inline-block mr-2 h-6 w-6 text-primary" />
                                3
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <DashboardChart />
                </div>
                  <div className="mt-5 flex ">
                    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div>
                            <h4 className="text-lg text-muted-foreground">Kunjungan Hari Ini</h4>
                            <h2 className="text-3xl font-bold">
                                150
                            </h2>
                        </div>
                        <div>
                            <h4 className="text-lg text-muted-foreground">Kunjungan Bulan Ini</h4>
                            <h2 className="text-3xl font-bold">
                                4.500
                            </h2>
                        </div>
                        <div>
                            <h4 className="text-lg text-muted-foreground">Kunjungan Tahun Ini</h4>
                            <h2 className="text-3xl font-bold">
                                54.000
                            </h2>
                        </div>
                        <div>
                            <h4 className="text-lg text-muted-foreground">Total Kunjungan</h4>
                            <h2 className="text-3xl font-bold">
                                1.200.000
                            </h2>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
