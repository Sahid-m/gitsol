/*
  Warnings:

  - Added the required column `profileImg` to the `Contributor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contributor" ADD COLUMN     "profileImg" TEXT NOT NULL;
