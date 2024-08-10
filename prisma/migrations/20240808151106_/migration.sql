/*
  Warnings:

  - Added the required column `completed` to the `Bounties` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bounties" ADD COLUMN     "completed" BOOLEAN NOT NULL;
