-- CreateTable
CREATE TABLE `Rent` (
    `idRent` INTEGER NOT NULL AUTO_INCREMENT,
    `nameRent` VARCHAR(200) NOT NULL,
    `address` VARCHAR(200) NOT NULL,
    `addressDetails` VARCHAR(512) NOT NULL,
    `typeRent` INTEGER NOT NULL,
    `rooms` INTEGER NOT NULL,
    `bathrooms` INTEGER NOT NULL,
    `hall` INTEGER NOT NULL,
    `parking` INTEGER NOT NULL,
    `urbanization` VARCHAR(191) NOT NULL,
    `avenue` VARCHAR(191) NOT NULL,
    `days` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `info` VARCHAR(512) NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `squareMeters` DECIMAL(10, 2) NOT NULL,
    `images` VARCHAR(200) NOT NULL,
    `idClient` INTEGER NOT NULL,
    `autorizationId` INTEGER NOT NULL,
    `idState` INTEGER NOT NULL,

    PRIMARY KEY (`idRent`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Roles` (
    `idRol` INTEGER NOT NULL AUTO_INCREMENT,
    `rol` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`idRol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sales` (
    `idSales` INTEGER NOT NULL AUTO_INCREMENT,
    `idClient` INTEGER NOT NULL,
    `idRent` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`idSales`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `State` (
    `idState` INTEGER NOT NULL AUTO_INCREMENT,
    `state` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idState`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Type` (
    `idType` INTEGER NOT NULL AUTO_INCREMENT,
    `nameType` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`idType`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Users` (
    `idUsers` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `lastname` VARCHAR(191) NOT NULL,
    `identify` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `civil` VARCHAR(191) NOT NULL,
    `rol` INTEGER NOT NULL,

    PRIMARY KEY (`idUsers`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Rent` ADD CONSTRAINT `Rent_typeRent_fkey` FOREIGN KEY (`typeRent`) REFERENCES `Type`(`idType`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rent` ADD CONSTRAINT `Rent_idState_fkey` FOREIGN KEY (`idState`) REFERENCES `State`(`idState`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rent` ADD CONSTRAINT `Rent_idClient_fkey` FOREIGN KEY (`idClient`) REFERENCES `Users`(`idUsers`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rent` ADD CONSTRAINT `Rent_autorizationId_fkey` FOREIGN KEY (`autorizationId`) REFERENCES `Users`(`idUsers`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sales` ADD CONSTRAINT `Sales_idClient_fkey` FOREIGN KEY (`idClient`) REFERENCES `Users`(`idUsers`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sales` ADD CONSTRAINT `Sales_idRent_fkey` FOREIGN KEY (`idRent`) REFERENCES `Rent`(`idRent`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_rol_fkey` FOREIGN KEY (`rol`) REFERENCES `Roles`(`idRol`) ON DELETE RESTRICT ON UPDATE CASCADE;
