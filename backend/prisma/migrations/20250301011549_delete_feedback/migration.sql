/*
  Warnings:

  - You are about to drop the column `comment` on the `feedbacks` table. All the data in the column will be lost.
  - You are about to drop the column `student_feedback` on the `feedbacks` table. All the data in the column will be lost.
  - Added the required column `amount` to the `feedbacks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoiceId` to the `feedbacks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `issue_date` to the `feedbacks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "feedbacks" DROP COLUMN "comment",
DROP COLUMN "student_feedback",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "invoiceId" INTEGER NOT NULL,
ADD COLUMN     "issue_date" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
