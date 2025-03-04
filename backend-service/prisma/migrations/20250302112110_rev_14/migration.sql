/*
  Warnings:

  - The `value` column on the `Config` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Config" DROP COLUMN "value",
ADD COLUMN     "value" TEXT NOT NULL DEFAULT '';
