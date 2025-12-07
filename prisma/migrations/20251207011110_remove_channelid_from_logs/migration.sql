/*
  Warnings:

  - You are about to drop the column `channelId` on the `Log` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Log_channelId_idx";

-- AlterTable
ALTER TABLE "Log" DROP COLUMN "channelId";
