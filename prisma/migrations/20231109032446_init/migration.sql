-- CreateTable
CREATE TABLE "buttons" (
    "id" SERIAL NOT NULL,
    "server_id" BIGINT NOT NULL,
    "channel_id" BIGINT NOT NULL,
    "button_id" VARCHAR(100) NOT NULL,
    "role_id" BIGINT NOT NULL,
    "redirect_id" BIGINT NOT NULL,

    CONSTRAINT "buttons_pkey" PRIMARY KEY ("id")
);
