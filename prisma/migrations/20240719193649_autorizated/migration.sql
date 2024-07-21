/*
  Warnings:

  - Added the required column `autorizated` to the `Rent` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Rent` DROP FOREIGN KEY `Rent_autorizationId_fkey`;

-- DropForeignKey
ALTER TABLE `Rent` DROP FOREIGN KEY `Rent_idClient_fkey`;

-- AlterTable
ALTER TABLE `Rent` ADD COLUMN `autorizated` BOOLEAN NOT NULL,
    MODIFY `idClient` INTEGER NULL,
    MODIFY `autorizationId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Rent` ADD CONSTRAINT `Rent_idClient_fkey` FOREIGN KEY (`idClient`) REFERENCES `Users`(`idUsers`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rent` ADD CONSTRAINT `Rent_autorizationId_fkey` FOREIGN KEY (`autorizationId`) REFERENCES `Users`(`idUsers`) ON DELETE SET NULL ON UPDATE CASCADE;
