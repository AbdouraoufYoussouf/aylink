-- CreateEnum
CREATE TYPE "VideoActionType" AS ENUM ('URL', 'FORM');

-- AlterTable
ALTER TABLE "SubBlock" ADD COLUMN     "actionFormId" TEXT,
ADD COLUMN     "actionType" "VideoActionType",
ADD COLUMN     "actionUrl" TEXT;
