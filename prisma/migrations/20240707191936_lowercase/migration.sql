/*
  Warnings:

  - The primary key for the `rent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Address` on the `rent` table. All the data in the column will be lost.
  - You are about to drop the column `AddressDetails` on the `rent` table. All the data in the column will be lost.
  - You are about to drop the column `Bathrooms` on the `rent` table. All the data in the column will be lost.
  - You are about to drop the column `East` on the `rent` table. All the data in the column will be lost.
  - You are about to drop the column `Hall` on the `rent` table. All the data in the column will be lost.
  - You are about to drop the column `IdClient` on the `rent` table. All the data in the column will be lost.
  - You are about to drop the column `IdRent` on the `rent` table. All the data in the column will be lost.
  - You are about to drop the column `Images` on the `rent` table. All the data in the column will be lost.
  - You are about to drop the column `Info` on the `rent` table. All the data in the column will be lost.
  - You are about to drop the column `NameRent` on the `rent` table. All the data in the column will be lost.
  - You are about to drop the column `North` on the `rent` table. All the data in the column will be lost.
  - You are about to drop the column `Parking` on the `rent` table. All the data in the column will be lost.
  - You are about to drop the column `Price` on the `rent` table. All the data in the column will be lost.
  - You are about to drop the column `Rooms` on the `rent` table. All the data in the column will be lost.
  - You are about to drop the column `South` on the `rent` table. All the data in the column will be lost.
  - You are about to drop the column `SquareMeters` on the `rent` table. All the data in the column will be lost.
  - You are about to drop the column `TypeRent` on the `rent` table. All the data in the column will be lost.
  - You are about to drop the column `West` on the `rent` table. All the data in the column will be lost.
  - The primary key for the `roles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `IdRol` on the `roles` table. All the data in the column will be lost.
  - You are about to drop the column `Rol` on the `roles` table. All the data in the column will be lost.
  - The primary key for the `sales` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `IdClient` on the `sales` table. All the data in the column will be lost.
  - You are about to drop the column `IdRent` on the `sales` table. All the data in the column will be lost.
  - You are about to drop the column `IdSales` on the `sales` table. All the data in the column will be lost.
  - You are about to drop the column `IdState` on the `sales` table. All the data in the column will be lost.
  - You are about to drop the column `IdUser` on the `sales` table. All the data in the column will be lost.
  - The primary key for the `state` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `IdState` on the `state` table. All the data in the column will be lost.
  - You are about to drop the column `State` on the `state` table. All the data in the column will be lost.
  - The primary key for the `type` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `IdType` on the `type` table. All the data in the column will be lost.
  - You are about to drop the column `NameType` on the `type` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Civil` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `Email` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `IdUsers` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `Identify` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `Lastname` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `Password` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `Phone` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `Rol` on the `users` table. All the data in the column will be lost.
  - Added the required column `address` to the `Rent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressDetails` to the `Rent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bathrooms` to the `Rent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `east` to the `Rent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hall` to the `Rent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idClient` to the `Rent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idRent` to the `Rent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `images` to the `Rent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `info` to the `Rent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameRent` to the `Rent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `north` to the `Rent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parking` to the `Rent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Rent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rooms` to the `Rent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `south` to the `Rent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `squareMeters` to the `Rent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeRent` to the `Rent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `west` to the `Rent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idRol` to the `Roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rol` to the `Roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idClient` to the `Sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idRent` to the `Sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idSales` to the `Sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idState` to the `Sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idUser` to the `Sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idState` to the `State` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `State` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idType` to the `Type` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameType` to the `Type` table without a default value. This is not possible if the table is not empty.
  - Added the required column `civil` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idUsers` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identify` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rol` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `rent` DROP FOREIGN KEY `Rent_TypeRent_fkey`;

-- DropForeignKey
ALTER TABLE `sales` DROP FOREIGN KEY `Sales_IdRent_fkey`;

-- DropForeignKey
ALTER TABLE `sales` DROP FOREIGN KEY `Sales_IdState_fkey`;

-- DropForeignKey
ALTER TABLE `sales` DROP FOREIGN KEY `Sales_IdUser_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `Users_Rol_fkey`;

-- AlterTable
ALTER TABLE `rent` DROP PRIMARY KEY,
    DROP COLUMN `Address`,
    DROP COLUMN `AddressDetails`,
    DROP COLUMN `Bathrooms`,
    DROP COLUMN `East`,
    DROP COLUMN `Hall`,
    DROP COLUMN `IdClient`,
    DROP COLUMN `IdRent`,
    DROP COLUMN `Images`,
    DROP COLUMN `Info`,
    DROP COLUMN `NameRent`,
    DROP COLUMN `North`,
    DROP COLUMN `Parking`,
    DROP COLUMN `Price`,
    DROP COLUMN `Rooms`,
    DROP COLUMN `South`,
    DROP COLUMN `SquareMeters`,
    DROP COLUMN `TypeRent`,
    DROP COLUMN `West`,
    ADD COLUMN `address` VARCHAR(200) NOT NULL,
    ADD COLUMN `addressDetails` VARCHAR(512) NOT NULL,
    ADD COLUMN `bathrooms` INTEGER NOT NULL,
    ADD COLUMN `east` DECIMAL(10, 6) NOT NULL,
    ADD COLUMN `hall` INTEGER NOT NULL,
    ADD COLUMN `idClient` INTEGER NOT NULL,
    ADD COLUMN `idRent` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `images` VARCHAR(200) NOT NULL,
    ADD COLUMN `info` VARCHAR(512) NOT NULL,
    ADD COLUMN `nameRent` VARCHAR(200) NOT NULL,
    ADD COLUMN `north` DECIMAL(10, 6) NOT NULL,
    ADD COLUMN `parking` INTEGER NOT NULL,
    ADD COLUMN `price` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `rooms` INTEGER NOT NULL,
    ADD COLUMN `south` DECIMAL(10, 6) NOT NULL,
    ADD COLUMN `squareMeters` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `typeRent` INTEGER NOT NULL,
    ADD COLUMN `west` DECIMAL(10, 6) NOT NULL,
    ADD PRIMARY KEY (`idRent`);

-- AlterTable
ALTER TABLE `roles` DROP PRIMARY KEY,
    DROP COLUMN `IdRol`,
    DROP COLUMN `Rol`,
    ADD COLUMN `idRol` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `rol` VARCHAR(100) NOT NULL,
    ADD PRIMARY KEY (`idRol`);

-- AlterTable
ALTER TABLE `sales` DROP PRIMARY KEY,
    DROP COLUMN `IdClient`,
    DROP COLUMN `IdRent`,
    DROP COLUMN `IdSales`,
    DROP COLUMN `IdState`,
    DROP COLUMN `IdUser`,
    ADD COLUMN `idClient` INTEGER NOT NULL,
    ADD COLUMN `idRent` INTEGER NOT NULL,
    ADD COLUMN `idSales` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `idState` INTEGER NOT NULL,
    ADD COLUMN `idUser` INTEGER NOT NULL,
    ADD PRIMARY KEY (`idSales`);

-- AlterTable
ALTER TABLE `state` DROP PRIMARY KEY,
    DROP COLUMN `IdState`,
    DROP COLUMN `State`,
    ADD COLUMN `idState` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `state` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`idState`);

-- AlterTable
ALTER TABLE `type` DROP PRIMARY KEY,
    DROP COLUMN `IdType`,
    DROP COLUMN `NameType`,
    ADD COLUMN `idType` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `nameType` VARCHAR(200) NOT NULL,
    ADD PRIMARY KEY (`idType`);

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    DROP COLUMN `Civil`,
    DROP COLUMN `Email`,
    DROP COLUMN `IdUsers`,
    DROP COLUMN `Identify`,
    DROP COLUMN `Lastname`,
    DROP COLUMN `Name`,
    DROP COLUMN `Password`,
    DROP COLUMN `Phone`,
    DROP COLUMN `Rol`,
    ADD COLUMN `civil` VARCHAR(191) NOT NULL,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `idUsers` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `identify` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastname` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone` VARCHAR(191) NOT NULL,
    ADD COLUMN `rol` INTEGER NOT NULL,
    ADD PRIMARY KEY (`idUsers`);

-- AddForeignKey
ALTER TABLE `Rent` ADD CONSTRAINT `Rent_typeRent_fkey` FOREIGN KEY (`typeRent`) REFERENCES `Type`(`idType`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sales` ADD CONSTRAINT `Sales_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `Users`(`idUsers`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sales` ADD CONSTRAINT `Sales_idState_fkey` FOREIGN KEY (`idState`) REFERENCES `State`(`idState`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sales` ADD CONSTRAINT `Sales_idRent_fkey` FOREIGN KEY (`idRent`) REFERENCES `Rent`(`idRent`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_rol_fkey` FOREIGN KEY (`rol`) REFERENCES `Roles`(`idRol`) ON DELETE RESTRICT ON UPDATE CASCADE;
