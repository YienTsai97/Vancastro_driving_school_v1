-- CreateEnum
CREATE TYPE "ContractStatus" AS ENUM ('PENDING', 'APPROVED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PackageClass" AS ENUM ('CLASS_5', 'CLASS_7', 'CLASS_4');

-- CreateTable
CREATE TABLE "contracts" (
    "id" SERIAL NOT NULL,
    "invoice_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "package_id" INTEGER NOT NULL,
    "status" "ContractStatus" NOT NULL DEFAULT 'PENDING',
    "signature" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contracts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "packages" (
    "id" SERIAL NOT NULL,
    "class" "PackageClass" NOT NULL DEFAULT 'CLASS_5',
    "price" INTEGER NOT NULL,
    "course_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "packages_pkey" PRIMARY KEY ("id")
);
