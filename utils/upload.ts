import { promises as fs } from 'fs';
import path from 'path';

const assetsFolder = path.join(process.cwd(), 'public', 'assets');

// Ensure assets folder exists
async function ensureAssetsFolder(): Promise<void> {
  try {
    await fs.access(assetsFolder);
  } catch {
    await fs.mkdir(assetsFolder, { recursive: true });
  }
}

// Upload file to local assets folder
export async function uploadFileToAssets(
  file: Buffer,
  fileName: string,
): Promise<string> {
  try {
    // Ensure the assets folder exists
    await ensureAssetsFolder();

    // Sanitize filename to prevent directory traversal
    const sanitizedFileName = path.basename(fileName);
    const filePath = path.join(assetsFolder, sanitizedFileName);

    // Write file to disk
    await fs.writeFile(filePath, file);

    // Return the public URL path
    return `/assets/${sanitizedFileName}`;
  } catch (error) {
    console.error('Local Upload Error:', error);
    throw new Error('Failed to upload to local assets');
  }
}

// Get file from assets folder
export async function getFileFromAssets(fileName: string): Promise<Buffer> {
  try {
    const sanitizedFileName = path.basename(fileName);
    const filePath = path.join(assetsFolder, sanitizedFileName);
    
    return await fs.readFile(filePath);
  } catch (error) {
    console.error('Local File Read Error:', error);
    throw new Error('Failed to read file from assets');
  }
}

// Delete file from assets folder
export async function deleteFileFromAssets(fileName: string): Promise<void> {
  try {
    const sanitizedFileName = path.basename(fileName);
    const filePath = path.join(assetsFolder, sanitizedFileName);
    
    await fs.unlink(filePath);
  } catch (error) {
    console.error('Local File Delete Error:', error);
    throw new Error('Failed to delete file from assets');
  }
}

// Check if file exists in assets folder
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