/*
  Warnings:

  - You are about to drop the `vehicle_transfers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "vehicle_transfers" DROP CONSTRAINT "vehicle_transfers_from_user_id_fkey";

-- DropForeignKey
ALTER TABLE "vehicle_transfers" DROP CONSTRAINT "vehicle_transfers_to_user_id_fkey";

-- DropForeignKey
ALTER TABLE "vehicle_transfers" DROP CONSTRAINT "vehicle_transfers_vehicle_id_fkey";

-- AlterTable
ALTER TABLE "parking_slots" ADD COLUMN     "fee_per_hour" DOUBLE PRECISION;

-- DropTable
DROP TABLE "vehicle_transfers";

-- DropEnum
DROP TYPE "TransferStatus";
