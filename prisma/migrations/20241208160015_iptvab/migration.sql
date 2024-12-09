/*
  Warnings:

  - You are about to drop the column `oneYearSubscription` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "oneYearSubscription" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "oneYearSubscription";
