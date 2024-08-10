/*
  Warnings:

  - You are about to drop the column `bountyId` on the `Contributor` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Contributor" DROP CONSTRAINT "Contributor_bountyId_fkey";

-- AlterTable
ALTER TABLE "Contributor" DROP COLUMN "bountyId";

-- CreateTable
CREATE TABLE "_BountyContributors" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BountyContributors_AB_unique" ON "_BountyContributors"("A", "B");

-- CreateIndex
CREATE INDEX "_BountyContributors_B_index" ON "_BountyContributors"("B");

-- AddForeignKey
ALTER TABLE "_BountyContributors" ADD CONSTRAINT "_BountyContributors_A_fkey" FOREIGN KEY ("A") REFERENCES "Bounties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BountyContributors" ADD CONSTRAINT "_BountyContributors_B_fkey" FOREIGN KEY ("B") REFERENCES "Contributor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
