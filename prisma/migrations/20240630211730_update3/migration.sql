/*
  Warnings:

  - Added the required column `East` to the `Rent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Hall` to the `Rent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Info` to the `Rent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `North` to the `Rent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Parking` to the `Rent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `South` to the `Rent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `West` to the `Rent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Civil` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `rent` ADD COLUMN `East` DECIMAL(10, 6) NOT NULL,
    ADD COLUMN `Hall` INTEGER NOT NULL,
    ADD COLUMN `Info` VARCHAR(512) NOT NULL,
    ADD COLUMN `North` DECIMAL(10, 6) NOT NULL,
    ADD COLUMN `Parking` INTEGER NOT NULL,
    ADD COLUMN `South` DECIMAL(10, 6) NOT NULL,
    ADD COLUMN `West` DECIMAL(10, 6) NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `Civil` VARCHAR(191) NOT NULL;
