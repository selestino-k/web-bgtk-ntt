import { Newspaper, ChartPie, ImagePlay, Book, User } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { DropdownMenu } from "@/components/ui/dropdown-menu"
import { SidebarUser } from "./sidebar-user"
import Image from "next/image"
import Link from "next/link"

const userData = {
    name: "Admin BGTK NTT",
    email: "bgtkntt@kemendikasmen.go.id"
}
const items = [
    {
        title: "Dashboard",
        url: "/admin",
        icon: ChartPie,
    },
    {
        title: "Postingan",
        url: "/admin/posts",
        icon: Newspaper,
    },
    {
        title: "Media",
        url: "/admin/media",
        icon: ImagePlay,
    },
    {
        title: "Dokumen",
        url: "/admin/docs",
        icon: Book,
    },
    {
        title: "Daftar Admin",
        url: "/admin/users",
        icon: User,
    }
]

// Sidebar component with explicit background styling
export async function AdminAppSidebar() {

    return (
        <Sidebar side="left" className="bg-primary dark:bg-gray-950 text-white dark:text-white-700 border-r shadow-sm transition-all duration-300 ease-in-out">
            <SidebarHeader className="bg-primary dark:bg-gray-950">
                <div className="pl-4 py-2">
                <Link href="/" className="flex items-center gap-2" prefetch={false}>
                    <Image src="/logo/kemendikdasmen-bordered.png" alt="Balai GTK Logo" width={48} height={48}/>
                    <div className="grid grid-flow-col grid-rows-2 mt-2">
                        <span className="lg:text-2xl font-geist font-extrabold font-inter mt-2 sm:text-md sm:text-[14px]">Balai GTK</span>
                        <span className="lg:text-sm font-geist font-bold text-xs">Provinsi NTT</span>
                    </div>
                </Link>
                </div>
            </SidebarHeader>
            <SidebarContent className="bg-primary dark:bg-gray-950">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <DropdownMenu>
                        </DropdownMenu>
                        <SidebarGroupLabel className="text-base items-center text-white dark:text-white-700 mb-5">PANEL ADMIN</SidebarGroupLabel>
                        <SidebarMenu className="space-y-3 font-semibold font-geist">
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url} className="flex items-center gap-3 px-3 py-2 rounded-md
                                             hover:bg-primary-70 h-12 pl-8 dark:hover:bg-gray-800 transition-colors">
                                            <item.icon className="h-8 w-8" />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="bg-primary dark:bg-gray-950">
                <SidebarUser user={userData} />
                <div className="p-4 text-sm text-white dark:text-white-700">
                    <p> © {new Date().getFullYear()} BGTK NTT</p>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}