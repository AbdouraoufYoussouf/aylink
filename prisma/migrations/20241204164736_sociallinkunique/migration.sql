/*
  Warnings:

  - A unique constraint covering the columns `[userId,name]` on the table `SocialLink` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "SocialLink_userId_name_idx";

-- CreateIndex
CREATE UNIQUE INDEX "SocialLink_userId_name_key" ON "SocialLink"("userId", "name");
