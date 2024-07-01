-- CreateTable
CREATE TABLE `Rent` (
    `IdRent` INTEGER NOT NULL AUTO_INCREMENT,
    `NameRent` VARCHAR(200) NOT NULL,
    `Address` VARCHAR(200) NOT NULL,
    `AddressDetails` VARCHAR(512) NOT NULL,
    `TypeRent` INTEGER NOT NULL,
    `Rooms` INTEGER NOT NULL,
    `Bathrooms` INTEGER NOT NULL,
    `Price` DECIMAL(10, 2) NOT NULL,
    `SquareMeters` DECIMAL(10, 2) NOT NULL,
    `Images` VARCHAR(200) NOT NULL,
    `IdClient` INTEGER NOT NULL,

    PRIMARY KEY (`IdRent`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Roles` (
    `IdRol` INTEGER NOT NULL AUTO_INCREMENT,
    `Rol` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`IdRol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sales` (
    `IdSales` INTEGER NOT NULL AUTO_INCREMENT,
    `IdUser` INTEGER NOT NULL,
    `IdClient` INTEGER NOT NULL,
    `IdRent` INTEGER NOT NULL,
    `dafe` DATETIME(3) NOT NULL,
    `IdState` INTEGER NOT NULL,

    PRIMARY KEY (`IdSales`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `State` (
    `IdState` INTEGER NOT NULL AUTO_INCREMENT,
    `State` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`IdState`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Type` (
    `IdType` INTEGER NOT NULL AUTO_INCREMENT,
    `NameType` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`IdType`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Users` (
    `IdUsers` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(191) NOT NULL,
    `Lastname` VARCHAR(191) NOT NULL,
    `Identify` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `Phone` VARCHAR(191) NOT NULL,
    `Password` VARCHAR(191) NOT NULL,
    `Rol` INTEGER NOT NULL,

    PRIMARY KEY (`IdUsers`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Locations` (
    `IdLocation` INTEGER NOT NULL AUTO_INCREMENT,
    `location` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`IdLocation`)
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
