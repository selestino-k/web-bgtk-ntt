import type { Metadata } from "next";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeProvider } from "@/components/ui/theme-provider";
import { AdminModeToggle } from "@/components/admin/admin-dark-switch";
import { Toaster } from "sonner";
import { AdminAppSidebar } from "@/components/admin/admin-sidebar";

export const metadata: Metadata = {
  title: "Panel Admin Web BGTK NTT",
  description: "Panel Admin untuk mengelola konten website Balai GTK NTT",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider
        defaultOpen={true}
        style={{
          "--sidebar-width": "250px",
          "--sidebar-width-mobile": "100%",
        } as React.CSSProperties}
      >
        <AdminAppSidebar />

        <main className="gap-3 w-full">
          <div className="flex items-center content-center justify-between p-4 bg-white dark:bg-gray-950 border-b shadow-sm">
            <SidebarTrigger/>
            <AdminModeToggle />
          </div>
          <div className="flex w-full min-h-screen items-center justify-items-center">
            {children}
            <Toaster position="top-right" />

          </div>
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
}

