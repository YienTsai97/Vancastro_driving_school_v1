-- AlterEnum
ALTER TYPE "LicenseClass" ADD VALUE 'NO_LICENSE';

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "license_number" SET DEFAULT 0;
