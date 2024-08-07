/*
  Warnings:

  - You are about to drop the `DeliveryPrice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "DeliveryPrice";

-- CreateTable
CREATE TABLE "deliver_prices" (
    "id" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "deliver_prices_pkey" PRIMARY KEY ("id")
);
