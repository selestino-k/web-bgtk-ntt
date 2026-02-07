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

// Replace/Update image in assets folder
export async function replaceImageInAssets(
  oldImageUrl: string,
  newFile: File,
  subfolder: string = "images"
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    // First, delete the old image
    const deleteResult = await deleteFileFromAssets(oldImageUrl)
    if (!deleteResult.success) {
      return {
        success: false,
        error: `Gagal menghapus gambar lama: ${deleteResult.error}`,
      }
    }

    // Then upload the new image
    const uploadResult = await uploadImageToAssets(newFile, subfolder)
    if (!uploadResult.success) {
      return {
        success: false,
        error: `Gagal mengunggah gambar baru: ${uploadResult.error}`,
      }
    }

    return {
      success: true,
      url: uploadResult.url,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal mengganti gambar",
    }
  }
}

// Replace/Update document in assets folder
export async function replaceDocumentInAssets(
  oldDocumentUrl: string,
  newFile: File,
  subfolder: string = "documents"
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    // First, delete the old document
    const deleteResult = await deleteFileFromAssets(oldDocumentUrl)
    if (!deleteResult.success) {
      return {
        success: false,
        error: `Gagal menghapus dokumen lama: ${deleteResult.error}`,
      }
    }

    // Then upload the new document
    const uploadResult = await uploadDocumentToAssets(newFile, subfolder)
    if (!uploadResult.success) {
      return {
        success: false,
        error: `Gagal mengunggah dokumen baru: ${uploadResult.error}`,
      }
    }

    return {
      success: true,
      url: uploadResult.url,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal mengganti dokumen",
    }
  }
}

// Replace carousel image in assets folder
export async function replaceCarouselImageInAssets(
  oldImageUrl: string,
  newFile: File
): Promise<{ success: boolean; url?: string; error?: string }> {
  return replaceImageInAssets(oldImageUrl, newFile, "carousel")
}

// Replace post image in assets folder
export async function replacePostImageInAssets(
  oldImageUrl: string,
  newFile: File
): Promise<{ success: boolean; url?: string; error?: string }> {
  return replaceImageInAssets(oldImageUrl, newFile, "posts")
}

// Delete carousel image from assets
export async function deleteCarouselImageFromAssets(
  imageUrl: string
): Promise<{ success: boolean; error?: string }> {
  return deleteFileFromAssets(imageUrl)
}

// Delete post image from assets
export async function deletePostImageFromAssets(
  imageUrl: string
): Promise<{ success: boolean; error?: string }> {
  return deleteFileFromAssets(imageUrl)
}

// Delete document from assets
export async function deleteDocumentFromAssets(
  documentUrl: string
): Promise<{ success: boolean; error?: string }> {
  return deleteFileFromAssets(documentUrl)
}

// Generic replace file function
export async function replaceFileInAssets(
  oldFileUrl: string,
  newFile: File,
  subfolder: string = "uploads",
  options?: {
    maxSize?: number
    allowedTypes?: string[]
  }
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    // First, delete the old file
    const deleteResult = await deleteFileFromAssets(oldFileUrl)
    if (!deleteResult.success) {
      return {
        success: false,
        error: `Gagal menghapus file lama: ${deleteResult.error}`,
      }
    }

    // Then upload the new file
    const uploadResult = await uploadFileToAssets(newFile, subfolder, options)
    if (!uploadResult.success) {
      return {
        success: false,
        error: `Gagal mengunggah file baru: ${uploadResult.error}`,
      }
    }

    return {
      success: true,
      url: uploadResult.url,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Gagal mengganti file",
    }
  }
}