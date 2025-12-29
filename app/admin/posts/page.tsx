"use client";

import { Button } from "@/components/ui/button";
import { PostDataTable } from "./post-data-table";
import { Plus } from "lucide-react";
import { columns } from "./columns";

// Sample data - replace with your API call
const sampleData = [
	{
		id: "1",
		title: "Judul Postingan Pertama",
		photo: "/images/placeholder.svg",
		user: "Admin1",
		kategori: "Berita",
		tanggalUpload: new Date("2024-01-15"),
	},
	{
		id: "2",
		title: "Judul Postingan Kedua",
		photo: "/images/placeholder.svg",
		user: "Admin2",
		kategori: "Acara",
		tanggalUpload: new Date("2024-02-20"),
	},
	// Tambahkan data postingan lainnya sesuai kebutuhan
];

export default function PostsPage() {
	return (
		<div className="items-stretch w-full min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col gap-3 w-full">
				<div className="flex items-center justify-between">
					<h2 className="text-2xl/7 font-semibold sm:truncate sm:text-5xl sm:tracking-tight text-primary">
						Postingan
					</h2>
				</div>
				<div className="mt-10 flex">
					<Button variant="default" size="lg">
						<Plus className="mr-2 h-8 w-8" />
						Buat Postingan
					</Button>
				</div>
				<div className="mt-6 w-full">
					<PostDataTable columns={columns} data={sampleData} />
				</div>
			</main>
		</div>
	);
}
