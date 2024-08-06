/*
  Warnings:

  - You are about to drop the column `phone_number` on the `Branch` table. All the data in the column will be lost.
  - You are about to drop the column `working_hours` on the `Branch` table. All the data in the column will be lost.
  - Added the required column `phoneNumber` to the `Branch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workingHours` to the `Branch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Branch" DROP COLUMN "phone_number",
DROP COLUMN "working_hours",
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "workingHours" TEXT NOT NULL;
