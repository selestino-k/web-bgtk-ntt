"use server"

import { db } from "@/lib/db/db";
import { user } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { z } from "zod";
import { revalidatePath } from "next/cache";

// Validation schemas
const createUserSchema = z.object({
  email: z.email("Alamat email tidak valid"),
  password: z.string().min(8, "Password harus terdiri dari minimal 8 karakter"),
  name: z.string().min(1, "Nama diperlukan"),
  role: z.enum(["Admin", "Operator"]),
});

const updateUserSchema = z.object({
  id: z.uuid("User ID tidak valid"),
  name: z.string().min(1, "Nama diperlukan").optional(),
  email: z.email("Alamat email tidak valid").optional(),
  password: z.string().min(8, "Password harus terdiri dari minimal 8 karakter").optional(),
  role: z.enum(["Admin", "Operator"]).optional(),
});

const deleteUserSchema = z.object({
  userId: z.uuid("User ID tidak valid"),
});

const getUserByIdSchema = z.object({
  id: z.uuid("User ID tidak valid"),
});

type CreateUserInput = z.infer<typeof createUserSchema>;
type UpdateUserInput = z.infer<typeof updateUserSchema>;
type DeleteUserInput = z.infer<typeof deleteUserSchema>;
type GetUserByIdInput = z.infer<typeof getUserByIdSchema>;

// Get user by ID action
export async function getUserById(input: GetUserByIdInput) {
  try {
    const validatedData = getUserByIdSchema.parse(input);

    const [foundUser] = await db
      .select({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      })
      .from(user)
      .where(eq(user.id, validatedData.id))
      .limit(1);

    if (!foundUser) {
      return {
        success: false,
        error: "User tidak ditemukan",
      };
    }

    return {
      success: true,
      data: foundUser,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0].message,
      };
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : "Terjadi kesalahan saat mengambil data user",
    };
  }
}

// Create user action
export async function createUser(userData: CreateUserInput) {
  try {
    const validatedData = createUserSchema.parse(userData);

    const [existingUser] = await db
      .select({ id: user.id })
      .from(user)
      .where(eq(user.email, validatedData.email))
      .limit(1);

    if (existingUser) {
      return {
        success: false,
        error: "User dengan email ini sudah ada",
      };
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    const [createdUser] = await db
      .insert(user)
      .values({
        email: validatedData.email,
        password: hashedPassword,
        name: validatedData.name,
        role: validatedData.role,
      })
      .returning({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      });

    revalidatePath("/admin/users");

    return {
      success: true,
      data: createdUser,
      message: "User berhasil dibuat",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0].message,
      };
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : "Terjadi kesalahan saat membuat user",
    };
  }
}

// Update user action
export async function updateUser(data: UpdateUserInput) {
  try {
    const validatedData = updateUserSchema.parse(data);

    const [userExists] = await db
      .select({ id: user.id })
      .from(user)
      .where(eq(user.id, validatedData.id))
      .limit(1);

    if (!userExists) {
      return {
        success: false,
        error: "User tidak ditemukan",
      };
    }

    const updateData: Partial<{
      name: string;
      email: string;
      password: string;
      role: "Admin" | "Operator";
    }> = {};

    if (validatedData.name !== undefined) {
      updateData.name = validatedData.name;
    }

    if (validatedData.email !== undefined) {
      const [existingUser] = await db
        .select({ id: user.id })
        .from(user)
        .where(eq(user.email, validatedData.email))
        .limit(1);

      if (existingUser && existingUser.id !== validatedData.id) {
        return {
          success: false,
          error: "Email ini sudah digunakan oleh user lain",
        };
      }
      updateData.email = validatedData.email;
    }

    if (validatedData.role !== undefined) {
      updateData.role = validatedData.role;
    }

    if (validatedData.password) {
      updateData.password = await bcrypt.hash(validatedData.password, 10);
    }

    if (Object.keys(updateData).length === 0) {
      return {
        success: false,
        error: "Tidak ada data yang perlu diperbarui",
      };
    }

    const [updatedUser] = await db
      .update(user)
      .set(updateData)
      .where(eq(user.id, validatedData.id))
      .returning({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      });

    revalidatePath("/admin/users");

    return {
      success: true,
      data: updatedUser,
      message: "User berhasil diperbarui",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0].message,
      };
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : "Terjadi kesalahan saat memperbarui user",
    };
  }
}

// Delete user action
export async function deleteUser(input: DeleteUserInput) {
  try {
    const validatedData = deleteUserSchema.parse(input);

    const [userExists] = await db
      .select({ id: user.id })
      .from(user)
      .where(eq(user.id, validatedData.userId))
      .limit(1);

    if (!userExists) {
      return {
        success: false,
        error: "User tidak ditemukan",
      };
    }

    await db.delete(user).where(eq(user.id, validatedData.userId));

    revalidatePath("/admin/users");

    return {
      success: true,
      message: "User berhasil dihapus",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0].message,
      };
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : "Terjadi kesalahan saat menghapus user",
    };
  }
}