/*
  Warnings:

  - Added the required column `bountyAmount` to the `Bounties` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bounties" ADD COLUMN     "bountyAmount" TEXT NOT NULL;
