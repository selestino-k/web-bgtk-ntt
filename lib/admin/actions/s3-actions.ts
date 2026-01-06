"use server"

import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"


// Configure AWS S3 Client
const s3Client = new S3Client({
  region: process.env.AWS_REGION || "ap-southeast-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
})

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME || ""

// Upload image to S3
export async function uploadImageToS3(
  file: File,
  folder: string = "posts"
): Promise<{ success: boolean; url?: string; error?: string }> {
  try { const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Generate unique filename
    const timestamp = Date.now()
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "-")
    const key = `${folder}/${timestamp}-${sanitizedName}`

    // Upload to S3
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: file.type,
      
    })

    await s3Client.send(command)
 // Construct public URL
    const url = `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`

    return { success: true, url }
  } catch (error) {
    console.error("S3 upload error:", error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to upload image" 
    }
  }
}

// Delete image from S3
export async function deleteImageFromS3(
  imageUrl: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Extract key from URL
    const urlParts = imageUrl.split(".amazonaws.com/")
    if (urlParts.length !== 2) {
      throw new Error("Invalid S3 URL")
    }
    
    const key = urlParts[1]

    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    })

    await s3Client.send(command)

    return { success: true }
  } catch (error) {
    console.error("S3 delete error:", error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to delete image" 
    }
  }
}

// Upload document to S3
export async function uploadDocumentToS3(
  file: File,
  folder: string = "documents"
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Validate file type (common document types)
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain',
    ]

    if (!allowedTypes.includes(file.type)) {
      return {
        success: false,
        error: "Tipe file tidak didukung. Harap unggah PDF, Word, Excel, PowerPoint, atau Text file."
      }
    }

    // Check file size (50MB limit for documents)
    if (file.size > 50 * 1024 * 1024) {
      return {
        success: false,
        error: "Ukuran file harus kurang dari 50MB"
      }
    }

    // Generate unique filename
    const timestamp = Date.now()
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "-")
    const key = `${folder}/${timestamp}-${sanitizedName}`

    // Upload to S3
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: file.type,
      ContentDisposition: `attachment; filename="${file.name}"`, // Force download
    })

    await s3Client.send(command)

    // Construct public URL
    const url = `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`

    return { success: true, url }
  } catch (error) {
    console.error("S3 document upload error:", error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Gagal mengunggah dokumen" 
    }
  }
}

// Delete document from S3 (reuse existing function)
export async function deleteDocumentFromS3(
  documentUrl: string
): Promise<{ success: boolean; error?: string }> {
  return deleteImageFromS3(documentUrl) // Same logic as image deletion
}
