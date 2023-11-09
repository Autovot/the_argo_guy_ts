/*
  Warnings:

  - Added the required column `message_id` to the `buttons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "buttons" ADD COLUMN     "message_id" BIGINT NOT NULL;
