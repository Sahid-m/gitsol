/*
  Warnings:

  - You are about to drop the column `providor_id` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sub]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sub` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_providor_id_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "providor_id",
ADD COLUMN     "sub" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_sub_key" ON "User"("sub");
