/*
  Warnings:

  - The values [PENDING,APPROVED,CANCELLED] on the enum `ContractStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `invoice_id` on the `contracts` table. All the data in the column will be lost.
  - You are about to drop the column `package_id` on the `contracts` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `contracts` table. All the data in the column will be lost.
  - You are about to drop the column `license_class` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `packages` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `licenese_class` to the `contracts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `contracts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `licenseClass` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PurchaiseStatus" AS ENUM ('PENDING', 'SENT');

-- CreateEnum
CREATE TYPE "LicenseClass" AS ENUM ('CLASS_4', 'CLASS_5', 'CLASS_7');

-- AlterEnum
BEGIN;
CREATE TYPE "ContractStatus_new" AS ENUM ('ONGOING', 'DONE');
ALTER TABLE "contracts" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "contracts" ALTER COLUMN "status" TYPE "ContractStatus_new" USING ("status"::text::"ContractStatus_new");
ALTER TYPE "ContractStatus" RENAME TO "ContractStatus_old";
ALTER TYPE "ContractStatus_new" RENAME TO "ContractStatus";
DROP TYPE "ContractStatus_old";
ALTER TABLE "contracts" ALTER COLUMN "status" SET DEFAULT 'ONGOING';
COMMIT;

-- AlterTable
ALTER TABLE "contracts" DROP COLUMN "invoice_id",
DROP COLUMN "package_id",
DROP COLUMN "user_id",
ADD COLUMN     "licenese_class" "LicenseClass" NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'ONGOING';

-- AlterTable
ALTER TABLE "users" DROP COLUMN "license_class",
ADD COLUMN     "licenseClass" "LicenseClass" NOT NULL;

-- DropTable
DROP TABLE "packages";

-- CreateTable
CREATE TABLE "Purchaise" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "license_class" "LicenseClass" NOT NULL,
    "status" "PurchaiseStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Purchaise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LessonType" (
    "id" SERIAL NOT NULL,
    "lesson_name" TEXT NOT NULL,
    "license_class" "LicenseClass" NOT NULL,
    "lesson_Length" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "LessonType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchaise" ADD CONSTRAINT "Purchaise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
