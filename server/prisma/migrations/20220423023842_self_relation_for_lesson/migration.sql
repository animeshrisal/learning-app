/*
  Warnings:

  - A unique constraint covering the columns `[nextId]` on the table `Lesson` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[previousId]` on the table `Lesson` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,order]` on the table `Lesson` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN     "nextId" TEXT,
ADD COLUMN     "previousId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_nextId_key" ON "Lesson"("nextId");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_previousId_key" ON "Lesson"("previousId");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_id_order_key" ON "Lesson"("id", "order");

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_nextId_fkey" FOREIGN KEY ("nextId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_previousId_fkey" FOREIGN KEY ("previousId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;
