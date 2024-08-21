/*
  Warnings:

  - Made the column `issueName` on table `Bounties` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Bounties" ADD COLUMN     "githubRepoName" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "issueDescription" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "issueName" SET NOT NULL,
ALTER COLUMN "issueLink" SET DEFAULT '';
