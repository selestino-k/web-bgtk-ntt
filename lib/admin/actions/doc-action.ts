"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/lib/db/db"
import { document } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { uploadDocumentToAssets, deleteDocumentFromAssets } from "./file-actions"

// Upload document
export async function uploadDocument(formData: FormData) {
  try {
    const file = formData.get("file") as File
    const title = formData.get("title") as string
    const description = formData.get("description") as string | null
    const category = formData.get("category") as string | null

    if (!file || !title) {
      return { success: false, error: "File dan judul harus diisi" }
    }

    // Upload to Assets
    const uploadResult = await uploadDocumentToAssets(file, "documents")

    if (!uploadResult.success || !uploadResult.url) {
      return { success: false, error: uploadResult.error || "Gagal mengunggah dokumen" }
    }

    // Save to database with actual filename
    const [newDocument] = await db
      .insert(document)
      .values({
        title,
        description,
        category,
        fileUrl: uploadResult.url,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
      })
      .returning()

    revalidatePath("/admin/documents")
    return { success: true, document: newDocument }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal mengunggah dokumen",
    }
  }
}

// Delete document
export async function deleteDocument(id: number) {
  try {
    // Get document from database
    const [existingDocument] = await db
      .select()
      .from(document)
      .where(eq(document.id, id))
      .limit(1)

    if (!existingDocument) {
      return { success: false, error: "Dokumen tidak ditemukan" }
    }

    // Delete from Assets
    const deleteResult = await deleteDocumentFromAssets(existingDocument.fileUrl)

    if (!deleteResult.success) {
      console.error(deleteResult.error || "Gagal menghapus dokumen dari Server")
      // Continue with database deletion even if Assets deletion fails
    }

    // Delete from database
    await db.delete(document).where(eq(document.id, id))

    revalidatePath("/admin/documents")
    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal menghapus dokumen",
    }
  }
}

// Get all documents
export async function getDocuments() {
  try {
    const documents = await db
      .select()
      .from(document)
      .orderBy(document.createdAt)

    return { success: true, documents }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal mengambil dokumen",
    }
  }
}

// Get single document
export async function getDocument(id: number) {
  try {
    const [existingDocument] = await db
      .select()
      .from(document)
      .where(eq(document.id, id))
      .limit(1)

    if (!existingDocument) {
      return { success: false, error: "Dokumen tidak ditemukan" }
    }

    return { success: true, document: existingDocument }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal mengambil dokumen",
    }
  }
}

// Update document metadata (without changing file)
export async function updateDocument(
  id: number,
  data: { title?: string; description?: string | null; category?: string | null }
) {
  try {
    const [updatedDocument] = await db
      .update(document)
      .set(data)
      .where(eq(document.id, id))
      .returning()

    if (!updatedDocument) {
      return { success: false, error: "Dokumen tidak ditemukan" }
    }

    revalidatePath("/admin/documents")
    return { success: true, document: updatedDocument }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal memperbarui dokumen",
    }
  }
}