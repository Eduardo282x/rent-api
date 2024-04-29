/*
  Warnings:

  - Added the required column `IdState` to the `Sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dafe` to the `Sales` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `rent` DROP FOREIGN KEY `rent_TypeRent_fkey`;

-- DropForeignKey
ALTER TABLE `sales` DROP FOREIGN KEY `sales_IdRent_fkey`;

-- DropForeignKey
ALTER TABLE `sales` DROP FOREIGN KEY `sales_IdUser_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_Rol_fkey`;

-- AlterTable
ALTER TABLE `sales` ADD COLUMN `IdState` INTEGER NOT NULL,
    ADD COLUMN `dafe` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `State` (
    `IdState` INTEGER NOT NULL AUTO_INCREMENT,
    `State` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`IdState`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Rent` ADD CONSTRAINT `Rent_TypeRent_fkey` FOREIGN KEY (`TypeRent`) REFERENCES `Type`(`IdType`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sales` ADD CONSTRAINT `Sales_IdUser_fkey` FOREIGN KEY (`IdUser`) REFERENCES `Users`(`IdUsers`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sales` ADD CONSTRAINT `Sales_IdState_fkey` FOREIGN KEY (`IdState`) REFERENCES `State`(`IdState`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sales` ADD CONSTRAINT `Sales_IdRent_fkey` FOREIGN KEY (`IdRent`) REFERENCES `Rent`(`IdRent`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_Rol_fkey` FOREIGN KEY (`Rol`) REFERENCES `Roles`(`IdRol`) ON DELETE RESTRICT ON UPDATE CASCADE;
