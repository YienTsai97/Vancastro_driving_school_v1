/*
  Warnings:

  - You are about to drop the column `qb_token` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "qb_token",
ADD COLUMN     "qb_access_token" TEXT,
ADD COLUMN     "qb_access_token_expires_at" TIMESTAMP(3),
ADD COLUMN     "qb_refresh_token" TEXT,
ADD COLUMN     "qb_refresh_token_expires_at" TIMESTAMP(3);
