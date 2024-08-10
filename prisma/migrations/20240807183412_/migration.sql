/*
  Warnings:

  - A unique constraint covering the columns `[sub]` on the table `Contributor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sub` to the `Contributor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contributor" ADD COLUMN     "sub" TEXT NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Contributor_sub_key" ON "Contributor"("sub");
