/*
  Warnings:

  - The `value` column on the `Config` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `semester` column on the `documents` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Semester" AS ENUM ('Ganjil', 'Genap');

-- AlterTable
ALTER TABLE "Config" DROP COLUMN "value",
ADD COLUMN     "value" "Semester" NOT NULL DEFAULT 'Ganjil';

-- AlterTable
ALTER TABLE "documents" DROP COLUMN "semester",
ADD COLUMN     "semester" "Semester" NOT NULL DEFAULT 'Ganjil';
