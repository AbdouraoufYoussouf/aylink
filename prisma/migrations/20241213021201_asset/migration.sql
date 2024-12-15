/*
  Warnings:

  - A unique constraint covering the columns `[s3Url]` on the table `Asset` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Asset_s3Url_key" ON "Asset"("s3Url");
