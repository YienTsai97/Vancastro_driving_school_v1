/*
  Warnings:

  - Made the column `purchase_id` on table `invoices` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_purchase_id_fkey";

-- AlterTable
ALTER TABLE "invoices" ALTER COLUMN "purchase_id" SET NOT NULL,
ALTER COLUMN "purchase_id" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "lesson_types" ALTER COLUMN "qb_service_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "license_number" DROP NOT NULL,
ALTER COLUMN "license_number" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_purchase_id_fkey" FOREIGN KEY ("purchase_id") REFERENCES "purchases"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
