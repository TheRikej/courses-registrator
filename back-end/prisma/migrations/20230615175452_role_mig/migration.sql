/*
  Warnings:

  - You are about to drop the column `salt` on the `User` table. All the data in the column will be lost.
  - Added the required column `guarantorId` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `administrator` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacher` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "guarantorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "salt",
ADD COLUMN     "administrator" BOOLEAN NOT NULL,
ADD COLUMN     "student" BOOLEAN NOT NULL,
ADD COLUMN     "teacher" BOOLEAN NOT NULL;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_guarantorId_fkey" FOREIGN KEY ("guarantorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
