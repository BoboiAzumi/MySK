/*
  Warnings:

  - You are about to drop the column `from` on the `documents` table. All the data in the column will be lost.
  - Added the required column `by` to the `documents` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "documents" DROP CONSTRAINT "documents_from_fkey";

-- AlterTable
ALTER TABLE "documents" DROP COLUMN "from",
ADD COLUMN     "by" INTEGER NOT NULL,
ADD COLUMN     "userInformationId" INTEGER;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_by_fkey" FOREIGN KEY ("by") REFERENCES "user_informations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_userInformationId_fkey" FOREIGN KEY ("userInformationId") REFERENCES "user_informations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
