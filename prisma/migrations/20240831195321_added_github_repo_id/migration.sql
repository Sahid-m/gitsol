/*
  Warnings:

  - You are about to drop the column `githubRepo` on the `Bounties` table. All the data in the column will be lost.
  - Added the required column `githubRepoId` to the `Bounties` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bounties" DROP COLUMN "githubRepo",
ADD COLUMN     "githubRepoId" TEXT NOT NULL;
