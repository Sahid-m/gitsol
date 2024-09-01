/*
  Warnings:

  - Added the required column `winnerToken` to the `BountyWinner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BountyWinner" ADD COLUMN     "winnerToken" TEXT NOT NULL;
