"use client";

import { FeatureCard } from "@/components/motion/program-card-hover-motion";

export const features = [
	{
		title: "Program Pembelajaran Mendalam (PPM)",
		description:
			"Menyediakan materi pembelajaran yang mendalam dan komprehensif untuk guru dan calon guru.",
			link: "/program/ppm"
	},
	{
		title: "Indeks Kepuasan Masyarakat (IKM)",
		description:
			"mengukur tingkat kepuasan masyarakat terhadap layanan yang diberikan oleh Balai GTK NTT.",
			link: "/program/ikm"
	},
	{
		title: "Program Pendidikan Profesi Guru (PPG)",
		description:
			"Menyediakan pendidikan profesi bagi calon guru untuk memenuhi standar kompetensi nasional.",
			link: "/program/ppg"
	},
	{
		title: "Program Pengembangan Keprofesian Berkelanjutan (PKB)",
		description:
			"Menyediakan pelatihan dan workshop untuk guru dalam rangka meningkatkan kompetensi dan profesionalisme.",
			link: "/program/pkb"
	},
];
export default function ProgramCardList() {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-10 xl:max-w-7xl max-w-5xl lg:max-w-3xl h-full mx-auto mt-5 items-center place-content-around">
			{features.map((feature, index) => (
				<div
					key={index}
					className="h-full flex items-center content-center justify-center"
				>
					<FeatureCard
						title={feature.title}
						description={feature.description}
						link ={feature.link}
					/>
				</div>
			))}
		</div>
	);
}