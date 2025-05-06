/*
  Warnings:

  - You are about to drop the column `payer_id` on the `invoices` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_payer_id_fkey";

-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "payer_id";

-- AlterTable
ALTER TABLE "purchases" ADD COLUMN     "payer_id" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_payer_id_fkey" FOREIGN KEY ("payer_id") REFERENCES "payers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
