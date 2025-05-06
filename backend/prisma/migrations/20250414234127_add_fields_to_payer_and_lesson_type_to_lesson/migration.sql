/*
  Warnings:

  - You are about to drop the column `qb_service_id` on the `lessons` table. All the data in the column will be lost.
  - You are about to drop the column `display_name` on the `payers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "lessons" DROP COLUMN "qb_service_id",
ADD COLUMN     "lesson_type_id" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "payers" DROP COLUMN "display_name",
ADD COLUMN     "city" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "country" TEXT NOT NULL DEFAULT 'Canada',
ADD COLUMN     "email" TEXT,
ADD COLUMN     "first_name" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "last_name" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "postal_code" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "province" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "street_address" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "unit_number" TEXT;

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_lesson_type_id_fkey" FOREIGN KEY ("lesson_type_id") REFERENCES "lesson_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
