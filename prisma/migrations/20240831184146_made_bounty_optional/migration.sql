-- DropForeignKey
ALTER TABLE "BountyWinner" DROP CONSTRAINT "BountyWinner_bountyId_fkey";

-- AlterTable
ALTER TABLE "BountyWinner" ALTER COLUMN "bountyId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "BountyWinner" ADD CONSTRAINT "BountyWinner_bountyId_fkey" FOREIGN KEY ("bountyId") REFERENCES "Bounties"("id") ON DELETE SET NULL ON UPDATE CASCADE;
