/*
  Warnings:

  - The `state` column on the `Quiz` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "QuizState" AS ENUM ('IN_REVIEW', 'ACTIVE', 'ARCHIVED');

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "state",
ADD COLUMN     "state" "QuizState" NOT NULL DEFAULT E'IN_REVIEW';
