'use server';

import prisma from '@/lib/prisma';
import { uploadCarouselImageToS3, deleteCarouselImageFromS3 } from './s3-actions';
import { revalidatePath } from 'next/cache';

export async function getCarouselPhotos() {
  try {
    const carouselPhotos = await prisma.carouselPhoto.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return carouselPhotos;
  } catch  {
    return [];
  }
}

export async function getCarouselPhotoById(id: string) {
  try {
    const carouselPhoto = await prisma.carouselPhoto.findUnique({
      where: { id: parseInt(id) },
    });
    return carouselPhoto;
  } catch  {
    return null;
  }
}

export async function createCarouselPhoto(formData: FormData) {
  try {
    const file = formData.get('file') as File;
    const caption = formData.get('caption') as string | null
    const order = parseInt(formData.get('order') as string);
    const externalUrl = formData.get('externalUrl') as string | null;

    if ((!file && !externalUrl) || isNaN(order)) {
      return { success: false, error: 'Missing required fields' };
    }

    let imageUrl = '';

    // Check if using external URL or file upload
    if (externalUrl) {
      imageUrl = externalUrl;
    } else if (file) {
      // Upload image to S3
      const uploadResult = await uploadCarouselImageToS3(file, 'carousel');

      if (!uploadResult.success || !uploadResult.url) {
        return { success: false, error: uploadResult.error || 'Failed to upload image' };
      }

      imageUrl = uploadResult.url;
    } else {
      return { success: false, error: 'No image provided' };
    }

    // Create photo record in database
    const carouselPhoto = await prisma.carouselPhoto.create({
      data: {
        caption: caption || null,
        order,
        imageUrl,
      },
    });

    revalidatePath('/');
    return { success: true, carouselPhoto };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create photo',
    };
  }
}

export async function updateCarouselPhoto(formData: FormData) {
  try {
    const id = parseInt(formData.get('id') as string);
    const caption = formData.get('caption') as string;
    const order = parseInt(formData.get('order') as string);
    const file = formData.get('file') as File | null;
    const externalUrl = formData.get('externalUrl') as string | null;
    const existingImageUrl = formData.get('existingImageUrl') as string | null;

    if (isNaN(id) || !caption || isNaN(order)) {
      return { success: false, error: 'Missing required fields' };
    }



    // Get existing photo
    const existingPhoto = await prisma.carouselPhoto.findUnique({
      where: { id: id },
    });

    if (!existingPhoto) {
      return { success: false, error: 'Photo not found' };
    }

    let imageUrl = existingPhoto.imageUrl;

    // Handle image update logic
    if (file && file.size > 0) {
      // New file uploaded - upload to S3
      const uploadResult = await uploadCarouselImageToS3(file, 'carousel');

      if (!uploadResult.success || !uploadResult.url) {
        return { success: false, error: uploadResult.error || 'Failed to upload image' };
      }

      // Delete old image from S3 if it's not an external URL
      if (!existingPhoto.imageUrl.startsWith('http://') && !existingPhoto.imageUrl.startsWith('https://')) {
        await deleteCarouselImageFromS3(existingPhoto.imageUrl);
      }
      
      imageUrl = uploadResult.url;
    } else if (externalUrl) {
      // Using external URL - delete old image from S3 if needed
      if (!existingPhoto.imageUrl.startsWith('http://') && !existingPhoto.imageUrl.startsWith('https://')) {
        await deleteCarouselImageFromS3(existingPhoto.imageUrl);
      }
      imageUrl = externalUrl;
    } else if (existingImageUrl) {
      // Keep existing image URL
      imageUrl = existingImageUrl;
    }
    // Update photo record in database
    const carouselPhoto = await prisma.carouselPhoto.update({
      where: { id },
      data: {
        caption: caption || null,
        order,
        imageUrl,
      },
    });
    revalidatePath('/');
    return { success: true, carouselPhoto };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update photo',
    };
  }
}

export async function deleteCarouselPhoto(id: number) {
  try {
    // Get photo to retrieve image URL
    const carouselPhoto = await prisma.carouselPhoto.findUnique({
      where: { id },
    });

    if (!carouselPhoto) {
      return { success: false, error: 'Photo not found' };
    }

    // Delete image from S3
    const deleteResult = await deleteCarouselImageFromS3(carouselPhoto.imageUrl);

    if (!deleteResult.success) {
      return { success: false, error: deleteResult.error };
      // Continue with database deletion even if S3 deletion fails
    }

    // Delete photo record from database
    await prisma.carouselPhoto.delete({
      where: { id },
    });

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete photo',
    };
  }
}

export async function reorderCarouselPhotos(photoIds: number[]) {
  try {
    for (let index = 0; index < photoIds.length; index++) {
      const id = photoIds[index];
      await prisma.carouselPhoto.update({
        where: { id },
        data: { order: index },
      });
    }   
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to reorder photos',
    };
  }
}