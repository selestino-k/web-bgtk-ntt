"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateUser } from "@/lib/admin/actions/user-action";
import { toast } from "sonner";

const editUserSchema = z.object({
  name: z.string().min(1, "Nama diperlukan"),
  email: z.email("Alamat email tidak valid"),
  password: z
    .string()
    .min(8, "Password harus terdiri dari minimal 8 karakter")
    .optional()
    .or(z.literal("")),
  role: z.enum(["Admin", "Operator"]).optional(),
});

type EditUserFormData = z.infer<typeof editUserSchema>;

interface EditUserFormProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  isOwnProfile: boolean;
  isAdmin: boolean;
}

export function EditUserForm({ user, isOwnProfile, isAdmin }: EditUserFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<EditUserFormData>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      password: "",
      role: user.role as "Admin" | "Operator",
    },
  });

  async function onSubmit(data: EditUserFormData) {
    setIsLoading(true);

    try {
      const updateData: any = {
        id: user.id,
        name: data.name,
        email: data.email,
      };

      // Only include password if it's provided
      if (data.password && data.password.trim() !== "") {
        updateData.password = data.password;
      }

      // Only admins can change roles
      if (isAdmin && !isOwnProfile && data.role) {
        updateData.role = data.role;
      }

      const result = await updateUser(updateData);

      if (result.success) {
        toast.success(result.message);
        router.push("/admin/users");
        router.refresh();
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat memperbarui user");
    } finally {
      setIsLoading(false);
    }
  }

  return (
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
                  disabled={isLoading}
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
                  disabled={isLoading}
                />
              </FormControl>
              <FormDescription>
                Alamat email untuk login
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {isAdmin && !isOwnProfile && (
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={isLoading}
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
        )}

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password Baru (Opsional)</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    {...field}
                    disabled={isLoading}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="sr-only">
                      {showPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
              </FormControl>
              <FormDescription>
                Kosongkan jika tidak ingin mengubah password
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4 font-montserrat">
          <Button type="submit" disabled={isLoading}>
            {isLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Simpan Perubahan
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isLoading}
          >
            Batal
          </Button>
        </div>
      </form>
    </Form>
  );
}