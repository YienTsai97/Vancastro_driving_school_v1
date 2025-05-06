/*
  Warnings:

  - You are about to drop the column `invoice_number` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `issue_date` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `payer_name` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `qb_customer_id` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `total_amount` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `invoiceId` on the `lessons` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `lessons` table. All the data in the column will be lost.
  - Added the required column `qb_invoice_id` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoice_id` to the `lessons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qb_service_id` to the `lessons` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "lessons" DROP CONSTRAINT "lessons_invoiceId_fkey";

-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "invoice_number",
DROP COLUMN "issue_date",
DROP COLUMN "payer_name",
DROP COLUMN "qb_customer_id",
DROP COLUMN "total_amount",
ADD COLUMN     "qb_invoice_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "lessons" DROP COLUMN "invoiceId",
DROP COLUMN "price",
ADD COLUMN     "invoice_id" INTEGER NOT NULL,
ADD COLUMN     "qb_service_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user_profiles" ADD COLUMN     "qb_customer_ids" TEXT[];

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
