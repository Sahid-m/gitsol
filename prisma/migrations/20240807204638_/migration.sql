/*
  Warnings:

  - Added the required column `issueId` to the `Bounties` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bounties" ADD COLUMN     "issueId" TEXT NOT NULL;
