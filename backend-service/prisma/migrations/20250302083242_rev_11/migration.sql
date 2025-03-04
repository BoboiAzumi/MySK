/*
  Warnings:

  - Added the required column `academic_year` to the `documents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semester` to the `documents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "documents" ADD COLUMN     "academic_year" TEXT NOT NULL,
ADD COLUMN     "semester" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Config" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Config_pkey" PRIMARY KEY ("id")
);
