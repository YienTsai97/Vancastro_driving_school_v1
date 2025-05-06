/*
  Warnings:

  - You are about to drop the `_payer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_payer" DROP CONSTRAINT "_payer_A_fkey";

-- DropForeignKey
ALTER TABLE "_payer" DROP CONSTRAINT "_payer_B_fkey";

-- DropTable
DROP TABLE "_payer";

-- AddForeignKey
ALTER TABLE "payers" ADD CONSTRAINT "payers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
