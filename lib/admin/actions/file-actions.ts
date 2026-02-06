"use server"

import { writeFile, unlink, mkdir } from "fs/promises"
import path from "path"
import { existsSync } from "fs"

const PUBLIC_DIR = path.join(process.cwd(), "public")
const ASSETS_DIR = path.join(PUBLIC_DIR, "assets")

// Ensure directory exists
async function ensureDirectoryExists(dirPath: string) {
  if (!existsSync(dirPath)) {
    await mkdir(dirPath, { recursive: true })
  }
}

// Upload image to public/assets/images
export async function uploadImageToAssets(
  file: File,
  subfolder: string = "images"
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]
    if (!allowedTypes.includes(file.type)) {
      return {
        success: false,
        error: "Tipe file tidak didukung. Harap unggah JPEG, PNG, GIF, atau WebP.",
      }
    }

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return {
        success: false,
        error: "Ukuran file harus kurang dari 5MB",
      }
    }

    // Generate unique filename
    const timestamp = Date.now()
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "-")
    const filename = `${timestamp}-${sanitizedName}`

    // Prepare directory
    const targetDir = path.join(ASSETS_DIR, subfolder)
    await ensureDirectoryExists(targetDir)

    // Write file
    const filePath = path.join(targetDir, filename)
    await writeFile(filePath, buffer)

    // Return public URL
    const url = `/assets/${subfolder}/${filename}`

    return { success: true, url }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal mengunggah gambar",
    }
  }
}

// Upload document to public/assets/documents
export async function uploadDocumentToAssets(
  file: File,
  subfolder: string = "documents"
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "text/plain",
    ]

    if (!allowedTypes.includes(file.type)) {
      return {
        success: false,
        error: "Tipe file tidak didukung. Harap unggah PDF, Word, Excel, PowerPoint, atau Text file.",
      }
    }

    // Check file size (50MB limit)
    if (file.size > 50 * 1024 * 1024) {
      return {
        success: false,
        error: "Ukuran file harus kurang dari 50MB",
      }
    }

    // Generate unique filename
    const timestamp = Date.now()
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "-")
    const filename = `${timestamp}-${sanitizedName}`

    // Prepare directory
    const targetDir = path.join(ASSETS_DIR, subfolder)
    await ensureDirectoryExists(targetDir)

    // Write file
    const filePath = path.join(targetDir, filename)
    await writeFile(filePath, buffer)

    // Return public URL
    const url = `/assets/${subfolder}/${filename}`

    return { success: true, url }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal mengunggah dokumen",
    }
  }
}

// Upload carousel image to public/assets/carousel
export async function uploadCarouselImageToAssets(
  file: File
): Promise<{ success: boolean; url?: string; error?: string }> {
  return uploadImageToAssets(file, "carousel")
}

// Upload post image to public/assets/posts
export async function uploadPostImageToAssets(
  file: File
): Promise<{ success: boolean; url?: string; error?: string }> {
  return uploadImageToAssets(file, "posts")
}

// Delete file from public/assets
export async function deleteFileFromAssets(
  fileUrl: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Extract path from URL (remove leading slash)
    const relativePath = fileUrl.startsWith("/") ? fileUrl.slice(1) : fileUrl

    // Validate path starts with assets/
    if (!relativePath.startsWith("assets/")) {
      return {
        success: false,
        error: "Path tidak valid. Harus dimulai dengan /assets/",
      }
    }

    // Construct full path
    const filePath = path.join(PUBLIC_DIR, relativePath)

    // Security check: ensure file is within public directory
    if (!filePath.startsWith(PUBLIC_DIR)) {
      return {
        success: false,
        error: "Akses ditolak: File di luar direktori public",
      }
    }

    // Check if file exists
    if (!existsSync(filePath)) {
      return {
        success: false,
        error: "File tidak ditemukan",
      }
    }

    // Delete file
    await unlink(filePath)

    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal menghapus file",
    }
  }
}

// Generic file upload to any subfolder in assets
export async function uploadFileToAssets(
  file: File,
  subfolder: string = "uploads",
  options?: {
    maxSize?: number // in bytes
    allowedTypes?: string[]
  }
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Validate file type if specified
    if (options?.allowedTypes && !options.allowedTypes.includes(file.type)) {
      return {
        success: false,
        error: "Tipe file tidak didukung.",
      }
    }

    // Check file size
    const maxSize = options?.maxSize || 10 * 1024 * 1024 // Default 10MB
    if (file.size > maxSize) {
      const maxSizeMB = Math.floor(maxSize / (1024 * 1024))
      return {
        success: false,
        error: `Ukuran file harus kurang dari ${maxSizeMB}MB`,
      }
    }

    // Generate unique filename
    const timestamp = Date.now()
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "-")
    const filename = `${timestamp}-${sanitizedName}`

    // Prepare directory - sanitize subfolder path
    const sanitizedSubfolder = subfolder.replace(/[^a-zA-Z0-9/_-]/g, "-")
    const targetDir = path.join(ASSETS_DIR, sanitizedSubfolder)
    await ensureDirectoryExists(targetDir)

    // Write file
    const filePath = path.join(targetDir, filename)
    await writeFile(filePath, buffer)

    // Return public URL
    const url = `/assets/${sanitizedSubfolder}/${filename}`

    return { success: true, url }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal mengunggah file",
    }
  }
}