/*
  Warnings:

  - You are about to drop the `Block` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "SubBlocType" AS ENUM ('URL', 'IMAGE', 'DOCUMENT', 'VIDEO');

-- DropForeignKey
ALTER TABLE "Block" DROP CONSTRAINT "Block_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_userId_fkey";

-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "message" TEXT,
ADD COLUMN     "tag" TEXT,
ADD COLUMN     "whatsapp" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "oneYearSubscription" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "Block";

-- DropTable
DROP TABLE "Category";

-- CreateTable
CREATE TABLE "Bloc" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Bloc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubBlock" (
    "id" TEXT NOT NULL,
    "type" "SubBlocType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isPrivate" BOOLEAN NOT NULL DEFAULT false,
    "isDisplay" BOOLEAN NOT NULL DEFAULT true,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "visitCount" INTEGER NOT NULL DEFAULT 0,
    "blocId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "url" TEXT,
    "imageUrl" TEXT,
    "altText" TEXT,
    "documentUrl" TEXT,
    "fileType" TEXT,
    "fileSize" INTEGER,
    "videoUrl" TEXT,
    "thumbnailUrl" TEXT,
    "duration" INTEGER,
    "embedCode" TEXT,

    CONSTRAINT "SubBlock_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bloc" ADD CONSTRAINT "Bloc_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubBlock" ADD CONSTRAINT "SubBlock_blocId_fkey" FOREIGN KEY ("blocId") REFERENCES "Bloc"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
