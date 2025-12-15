"use client"
import { Card } from "./ui/card";
import Image from "next/image";
import { User, Calendar } from "lucide-react";
import { Badge } from "./ui/badge";
import Link from "next/link";

export const berita = [
    {
        title: "Pengumuman 1",
        date: "25 November 2025",   
        author: "Operator",
        category: ["Pengumuman"]
    },
    {
        title: "Pengumuman 2",
        date: "24 November 2025",
        author: "Admin",
        category: ["Pengumuman"]
    },
    {
        title: "Pengumuman 3",
        date: "23 November 2025",
        author: "Editor",
        category: ["Pengumuman"]
    }
];

interface NewsCardProps {
    title: string;
    date: string;
    author: string;
    category: string[];

}

export default function PengumumanCard() {    
    return (
        <>
        {berita.map((newsItem: NewsCardProps, index: number) => (
        <Card  
        key={index} 
        className="w-full shadow-lg hover:shadow-xl/20 transition-shadow duration-300 border border-primary/30 dark:border-gray-700 p-4 mb-4"
        >
        <Link href="/publikasi/pengumuman/detail">
            
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
                    

                </div>
            </div>
            </Link>
        </Card>
        ))}
        </>
    );
}