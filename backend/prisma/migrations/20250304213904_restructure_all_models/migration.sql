/*
  Warnings:

  - The values [UNREQUESTED,RESCHEDULED,COMPLETED] on the enum `LessonStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `lessonId` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `user_profiles` table. All the data in the column will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[clerkId]` on the table `user_profiles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `invoiceId` to the `lessons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clerkId` to the `user_profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LessonStatus_new" AS ENUM ('PENDING', 'APPROVED', 'CANCELLED');
ALTER TABLE "lessons" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "lessons" ALTER COLUMN "status" TYPE "LessonStatus_new" USING ("status"::text::"LessonStatus_new");
ALTER TYPE "LessonStatus" RENAME TO "LessonStatus_old";
ALTER TYPE "LessonStatus_new" RENAME TO "LessonStatus";
DROP TYPE "LessonStatus_old";
ALTER TABLE "lessons" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_userId_fkey";

-- DropForeignKey
ALTER TABLE "lessons" DROP CONSTRAINT "lessons_instructorId_fkey";

-- DropForeignKey
ALTER TABLE "lessons" DROP CONSTRAINT "lessons_studentId_fkey";

-- DropForeignKey
ALTER TABLE "user_profiles" DROP CONSTRAINT "user_profiles_userId_fkey";

-- DropIndex
DROP INDEX "user_profiles_userId_key";

-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "lessonId";

-- AlterTable
ALTER TABLE "lessons" ADD COLUMN     "invoiceId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "user_profiles" DROP COLUMN "userId",
ADD COLUMN     "clerkId" TEXT NOT NULL;

-- DropTable
DROP TABLE "users";

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_clerkId_key" ON "user_profiles"("clerkId");

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "user_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "user_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
