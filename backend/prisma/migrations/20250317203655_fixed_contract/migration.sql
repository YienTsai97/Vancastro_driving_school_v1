/*
  Warnings:

  - You are about to drop the column `licenese_class` on the `contracts` table. All the data in the column will be lost.
  - You are about to drop the column `license_class` on the `lessonType` table. All the data in the column will be lost.
  - You are about to drop the column `license_class` on the `purchase` table. All the data in the column will be lost.
  - You are about to drop the column `contractId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `Travel_Time` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `licenseClass` to the `contracts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `licenseClass` to the `lessonType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `licenseClass` to the `purchase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contracts" DROP COLUMN "licenese_class",
ADD COLUMN     "licenseClass" "LicenseClass" NOT NULL;

-- AlterTable
ALTER TABLE "lessonType" DROP COLUMN "license_class",
ADD COLUMN     "licenseClass" "LicenseClass" NOT NULL;

-- AlterTable
ALTER TABLE "purchase" DROP COLUMN "license_class",
ADD COLUMN     "licenseClass" "LicenseClass" NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "contractId",
ADD COLUMN     "userContract" INTEGER;

-- DropTable
DROP TABLE "Travel_Time";

-- CreateTable
CREATE TABLE "travelTime" (
    "id" SERIAL NOT NULL,
    "location_1" TEXT NOT NULL,
    "location_2" TEXT NOT NULL,
    "duration_minutes" INTEGER NOT NULL,

    CONSTRAINT "travelTime_pkey" PRIMARY KEY ("id")
);
