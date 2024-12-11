/* eslint-disable react/no-unescaped-entities */


'use server'

import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { v4 as uuidv4 } from 'uuid';
import { revalidatePath } from 'next/cache';
import { currentUser } from '@/lib/auth-utils';

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function uploadFileAws(file: File, dir: string) {
  const user = await currentUser();
  if (!user) {
    throw new Error('User not authenticated');
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const key = `${user.id}/${uuidv4().slice(0, 7)}-${file.name}`;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: dir + key,
    Body: buffer,
    ContentType: file.type,
  };

  try {
    const uploader = new Upload({
      client: s3,
      params: params,
    });

    const result = await uploader.done();
    console.log('File uploaded successfully');

    revalidatePath('/dashboard');
    return result.Location;
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    throw error;
  }
}

export async function deleteFileAws(assetId: string) {
  const user = await currentUser();
  if (!user) {
    throw new Error('User not authenticated');
  }

  try {
    // Delete the file from S3
    const deleteParams = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: assetId,
    };

    await s3.send(new DeleteObjectCommand(deleteParams));

    console.log('File deleted successfully');
    return { success: true, message: 'File deleted successfully' };
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
}