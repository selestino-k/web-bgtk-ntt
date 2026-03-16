import { promises as fs } from 'fs';
import path from 'path';

const assetsFolder = path.join(process.cwd(), 'public', 'assets');

async function ensureAssetsFolder(): Promise<void> {
  try {
    await fs.access(assetsFolder);
  } catch {
    await fs.mkdir(assetsFolder, { recursive: true });
  }
}

export async function uploadFileToAssets(
  file: Buffer,
  fileName: string,
): Promise<string> {
  try {
    await ensureAssetsFolder();

    const sanitizedFileName = path.basename(fileName);
    const filePath = path.join(assetsFolder, sanitizedFileName);

    await fs.writeFile(filePath, file);

    return `/assets/${sanitizedFileName}`;
  } catch (error) {
    throw new Error('Failed to upload to local assets');
  }
}

export async function getFileFromAssets(fileName: string): Promise<Buffer> {
  try {
    const sanitizedFileName = path.basename(fileName);
    const filePath = path.join(assetsFolder, sanitizedFileName);
    
    return await fs.readFile(filePath);
  } catch (error) {
    throw new Error('Failed to read file from assets');
  }
}

export async function deleteFileFromAssets(fileName: string): Promise<void> {
  try {
    const sanitizedFileName = path.basename(fileName);
    const filePath = path.join(assetsFolder, sanitizedFileName);
    
    await fs.unlink(filePath);
  } catch (error) {
    throw new Error('Failed to delete file from assets');
  }
}

export async function fileExistsInAssets(fileName: string): Promise<boolean> {
  try {
    const sanitizedFileName = path.basename(fileName);
    const filePath = path.join(assetsFolder, sanitizedFileName);
    
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}