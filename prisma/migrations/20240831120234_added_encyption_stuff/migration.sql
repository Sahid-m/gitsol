/*
  Warnings:

  - Added the required column `encryptionIv` to the `BountyWinner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `encryptionKey` to the `BountyWinner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BountyWinner" ADD COLUMN     "claimedAt" TIMESTAMP(3),
ADD COLUMN     "encryptionIv" TEXT NOT NULL,
ADD COLUMN     "encryptionKey" TEXT NOT NULL;
