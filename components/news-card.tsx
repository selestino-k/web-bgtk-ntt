"use client"
import { Card } from "./ui/card";
import Image from "next/image";
import { User, Calendar } from "lucide-react";
import { Badge } from "./ui/badge";

export const berita = [
    {
        title: "Judul Berita 1",
        date: "25 November 2025",   
        author: "Operator",
        summary: "Ringkasan singkat berita atau deskripsi konten yang menarik perhatian pembaca untuk mengklik dan membaca lebih lanjut.",
        category: ["Kabar Balai","Kabar Kementerian","Humas"]
    },
    {
        title: "Judul Berita 2",
        date: "24 November 2025",
        author: "Admin",
        summary: "Ringkasan singkat berita atau deskripsi konten yang menarik perhatian pembaca untuk mengklik dan membaca lebih lanjut.",
        category: ["Kabar Kementerian", "Teknologi", "Internasional"]
    },
    {
        title: "Judul Berita 3",
        date: "23 November 2025",
        author: "Editor",
        summary: "Ringkasan singkat berita atau deskripsi konten yang menarik perhatian pembaca untuk mengklik dan membaca lebih lanjut.",
        category: ["Humas", "Pendidikan", "Rumah Pendidikan"]
    }
];

interface NewsCardProps {
    title: string;
    date: string;
    author: string;
    summary: string;
    category: string[];

}

export default function NewsCard() {    
    return (
        <>
        {berita.map((newsItem: NewsCardProps, index: number) => (
        <Card  key={index} className="w-full shadow-lg hover:shadow-xl/20 transition-shadow duration-300 border border-primary/30 dark:border-gray-700 p-4 mb-4">
            <div className="flex h-full gap-4">  
                <div className="relative aspect-video xs:aspect-square  rounded-t-md xs:hidden w-1/3">
                    <Image 
                        src="/images/placeholder.svg"   
                        alt="Placeholder Image"
                        fill
                        sizes="(max-width: 320px) 50px, 50vw"
                        className="object-cover rounded-t-md"
                    />
                </div>
                <div className="flex flex-col w-full gap-2">
                    <div className="flex space-x-2 text-xs text-gray-500 mb-2">
                        <span className="flex items-center space-x-1">
                            <User className="h-4 w-4 mr-1"/>
                            <span>{newsItem.author}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4 mr-1"/>
                            <span>{newsItem.date}</span>
                        </span>
                    </div>  
                    <h3 className="text-xl font-bold mb-1">{newsItem.title}</h3>
                    <div className="flex flex-wrap">
                    {newsItem.category.map((cat, idx) => (
                        <Badge key={idx} className="self-start mr-1 mb-2 md:mb-0">{cat}</Badge>
                    ))}
                    </div>
                    <p className="mt-2 text-xs text-gray-600 flex-grow mb-10">
                        {newsItem.summary}
                    </p>

                </div>
            </div>
        </Card>
        ))}
        </>
    );
}