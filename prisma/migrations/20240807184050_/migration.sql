-- DropForeignKey
ALTER TABLE "Contributor" DROP CONSTRAINT "Contributor_bountyId_fkey";

-- AlterTable
ALTER TABLE "Contributor" ALTER COLUMN "bountyId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Contributor" ADD CONSTRAINT "Contributor_bountyId_fkey" FOREIGN KEY ("bountyId") REFERENCES "Bounties"("id") ON DELETE SET NULL ON UPDATE CASCADE;
