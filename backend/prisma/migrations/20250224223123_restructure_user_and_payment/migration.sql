/*
  Warnings:

  - You are about to drop the column `amount` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `lessonId` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phone]` on the table `user_profiles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `paymentId` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_amount` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `user_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language` to the `user_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `user_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `user_profiles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_userId_fkey";

-- DropIndex
DROP INDEX "users_phone_key";

-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "amount",
DROP COLUMN "lessonId",
DROP COLUMN "userId",
ADD COLUMN     "paymentId" INTEGER NOT NULL,
ADD COLUMN     "total_amount" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "user_profiles" ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "language" TEXT NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'STUDENT';

-- AlterTable
ALTER TABLE "users" DROP COLUMN "first_name",
DROP COLUMN "language",
DROP COLUMN "last_name",
DROP COLUMN "phone",
DROP COLUMN "role";

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_phone_key" ON "user_profiles"("phone");

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
