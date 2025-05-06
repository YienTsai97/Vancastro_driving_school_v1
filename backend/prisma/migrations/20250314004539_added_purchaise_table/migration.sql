/*
  Warnings:

  - You are about to drop the `LessonType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Purchaise` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Purchaise" DROP CONSTRAINT "Purchaise_userId_fkey";

-- DropTable
DROP TABLE "LessonType";

-- DropTable
DROP TABLE "Purchaise";

-- CreateTable
CREATE TABLE "purchaise" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "license_class" "LicenseClass" NOT NULL,
    "lesson_type_id" INTEGER NOT NULL,
    "status" "PurchaiseStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "purchaise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lessonType" (
    "id" SERIAL NOT NULL,
    "lesson_name" TEXT NOT NULL,
    "license_class" "LicenseClass" NOT NULL,
    "lesson_length" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "lessonType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Travel_Time" (
    "id" SERIAL NOT NULL,
    "location_1" TEXT NOT NULL,
    "location_2" TEXT NOT NULL,
    "duration_minute" INTEGER NOT NULL,

    CONSTRAINT "Travel_Time_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "purchaise" ADD CONSTRAINT "purchaise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchaise" ADD CONSTRAINT "purchaise_lesson_type_id_fkey" FOREIGN KEY ("lesson_type_id") REFERENCES "lessonType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
