/*
  Warnings:

  - You are about to drop the column `icon` on the `SocialLink` table. All the data in the column will be lost.
  - Added the required column `name` to the `SocialLink` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SocialLink" DROP COLUMN "icon",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "name" TEXT NOT NULL;
