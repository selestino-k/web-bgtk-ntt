import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { AdminModeToggle } from "@/components/admin/admin-dark-switch";

export const metadata: Metadata = {
  title: "Masuk | Panel Admin CMS BGTK Provinsi NTT",
  description: "Masuk ke Panel Admin CMS BGTK Provinsi NTT",
};

export default function AuthLayout({
  children,
}:{
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <main className="relative w-full min-h-screen">
        <div className="absolute top-4 right-4 z-20">
          <AdminModeToggle />
        </div>
        <div className="flex min-h-screen items-center justify-center">
          {children}
        </div>
      </main>
    </ThemeProvider>
  );
}

