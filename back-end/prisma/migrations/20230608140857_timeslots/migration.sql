/*
  Warnings:

  - A unique constraint covering the columns `[timeSlotId]` on the table `CourseSemester` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[timeSlotId]` on the table `SeminarGroup` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `credits` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupNumber` to the `SeminarGroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room` to the `SeminarGroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeSlotId` to the `SeminarGroup` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Day" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "credits" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "CourseSemester" ADD COLUMN     "room" TEXT,
ADD COLUMN     "timeSlotId" TEXT;

-- AlterTable
ALTER TABLE "SeminarGroup" ADD COLUMN     "groupNumber" INTEGER NOT NULL,
ADD COLUMN     "room" TEXT NOT NULL,
ADD COLUMN     "timeSlotId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "TimeSlot" (
    "id" TEXT NOT NULL,
    "day" "Day" NOT NULL,
    "startHour" INTEGER NOT NULL,
    "startMinute" INTEGER NOT NULL,
    "endHour" INTEGER NOT NULL,
    "endMinute" INTEGER NOT NULL,

    CONSTRAINT "TimeSlot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CourseSemester_timeSlotId_key" ON "CourseSemester"("timeSlotId");

-- CreateIndex
CREATE UNIQUE INDEX "SeminarGroup_timeSlotId_key" ON "SeminarGroup"("timeSlotId");

-- AddForeignKey
ALTER TABLE "SeminarGroup" ADD CONSTRAINT "SeminarGroup_timeSlotId_fkey" FOREIGN KEY ("timeSlotId") REFERENCES "TimeSlot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseSemester" ADD CONSTRAINT "CourseSemester_timeSlotId_fkey" FOREIGN KEY ("timeSlotId") REFERENCES "TimeSlot"("id") ON DELETE SET NULL ON UPDATE CASCADE;
