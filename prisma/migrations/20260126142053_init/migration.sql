/*
  Warnings:

  - You are about to drop the column `name` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `locationId` on the `TuitionSession` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[locationName]` on the table `Location` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `locationName` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Made the column `subject` on table `Student` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "TuitionSession" DROP CONSTRAINT "TuitionSession_locationId_fkey";

-- DropIndex
DROP INDEX "Location_name_key";

-- DropIndex
DROP INDEX "TuitionSession_locationId_idx";

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "name",
ADD COLUMN     "locationName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "createdAt",
ADD COLUMN     "locationId" TEXT NOT NULL,
ALTER COLUMN "subject" SET NOT NULL;

-- AlterTable
ALTER TABLE "TuitionSession" DROP COLUMN "locationId";

-- CreateIndex
CREATE UNIQUE INDEX "Location_locationName_key" ON "Location"("locationName");

-- CreateIndex
CREATE INDEX "Student_locationId_idx" ON "Student"("locationId");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;
