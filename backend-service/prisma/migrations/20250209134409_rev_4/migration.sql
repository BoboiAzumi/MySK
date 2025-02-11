/*
  Warnings:

  - You are about to drop the column `userInformationId` on the `documents` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "documents" DROP CONSTRAINT "documents_userInformationId_fkey";

-- AlterTable
ALTER TABLE "documents" DROP COLUMN "userInformationId";
