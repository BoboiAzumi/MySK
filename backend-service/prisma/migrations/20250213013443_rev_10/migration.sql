/*
  Warnings:

  - Added the required column `document_type` to the `documents` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('Pengajaran', 'Penelitian', 'Pengabdian', 'Penunjang');

-- AlterTable
ALTER TABLE "documents" ADD COLUMN     "document_type" "DocumentType" NOT NULL;
