/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `guarantorId` on the `Course` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `studentId` on the `CourseStudent` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `studentId` on the `GroupStudent` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `B` on the `_CourseSemesterToUser` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `B` on the `_SeminarGroupToUser` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_guarantorId_fkey";

-- DropForeignKey
ALTER TABLE "CourseStudent" DROP CONSTRAINT "CourseStudent_studentId_fkey";

-- DropForeignKey
ALTER TABLE "GroupStudent" DROP CONSTRAINT "GroupStudent_studentId_fkey";

-- DropForeignKey
ALTER TABLE "_CourseSemesterToUser" DROP CONSTRAINT "_CourseSemesterToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_SeminarGroupToUser" DROP CONSTRAINT "_SeminarGroupToUser_B_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "guarantorId",
ADD COLUMN     "guarantorId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "CourseStudent" DROP COLUMN "studentId",
ADD COLUMN     "studentId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "GroupStudent" DROP COLUMN "studentId",
ADD COLUMN     "studentId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "_CourseSemesterToUser" DROP COLUMN "B",
ADD COLUMN     "B" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "_SeminarGroupToUser" DROP COLUMN "B",
ADD COLUMN     "B" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "_CourseSemesterToUser_AB_unique" ON "_CourseSemesterToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseSemesterToUser_B_index" ON "_CourseSemesterToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SeminarGroupToUser_AB_unique" ON "_SeminarGroupToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SeminarGroupToUser_B_index" ON "_SeminarGroupToUser"("B");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_guarantorId_fkey" FOREIGN KEY ("guarantorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseStudent" ADD CONSTRAINT "CourseStudent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupStudent" ADD CONSTRAINT "GroupStudent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SeminarGroupToUser" ADD CONSTRAINT "_SeminarGroupToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseSemesterToUser" ADD CONSTRAINT "_CourseSemesterToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
