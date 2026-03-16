'use server';

import { db } from '@/lib/db/db';
import { carouselPhoto } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { uploadCarouselImageToAssets, deleteCarouselImageFromAssets } from './file-actions';
import { revalidatePath } from 'next/cache';

export async function getCarouselPhotos() {
  try {
    const carouselPhotos = await db
      .select()
      .from(carouselPhoto)
      .orderBy(carouselPhoto.createdAt);
    return carouselPhotos;
  } catch {
    return [];
  }
}

export async function getCarouselPhotoById(id: string) {
  try {
    const [photo] = await db
      .select()
      .from(carouselPhoto)
      .where(eq(carouselPhoto.id, Number(id)));
    return photo ?? null;
  } catch {
    return null;
  }
}

export async function createCarouselPhoto(formData: FormData) {
  try {
    const file = formData.get('file') as File;
    const caption = formData.get('caption') as string | null;
    const order = parseInt(formData.get('order') as string);
    const externalUrl = formData.get('externalUrl') as string | null;

    if ((!file && !externalUrl) || isNaN(order)) {
      return { success: false, error: 'Missing required fields' };
    }

    let imageUrl = '';

    if (externalUrl) {
      imageUrl = externalUrl;
    } else if (file) {
      const uploadResult = await uploadCarouselImageToAssets(file);

      if (!uploadResult.success || !uploadResult.url) {
        return { success: false, error: uploadResult.error || 'Failed to upload image' };
      }

      imageUrl = uploadResult.url;
    } else {
      return { success: false, error: 'No image provided' };
    }

    const [photo] = await db
      .insert(carouselPhoto)
      .values({
        caption: caption || null,
        order,
        imageUrl,
      })
      .returning();

    revalidatePath('/');
    return { success: true, carouselPhoto: photo };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create photo',
    };
  }
}

export async function updateCarouselPhoto(formData: FormData) {
  try {
    const id = Number(formData.get('id') as string);
    const caption = formData.get('caption') as string;
    const order = parseInt(formData.get('order') as string);
    const file = formData.get('file') as File | null;
    const externalUrl = formData.get('externalUrl') as string | null;
    const existingImageUrl = formData.get('existingImageUrl') as string | null;

    if (!id || !caption || isNaN(order)) {
      return { success: false, error: 'Missing required fields' };
    }

    const [existingPhoto] = await db
      .select()
      .from(carouselPhoto)
      .where(eq(carouselPhoto.id, id));

    if (!existingPhoto) {
      return { success: false, error: 'Photo not found' };
    }

    let imageUrl = existingPhoto.imageUrl;

    if (file && file.size > 0) {
      const uploadResult = await uploadCarouselImageToAssets(file);

      if (!uploadResult.success || !uploadResult.url) {
        return { success: false, error: uploadResult.error || 'Failed to upload image' };
      }

      if (!existingPhoto.imageUrl.startsWith('http://') && !existingPhoto.imageUrl.startsWith('https://')) {
        await deleteCarouselImageFromAssets(existingPhoto.imageUrl);
      }

      imageUrl = uploadResult.url;
    } else if (externalUrl) {
      if (!existingPhoto.imageUrl.startsWith('http://') && !existingPhoto.imageUrl.startsWith('https://')) {
        await deleteCarouselImageFromAssets(existingPhoto.imageUrl);
      }
      imageUrl = externalUrl;
    } else if (existingImageUrl) {
      imageUrl = existingImageUrl;
    }

    const [updatedPhoto] = await db
      .update(carouselPhoto)
      .set({
        caption: caption || null,
        order,
        imageUrl,
      })
      .where(eq(carouselPhoto.id, id))
      .returning();

    revalidatePath('/');
    return { success: true, carouselPhoto: updatedPhoto };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update photo',
    };
  }
}

export async function deleteCarouselPhoto(id: number) {
  try {
    const [photo] = await db
      .select()
      .from(carouselPhoto)
      .where(eq(carouselPhoto.id, id));

    if (!photo) {
      return { success: false, error: 'Photo not found' };
    }

    const deleteResult = await deleteCarouselImageFromAssets(photo.imageUrl);

    if (!deleteResult.success) {
      return { success: false, error: deleteResult.error };
    }

    await db.delete(carouselPhoto).where(eq(carouselPhoto.id, id));

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
      await db
        .update(carouselPhoto)
        .set({ order: index })
        .where(eq(carouselPhoto.id, id));
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