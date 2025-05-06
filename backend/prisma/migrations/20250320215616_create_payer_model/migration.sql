/*
  Warnings:

  - You are about to drop the column `customer_ids` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "customer_ids",
ADD COLUMN     "payer_ids" INTEGER[];

-- CreateTable
CREATE TABLE "Payer" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "qb_customer_id" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_payer" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_payer_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_payer_B_index" ON "_payer"("B");

-- AddForeignKey
ALTER TABLE "_payer" ADD CONSTRAINT "_payer_A_fkey" FOREIGN KEY ("A") REFERENCES "Payer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_payer" ADD CONSTRAINT "_payer_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
