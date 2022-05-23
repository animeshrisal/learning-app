/*
  Warnings:

  - A unique constraint covering the columns `[nextId]` on the table `Question` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[previousId]` on the table `Question` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "nextId" TEXT,
ADD COLUMN     "previousId" TEXT;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_nextId_fkey" FOREIGN KEY ("nextId") REFERENCES "Question"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_previousId_fkey" FOREIGN KEY ("previousId") REFERENCES "Question"("id") ON DELETE SET NULL ON UPDATE CASCADE;
