/*
  Warnings:

  - You are about to drop the column `winnerId` on the `Bounties` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PAID', 'PENDING');

-- AlterTable
ALTER TABLE "Bounties" DROP COLUMN "winnerId";

-- CreateTable
CREATE TABLE "BountyWinner" (
    "id" TEXT NOT NULL,
    "bountyAmount" TEXT NOT NULL,
    "bountyId" TEXT NOT NULL,
    "prNumber" TEXT NOT NULL,
    "prLink" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "winnerSub" TEXT NOT NULL,
    "profileImg" TEXT NOT NULL,
    "walletPrivateKeyShard" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "BountyWinner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BountyWinner_bountyId_key" ON "BountyWinner"("bountyId");

-- AddForeignKey
ALTER TABLE "BountyWinner" ADD CONSTRAINT "BountyWinner_bountyId_fkey" FOREIGN KEY ("bountyId") REFERENCES "Bounties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
