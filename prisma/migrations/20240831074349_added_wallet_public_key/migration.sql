/*
  Warnings:

  - Added the required column `walletPublicKey` to the `BountyWinner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BountyWinner" ADD COLUMN     "walletPublicKey" TEXT NOT NULL;
