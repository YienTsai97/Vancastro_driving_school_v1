/*
  Warnings:

  - Added the required column `contractId` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qb_token` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "contractId" INTEGER NOT NULL,
ADD COLUMN     "qb_token" TEXT NOT NULL;
