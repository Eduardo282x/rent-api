-- CreateTable
CREATE TABLE `rent` (
    `IdRent` INTEGER NOT NULL AUTO_INCREMENT,
    `NameRent` VARCHAR(200) NOT NULL,
    `AddressRent` VARCHAR(200) NOT NULL,
    `TypeRent` INTEGER NOT NULL,
    `Images` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`IdRent`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `IdRol` INTEGER NOT NULL AUTO_INCREMENT,
    `Rol` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`IdRol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sales` (
    `IdSales` INTEGER NOT NULL AUTO_INCREMENT,
    `IdUser` INTEGER NOT NULL,
    `IdClient` INTEGER NOT NULL,
    `IdRent` INTEGER NOT NULL,

    PRIMARY KEY (`IdSales`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `type` (
    `IdType` INTEGER NOT NULL AUTO_INCREMENT,
    `NameType` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`IdType`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `IdUsers` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(200) NOT NULL,
    `Lastname` VARCHAR(200) NOT NULL,
    `Identify` VARCHAR(20) NOT NULL,
    `Address` VARCHAR(200) NOT NULL,
    `Phone` VARCHAR(20) NOT NULL,
    `Password` VARCHAR(20) NOT NULL,
    `Rol` INTEGER NOT NULL,

    PRIMARY KEY (`IdUsers`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `rent` ADD CONSTRAINT `rent_TypeRent_fkey` FOREIGN KEY (`TypeRent`) REFERENCES `type`(`IdType`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sales` ADD CONSTRAINT `sales_IdUser_fkey` FOREIGN KEY (`IdUser`) REFERENCES `users`(`IdUsers`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sales` ADD CONSTRAINT `sales_IdRent_fkey` FOREIGN KEY (`IdRent`) REFERENCES `rent`(`IdRent`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_Rol_fkey` FOREIGN KEY (`Rol`) REFERENCES `roles`(`IdRol`) ON DELETE RESTRICT ON UPDATE CASCADE;
