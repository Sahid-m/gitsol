/*
  Warnings:

  - A unique constraint covering the columns `[bountyId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bountyId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bountyId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Bounties" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "issueNumber" TEXT NOT NULL,
    "githubRepo" TEXT NOT NULL,

    CONSTRAINT "Bounties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contributor" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "solPublicKey" TEXT NOT NULL,
    "bountyId" TEXT NOT NULL,

    CONSTRAINT "Contributor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_bountyId_key" ON "User"("bountyId");

-- AddForeignKey
ALTER TABLE "Bounties" ADD CONSTRAINT "Bounties_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contributor" ADD CONSTRAINT "Contributor_bountyId_fkey" FOREIGN KEY ("bountyId") REFERENCES "Bounties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
