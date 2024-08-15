/*
  Warnings:

  - You are about to drop the column `idUser` on the `sales` table. All the data in the column will be lost.
  - You are about to drop the column `stateIdState` on the `sales` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `sales` DROP FOREIGN KEY `Sales_idUser_fkey`;

-- DropForeignKey
ALTER TABLE `sales` DROP FOREIGN KEY `Sales_stateIdState_fkey`;

-- AlterTable
ALTER TABLE `sales` DROP COLUMN `idUser`,
    DROP COLUMN `stateIdState`;

-- AddForeignKey
ALTER TABLE `Sales` ADD CONSTRAINT `Sales_idClient_fkey` FOREIGN KEY (`idClient`) REFERENCES `Users`(`idUsers`) ON DELETE RESTRICT ON UPDATE CASCADE;
