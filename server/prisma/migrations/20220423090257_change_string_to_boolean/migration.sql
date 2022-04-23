/*
  Warnings:

  - The `activeStatus` column on the `Classroom` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Classroom" DROP COLUMN "activeStatus",
ADD COLUMN     "activeStatus" BOOLEAN NOT NULL DEFAULT true;
