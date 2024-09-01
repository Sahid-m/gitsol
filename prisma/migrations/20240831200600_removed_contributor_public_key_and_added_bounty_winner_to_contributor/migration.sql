/*
  Warnings:

  - You are about to drop the column `bountiesWonId` on the `Contributor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[contributorId]` on the table `BountyWinner` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "BountyWinner" ADD COLUMN     "contributorId" TEXT,
ALTER COLUMN "status" SET DEFAULT 'PAID';

-- AlterTable
ALTER TABLE "Contributor" DROP COLUMN "bountiesWonId";

-- CreateIndex
CREATE UNIQUE INDEX "BountyWinner_contributorId_key" ON "BountyWinner"("contributorId");

-- AddForeignKey
ALTER TABLE "BountyWinner" ADD CONSTRAINT "BountyWinner_contributorId_fkey" FOREIGN KEY ("contributorId") REFERENCES "Contributor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
