/*
  Warnings:

  - Added the required column `autorizationId` to the `Rent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Rent` ADD COLUMN `autorizationId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Rent` ADD CONSTRAINT `Rent_idClient_fkey` FOREIGN KEY (`idClient`) REFERENCES `Users`(`idUsers`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rent` ADD CONSTRAINT `Rent_autorizationId_fkey` FOREIGN KEY (`autorizationId`) REFERENCES `Users`(`idUsers`) ON DELETE RESTRICT ON UPDATE CASCADE;
