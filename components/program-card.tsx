"use client";

import { FeatureCard } from "@/components/motion/program-card-hover-motion";

export const features = [
	{
		title: "Program Pembelajaran Mendalam (PM)",
		link: "/program/ppm",
		imageUrl: "/logo/pm.png"
	},
	{
		title: "Koding dan Kecerdasan Artifisial (KKA)",
		link: "/program/kka",
		imageUrl: "/logo/kka.png"
	},
	{
		title: "Program Pendidikan Profesi Guru (PPG)",
		link: "/program/ppg",
		imageUrl: "/logo/ppg.png"

	},
	{
		title: "Program Pengembangan Keprofesian Guru (PKG) - Bahasa Inggris",
		link: "/program/pkb",
		imageUrl: "/logo/pkg-bi.png"
	},

	{
		title: "Program Pengembangan Keprofesian Guru (PKG) - Bimbingan Konseling",
		link: "/program/pkm",
		imageUrl: "/logo/pkg-bk.png"
	},
	{
		title: "Program Bakal Calon Kepala Sekolah (BCKS)",
		link: "/program/bcks",
		imageUrl: "/logo/bcks.png"
	},
];
export default function ProgramCardList() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-10 lg:w-full h-full max-w-7xl mx-auto mt-5 items-center px-2 py-2">
			{features.map((feature, index) => (
				<div
					key={index}
					className={`h-full flex items-center content-center justify-center ${
						index >= 4 ? "xl:col-start-2" : ""
					} ${index === 5 ? "xl:col-start-3" : ""}`}
				>
					<FeatureCard
						title={feature.title}
						link={feature.link}
						imageUrl={feature.imageUrl}
					/>
				</div>
			))}
		</div>
	);
}