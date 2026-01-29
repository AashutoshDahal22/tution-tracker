/*
  Warnings:

  - You are about to drop the column `subject` on the `Student` table. All the data in the column will be lost.
  - Added the required column `subjectId` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "subject",
ADD COLUMN     "subjectId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Subject" (
    "id" TEXT NOT NULL,
    "subjectName" TEXT NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subject_subjectName_key" ON "Subject"("subjectName");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
