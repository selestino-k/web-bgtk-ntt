import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

const validateResourceType = (type: string) => {
  const allowedTypes = ['general'];
  return allowedTypes.includes(type) ? type : 'general';
};

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File;

  const resourceType = ((formData.get('resourceType') as string) || '').trim() || 'general';
  const validatedType = validateResourceType(resourceType);

  if (!file) {
    return Response.json({ error: 'No file uploaded' }, { status: 400 });
  }

  try {
    const timestamp = Date.now();
    const originalName = file.name.replace(/\s+/g, '-').toLowerCase();
    const filename = `${timestamp}-${originalName}`;

    const uploadDir = path.join(process.cwd(), 'public', 'uploads', validatedType);
    await mkdir(uploadDir, { recursive: true });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);

    const imageUrl = `/uploads/${validatedType}/${filename}`;

    return Response.json({
      success: true,
      imageUrl: imageUrl
    });
  } catch (error) {
    console.error('Upload error:', error);
    return Response.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}