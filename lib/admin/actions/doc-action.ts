"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/prisma"
import { uploadDocumentToAssets, deleteDocumentFromAssets } from "./file-actions"
import { toast } from "sonner"

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
    const document = await prisma.document.create({
      data: {
        title,
        description,
        category,
        fileUrl: uploadResult.url,
        fileName: file.name, // Store actual filename
        fileSize: file.size,
        fileType: file.type,
      },
    })

    revalidatePath("/admin/documents")
    return { success: true, document }
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
    const document = await prisma.document.findUnique({
      where: { id },
    })

    if (!document) {
      return { success: false, error: "Dokumen tidak ditemukan" }
    }

    // Delete from Assets
    const deleteResult = await deleteDocumentFromAssets(document.fileUrl)

    if (!deleteResult.success) {
        toast.error(deleteResult.error || "Gagal menghapus dokumen dari Server")      // Continue with database deletion even if Assets deletion fails
    }

    // Delete from database
    await prisma.document.delete({
      where: { id },
    })

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
    const documents = await prisma.document.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

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
    const document = await prisma.document.findUnique({
      where: { id },
    })

    if (!document) {
      return { success: false, error: "Dokumen tidak ditemukan" }
    }

    return { success: true, document }
  } catch (error) {
    toast.error("Gagal mengambil dokumen")
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal mengambil dokumen",
    }
  }
}

// Update document metadata (without changing file)
export async function updateDocument(id: number, data: { title?: string; description?: string | null; category?: string | null }) {
  try {
    const document = await prisma.document.update({
      where: { id },
      data,
    })

    revalidatePath("/admin/documents")
    return { success: true, document }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal memperbarui dokumen",
    }
  }
}