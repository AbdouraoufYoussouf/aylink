/*
  Warnings:

  - You are about to drop the `SubBlock` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SubBlock" DROP CONSTRAINT "SubBlock_blocId_fkey";

-- DropTable
DROP TABLE "SubBlock";

-- CreateTable
CREATE TABLE "SubBloc" (
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
    "actionType" "VideoActionType",
    "actionFormId" TEXT,
    "actionUrl" TEXT,

    CONSTRAINT "SubBloc_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SubBloc" ADD CONSTRAINT "SubBloc_blocId_fkey" FOREIGN KEY ("blocId") REFERENCES "Bloc"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
