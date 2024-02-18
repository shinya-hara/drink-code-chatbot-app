-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('USER', 'BOT');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "type" "UserType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
