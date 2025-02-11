/*
  Warnings:

  - You are about to drop the column `documentId` on the `files` table. All the data in the column will be lost.
  - Added the required column `document_id` to the `files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileName` to the `files` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "files" DROP CONSTRAINT "files_documentId_fkey";

-- AlterTable
ALTER TABLE "files" DROP COLUMN "documentId",
ADD COLUMN     "document_id" INTEGER NOT NULL,
ADD COLUMN     "fileName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "documents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
