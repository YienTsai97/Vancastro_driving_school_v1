/*
  Warnings:

  - The values [SCHEDULED] on the enum `LessonStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `lessonId` on the `feedbacks` table. All the data in the column will be lost.
  - You are about to drop the column `end` on the `lessons` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `lessons` table. All the data in the column will be lost.
  - You are about to drop the column `start` on the `lessons` table. All the data in the column will be lost.
  - Added the required column `end_time` to the `lessons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `lessons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `lessons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LessonStatus_new" AS ENUM ('UNREQUESTED', 'PENDING', 'APPROVED', 'RESCHEDULED', 'COMPLETED', 'CANCELLED');
ALTER TABLE "lessons" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "lessons" ALTER COLUMN "status" TYPE "LessonStatus_new" USING ("status"::text::"LessonStatus_new");
ALTER TYPE "LessonStatus" RENAME TO "LessonStatus_old";
ALTER TYPE "LessonStatus_new" RENAME TO "LessonStatus";
DROP TYPE "LessonStatus_old";
ALTER TABLE "lessons" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- DropForeignKey
ALTER TABLE "feedbacks" DROP CONSTRAINT "feedbacks_lessonId_fkey";

-- AlterTable
ALTER TABLE "feedbacks" DROP COLUMN "lessonId";

-- AlterTable
ALTER TABLE "lessons" DROP COLUMN "end",
DROP COLUMN "notes",
DROP COLUMN "start",
ADD COLUMN     "end_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "start_time" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'PENDING';
