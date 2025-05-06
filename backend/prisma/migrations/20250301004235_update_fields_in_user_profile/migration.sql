/*
  Warnings:

  - You are about to drop the column `vehicle_type` on the `user_profiles` table. All the data in the column will be lost.
  - Added the required column `emergency_contact_name` to the `user_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emergency_contact_number` to the `user_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `license_class` to the `user_profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_profiles" DROP COLUMN "vehicle_type",
ADD COLUMN     "emergency_contact_name" TEXT NOT NULL,
ADD COLUMN     "emergency_contact_number" TEXT NOT NULL,
ADD COLUMN     "license_class" TEXT NOT NULL;

-- DropEnum
DROP TYPE "VehicleType";
