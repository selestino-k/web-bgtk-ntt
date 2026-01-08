"use client"

import { use, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { updateUser, getUserById } from "@/lib/admin/actions/user-action"

const editUserFormSchema = z.object({
  name: z.string().min(1, "Nama diperlukan").optional(),
  email: z.string().email("Alamat email tidak valid").optional(),
  password: z.string().min(8, "Password harus terdiri dari minimal 8 karakter").optional().or(z.literal("")),
  confirmPassword: z.string().optional(),
  role: z.enum(["Admin", "Operator"]).optional(),
}).refine((data) => {
  if (data.password && data.password.length > 0) {
    return data.password === data.confirmPassword
  }
  return true
}, {
  message: "Password tidak cocok",
  path: ["confirmPassword"],
})

type EditUserFormValues = z.infer<typeof editUserFormSchema>

interface EditUserPageProps {
  params: Promise<{
    id: string
  }>
}

export default function EditUserPage({ params }: EditUserPageProps) {
  const { id } = use(params)
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const form = useForm<EditUserFormValues>({
    resolver: zodResolver(editUserFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: undefined,
    },
  })

  useEffect(() => {
    async function fetchUser() {
      try {
        const result = await getUserById({ id })
        
        if (!result.success || !result.data) {
          throw new Error(result.error || "Gagal memuat data pengguna")
        }
        
        form.reset({
          name: result.data.name,
          email: result.data.email,
          role: result.data.role,
          password: "",
          confirmPassword: "",
        })
      } catch (error) {
        console.error("Error fetching user:", error)
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Gagal memuat data pengguna",
          variant: "destructive",
        })
        router.push("/admin/users")
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  async function onSubmit(data: EditUserFormValues) {
    setIsSubmitting(true)

    try {
      const updateData: {
        id: string
        name?: string
        email?: string
        password?: string
        role?: "Admin" | "Operator"
      } = {
        id: id,
      }

      if (data.name && data.name.length > 0) {
        updateData.name = data.name
      }
      if (data.email && data.email.length > 0) {
        updateData.email = data.email
      }
      if (data.password && data.password.length > 0) {
        updateData.password = data.password
      }
      if (data.role) {
        updateData.role = data.role
      }

      const result = await updateUser(updateData)

      if (!result.success) {
        throw new Error(result.error || "Gagal memperbarui pengguna")
      }

      toast({
        title: "Sukses",
        description: result.message || "Pengguna berhasil diperbarui",
      })

      router.push("/admin/users")
      router.refresh()
    } catch (error) {
      console.error("Gagal memperbarui pengguna:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Gagal memperbarui pengguna",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-6 flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container mx-10 py-8 space-y-6">
      <div className="grid justify-between items-center gap-6 px-2">
        <h2 className="pb-8 text-2xl/7 font-semibold sm:truncate sm:text-5xl sm:tracking-tight text-primary">
          Edit Pengguna
        </h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informasi Pengguna</CardTitle>
          <CardDescription>
            Ubah detail pengguna. Kosongkan password jika tidak ingin mengubahnya.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormDescription>
                      Nama lengkap pengguna
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john.doe@example.com"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormDescription>
                      Alamat email untuk login
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isSubmitting}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih role pengguna" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Operator">Operator</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Tentukan level akses pengguna
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password Baru (Opsional)</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormDescription>
                      Kosongkan jika tidak ingin mengubah password
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Konfirmasi Password Baru</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormDescription>
                      Masukkan kembali password untuk konfirmasi
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Simpan Perubahan
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={isSubmitting}
                >
                  Batal
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}