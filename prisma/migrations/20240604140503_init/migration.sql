/*
  Warnings:

  - You are about to drop the column `AddressRent` on the `rent` table. All the data in the column will be lost.
  - You are about to drop the column `Address` on the `users` table. All the data in the column will be lost.
  - Added the required column `Address` to the `Rent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `AddressDetails` to the `Rent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Bathrooms` to the `Rent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `IdClient` to the `Rent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Price` to the `Rent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Rooms` to the `Rent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SquareMeters` to the `Rent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Email` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `rent` DROP COLUMN `AddressRent`,
    ADD COLUMN `Address` VARCHAR(200) NOT NULL,
    ADD COLUMN `AddressDetails` VARCHAR(512) NOT NULL,
    ADD COLUMN `Bathrooms` INTEGER NOT NULL,
    ADD COLUMN `IdClient` INTEGER NOT NULL,
    ADD COLUMN `Price` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `Rooms` INTEGER NOT NULL,
    ADD COLUMN `SquareMeters` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `Address`,
    ADD COLUMN `Email` VARCHAR(200) NOT NULL;
