/*
  Warnings:

  - Added the required column `name` to the `Contributor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contributor" ADD COLUMN     "name" TEXT NOT NULL;
