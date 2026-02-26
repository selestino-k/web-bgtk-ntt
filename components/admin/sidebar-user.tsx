"use client"

import {
  EllipsisVertical,
  Settings,
  User,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Avatar } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { SignOut } from "./sign-out"

export function SidebarUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    role?: string;
  }
}) {
  const { isMobile } = useSidebar()
  const [open, setOpen] = useState(false)
  const router = useRouter()

  return (
    <SidebarMenu className="font-montserrat">
      <SidebarMenuItem>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <User />
              </Avatar>
              <div className="grid my-3 flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
                {user.role && <span className="truncate text-xs opacity-70">{user.role}</span>}
              </div>
              <EllipsisVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] font-montserrat font-medium w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/admin/pengaturan-akun" className="flex items-center cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  Pengaturan Akun
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <SignOut />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
      </SidebarMenuItem>
    </SidebarMenu>
  )
}