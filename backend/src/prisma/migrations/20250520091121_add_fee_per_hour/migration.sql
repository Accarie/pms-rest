/*
  Warnings:

  - Made the column `fee_per_hour` on table `parking_slots` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "parking_slots" ALTER COLUMN "fee_per_hour" SET NOT NULL;
