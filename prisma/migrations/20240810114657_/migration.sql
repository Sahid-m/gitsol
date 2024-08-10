-- AlterTable
ALTER TABLE "Contributor" ADD COLUMN     "bountiesWonId" TEXT[] DEFAULT ARRAY[]::TEXT[];
