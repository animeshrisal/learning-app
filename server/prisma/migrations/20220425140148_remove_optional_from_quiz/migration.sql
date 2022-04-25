/*
  Warnings:

  - Made the column `classroomId` on table `Quiz` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_classroomId_fkey";

-- AlterTable
ALTER TABLE "Quiz" ALTER COLUMN "classroomId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "Classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
