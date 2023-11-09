/*
  Warnings:

  - A unique constraint covering the columns `[message_id]` on the table `buttons` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "buttons_message_id_key" ON "buttons"("message_id");
