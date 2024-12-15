/* eslint-disable react/no-unescaped-entities */


'use server'

import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { v4 as uuidv4 } from 'uuid';
import { revalidatePath } from 'next/cache';
import { currentUser } from '@/lib/auth-utils';
import { db } from '@/lib/db';

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

    // Store asset information in the database
    if (result.Location) {
      await db.asset.create({
        data: {
          userId: user.id,
          fileName: file.name,
          fileType: file.type,
          fileSize: buffer.length,
          s3Key: dir + key,
          s3Url: result.Location,
        },
      });
    }

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

    // Fetch the asset from the database
    const asset = await db.asset.findUnique({
      where: { s3Url: assetId },
    });

    if (!asset) {
      throw new Error('Asset not found');
    }
    // Delete the file from S3
    const deleteParams = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: asset.s3Key,
    };

    await s3.send(new DeleteObjectCommand(deleteParams));
    // Delete the asset record from the database
    await db.asset.delete({
      where: { id: assetId },
    });
    console.log('File deleted successfully');
    return { success: true, message: 'File deleted successfully' };
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
}