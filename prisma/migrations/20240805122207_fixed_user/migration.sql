-- DropIndex
DROP INDEX "User_bountyId_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "bountyId" DROP NOT NULL;
