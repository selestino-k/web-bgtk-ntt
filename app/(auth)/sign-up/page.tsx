"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, Loader2, Mail, Lock, User } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function SignUpPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Password tidak cocok. Silakan coba lagi.");
      setIsLoading(false);
      return;
    }

    // Validate password length
    if (password.length < 8) {
      setError("Password harus terdiri dari minimal 8 karakter.");
      setIsLoading(false);
      return;
    }
    
    try {
      // Register user
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Gagal mendaftar. Silakan coba lagi.");
        setIsLoading(false);
        return;
      }

      // Auto sign in after registration
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      
      if (result?.error) {
        setError("Pendaftaran berhasil, tapi gagal masuk. Silakan coba masuk secara manual.");
        setIsLoading(false);
        return;
      }

      // Redirect to home or dashboard
      router.push("/");
      router.refresh();
      
    } catch {
      setError("Terjadi kesalahan saat mendaftar. Silakan coba lagi.");
      setIsLoading(false);
    }
  }

  return (
    <div className="relative grid w-full min-h-screen py-10 place-items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/intro-web.png"
          alt="Background"
          fill
          className="object-cover opacity-95 blur-xs dark:opacity-40"
          priority
        />
      </div>
      <main className="relative z-10 w-full max-w-md mx-auto my-auto space-y-6 p-8 rounded-xl shadow-lg bg-white/90 dark:bg-gray-900/90">
        <div className="space-y-2 text-center">
          <div className="pb-6 flex items-center justify-center space-x-6">
            <Link href="/">
              <Image
                src="/logo/logo-web-bgtk-ntt.png"
                alt="Logo BGTK NTT"
                width={300}
                height={100}
                className="object-contain opacity-100 hover:opacity-80 transition-opacity"
              />
            </Link>
          </div>
          <h2 className="text-3xl font-geist font-bold text-primary">Panel Admin CMS </h2>
          <h3 className="text-md font-geist font-semibold">BGTK Provinsi NTT</h3>
        </div>

        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Daftar Akun
            </CardTitle>
            <CardDescription className="text-center">
              Masukkan informasi Anda untuk membuat akun
            </CardDescription>
          </CardHeader>

          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Gagal Mendaftar</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    type="text"
                    required
                    autoComplete="name"
                    disabled={isLoading}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    placeholder="nama@example.com"
                    type="email"
                    required
                    autoComplete="email"
                    disabled={isLoading}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    type="password"
                    required
                    autoComplete="new-password"
                    disabled={isLoading}
                    className="pl-10"
                    minLength={8}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Minimal 8 karakter
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="••••••••"
                    type="password"
                    required
                    autoComplete="new-password"
                    disabled={isLoading}
                    className="pl-10"
                    minLength={8}
                  />
                </div>
              </div>

              <Button 
                className="w-full" 
                type="submit" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  "Daftar"
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-2">
            <div className="text-sm text-center text-muted-foreground">
              Sudah punya akun?{" "}
              <Link 
                href="/sign-in" 
                className="text-primary font-medium hover:underline"
              >
                Masuk di sini
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}