/*
  Warnings:

  - You are about to drop the column `lesson_Length` on the `LessonType` table. All the data in the column will be lost.
  - Added the required column `lesson_length` to the `LessonType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LessonType" DROP COLUMN "lesson_Length",
ADD COLUMN     "lesson_length" INTEGER NOT NULL;
