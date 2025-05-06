/*
  Warnings:

  - You are about to drop the `purchaise` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "purchaise" DROP CONSTRAINT "purchaise_lesson_type_id_fkey";

-- DropForeignKey
ALTER TABLE "purchaise" DROP CONSTRAINT "purchaise_userId_fkey";

-- DropTable
DROP TABLE "purchaise";

-- CreateTable
CREATE TABLE "purchase" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "license_class" "LicenseClass" NOT NULL,
    "lesson_type_id" INTEGER NOT NULL,
    "status" "PurchaiseStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "purchase_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "purchase" ADD CONSTRAINT "purchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase" ADD CONSTRAINT "purchase_lesson_type_id_fkey" FOREIGN KEY ("lesson_type_id") REFERENCES "lessonType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
