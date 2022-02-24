-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema bpztl7fn5sdm5oaf3r6i
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema bpztl7fn5sdm5oaf3r6i
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bpztl7fn5sdm5oaf3r6i` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `bpztl7fn5sdm5oaf3r6i` ;

-- -----------------------------------------------------
-- Table `bpztl7fn5sdm5oaf3r6i`.`addition`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bpztl7fn5sdm5oaf3r6i`.`addition` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bpztl7fn5sdm5oaf3r6i`.`place`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bpztl7fn5sdm5oaf3r6i`.`place` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `PlaceName` VARCHAR(45) NOT NULL,
  `AreaCode` VARCHAR(45) NOT NULL,
  `Active` TINYINT NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bpztl7fn5sdm5oaf3r6i`.`role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bpztl7fn5sdm5oaf3r6i`.`role` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `RoleName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bpztl7fn5sdm5oaf3r6i`.`status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bpztl7fn5sdm5oaf3r6i`.`status` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Status` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bpztl7fn5sdm5oaf3r6i`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bpztl7fn5sdm5oaf3r6i`.`user` (
  `ID` VARCHAR(40) NOT NULL,
  `FirstName` VARCHAR(20) NOT NULL,
  `LastName` VARCHAR(20) NOT NULL,
  `PhoneNumber` VARCHAR(40) NOT NULL,
  `Email` VARCHAR(45) NOT NULL,
  `IdStatus` INT NOT NULL,
  `IdRole` INT NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  UNIQUE INDEX `EMAIL_UNIQUE` (`Email` ASC) VISIBLE,
  UNIQUE INDEX `PHONE_NUMER_UNIQUE` (`PhoneNumber` ASC) VISIBLE,
  INDEX `User-Status_idx` (`IdStatus` ASC) VISIBLE,
  INDEX `User-Role_idx` (`IdRole` ASC) VISIBLE,
  CONSTRAINT `User-Role`
    FOREIGN KEY (`IdRole`)
    REFERENCES `bpztl7fn5sdm5oaf3r6i`.`role` (`ID`),
  CONSTRAINT `User-Status`
    FOREIGN KEY (`IdStatus`)
    REFERENCES `bpztl7fn5sdm5oaf3r6i`.`status` (`ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bpztl7fn5sdm5oaf3r6i`.`adress`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bpztl7fn5sdm5oaf3r6i`.`adress` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `IdUser` VARCHAR(45) NOT NULL,
  `StreetAndNumber` VARCHAR(80) NOT NULL,
  `IdPlace` INT NOT NULL,
  `GpsLocation` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  INDEX `Adress-User_idx` (`IdUser` ASC) VISIBLE,
  INDEX `Adress-Place_idx` (`IdPlace` ASC) VISIBLE,
  CONSTRAINT `Adress-Place`
    FOREIGN KEY (`IdPlace`)
    REFERENCES `bpztl7fn5sdm5oaf3r6i`.`place` (`ID`),
  CONSTRAINT `Adress-User`
    FOREIGN KEY (`IdUser`)
    REFERENCES `bpztl7fn5sdm5oaf3r6i`.`user` (`ID`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bpztl7fn5sdm5oaf3r6i`.`order_status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bpztl7fn5sdm5oaf3r6i`.`order_status` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bpztl7fn5sdm5oaf3r6i`.`order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bpztl7fn5sdm5oaf3r6i`.`order` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `IdAdress` INT NOT NULL,
  `IdOrderStatus` INT NOT NULL,
  `Price` DOUBLE NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  INDEX `Order-Adress_idx` (`IdAdress` ASC) VISIBLE,
  INDEX `Order-StatusOrder_idx` (`IdOrderStatus` ASC) VISIBLE,
  CONSTRAINT `Order-Adress`
    FOREIGN KEY (`IdAdress`)
    REFERENCES `bpztl7fn5sdm5oaf3r6i`.`adress` (`ID`),
  CONSTRAINT `Order-StatusOrder`
    FOREIGN KEY (`IdOrderStatus`)
    REFERENCES `bpztl7fn5sdm5oaf3r6i`.`order_status` (`ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bpztl7fn5sdm5oaf3r6i`.`picture`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bpztl7fn5sdm5oaf3r6i`.`picture` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  `File_Path` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bpztl7fn5sdm5oaf3r6i`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bpztl7fn5sdm5oaf3r6i`.`product` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `IdPicture` INT NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  `Available` TINYINT NOT NULL,
  `Description` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  INDEX `Product-Picture_idx` (`IdPicture` ASC) VISIBLE,
  CONSTRAINT `Product-Picture`
    FOREIGN KEY (`IdPicture`)
    REFERENCES `bpztl7fn5sdm5oaf3r6i`.`picture` (`ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bpztl7fn5sdm5oaf3r6i`.`item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bpztl7fn5sdm5oaf3r6i`.`item` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `IdProduct` INT NOT NULL,
  `IdOrder` INT NOT NULL,
  `Price` DOUBLE NOT NULL,
  `Comments` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  INDEX `Item-Order_idx` (`IdOrder` ASC) VISIBLE,
  INDEX `Item-Product_idx` (`IdProduct` ASC) VISIBLE,
  CONSTRAINT `Item-Order`
    FOREIGN KEY (`IdOrder`)
    REFERENCES `bpztl7fn5sdm5oaf3r6i`.`order` (`ID`),
  CONSTRAINT `Item-Product`
    FOREIGN KEY (`IdProduct`)
    REFERENCES `bpztl7fn5sdm5oaf3r6i`.`product` (`ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bpztl7fn5sdm5oaf3r6i`.`additions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bpztl7fn5sdm5oaf3r6i`.`additions` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `IdItem` INT NOT NULL,
  `IdAddition` INT NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  INDEX `Additions-item_idx` (`IdItem` ASC) VISIBLE,
  INDEX `Additions-Addition_idx` (`IdAddition` ASC) VISIBLE,
  CONSTRAINT `Additions-Addition`
    FOREIGN KEY (`IdAddition`)
    REFERENCES `bpztl7fn5sdm5oaf3r6i`.`addition` (`ID`),
  CONSTRAINT `Additions-item`
    FOREIGN KEY (`IdItem`)
    REFERENCES `bpztl7fn5sdm5oaf3r6i`.`item` (`ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bpztl7fn5sdm5oaf3r6i`.`auth`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bpztl7fn5sdm5oaf3r6i`.`auth` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `IdUser` VARCHAR(45) NOT NULL,
  `RefreshToken` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `IdUser_UNIQUE` (`IdUser` ASC) VISIBLE,
  UNIQUE INDEX `RefreshToken_UNIQUE` (`RefreshToken` ASC) VISIBLE,
  CONSTRAINT `Auth-User`
    FOREIGN KEY (`IdUser`)
    REFERENCES `bpztl7fn5sdm5oaf3r6i`.`user` (`ID`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bpztl7fn5sdm5oaf3r6i`.`chat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bpztl7fn5sdm5oaf3r6i`.`chat` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `IdUser` VARCHAR(45) NOT NULL,
  `IdFirebase` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  INDEX `Chat-User_idx` (`IdUser` ASC) VISIBLE,
  CONSTRAINT `Chat-User`
    FOREIGN KEY (`IdUser`)
    REFERENCES `bpztl7fn5sdm5oaf3r6i`.`user` (`ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bpztl7fn5sdm5oaf3r6i`.`mail_code`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bpztl7fn5sdm5oaf3r6i`.`mail_code` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `IdUser` VARCHAR(45) NOT NULL,
  `Code` VARCHAR(5) NOT NULL,
  `ExpireDate` DATETIME NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  INDEX `M_C-User_idx` (`IdUser` ASC) VISIBLE,
  CONSTRAINT `M_C-User`
    FOREIGN KEY (`IdUser`)
    REFERENCES `bpztl7fn5sdm5oaf3r6i`.`user` (`ID`))
ENGINE = InnoDB
AUTO_INCREMENT = 31
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bpztl7fn5sdm5oaf3r6i`.`order_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bpztl7fn5sdm5oaf3r6i`.`order_user` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `IdUser` VARCHAR(45) NOT NULL,
  `IdOrder` INT NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  UNIQUE INDEX `IdUser_UNIQUE` (`IdUser` ASC) VISIBLE,
  UNIQUE INDEX `IdOrder_UNIQUE` (`IdOrder` ASC) VISIBLE,
  CONSTRAINT `O_U-Order`
    FOREIGN KEY (`IdOrder`)
    REFERENCES `bpztl7fn5sdm5oaf3r6i`.`order` (`ID`),
  CONSTRAINT `O_U-User`
    FOREIGN KEY (`IdUser`)
    REFERENCES `bpztl7fn5sdm5oaf3r6i`.`user` (`ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bpztl7fn5sdm5oaf3r6i`.`visit`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bpztl7fn5sdm5oaf3r6i`.`visit` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Date` DATE NOT NULL,
  `IdPlace` INT NOT NULL,
  `SlotsNumber` INT NOT NULL,
  `Price` DOUBLE NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  INDEX `Visit-Place_idx` (`IdPlace` ASC) VISIBLE,
  CONSTRAINT `Visit-Place`
    FOREIGN KEY (`IdPlace`)
    REFERENCES `bpztl7fn5sdm5oaf3r6i`.`place` (`ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bpztl7fn5sdm5oaf3r6i`.`orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bpztl7fn5sdm5oaf3r6i`.`orders` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `IdVisit` INT NOT NULL,
  `IdOrder` INT NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  INDEX `O_V-Order_idx` (`IdOrder` ASC) VISIBLE,
  INDEX `O_V-Visit_idx` (`IdVisit` ASC) VISIBLE,
  CONSTRAINT `O_V-Order`
    FOREIGN KEY (`IdOrder`)
    REFERENCES `bpztl7fn5sdm5oaf3r6i`.`order` (`ID`),
  CONSTRAINT `O_V-Visit`
    FOREIGN KEY (`IdVisit`)
    REFERENCES `bpztl7fn5sdm5oaf3r6i`.`visit` (`ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bpztl7fn5sdm5oaf3r6i`.`password`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bpztl7fn5sdm5oaf3r6i`.`password` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `IdUser` VARCHAR(45) NOT NULL,
  `Hash` VARCHAR(200) NOT NULL,
  `Salt` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `HASH_UNIQUE` (`Hash` ASC) VISIBLE,
  UNIQUE INDEX `SALT_UNIQUE` (`Salt` ASC) VISIBLE,
  UNIQUE INDEX `IdUser_UNIQUE` (`IdUser` ASC) VISIBLE,
  CONSTRAINT `Password`
    FOREIGN KEY (`IdUser`)
    REFERENCES `bpztl7fn5sdm5oaf3r6i`.`user` (`ID`))
ENGINE = InnoDB
AUTO_INCREMENT = 14
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bpztl7fn5sdm5oaf3r6i`.`product_addition`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bpztl7fn5sdm5oaf3r6i`.`product_addition` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `IdProduct` INT NOT NULL,
  `IdAddition` INT NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  INDEX `P_A-Product_idx` (`IdProduct` ASC) VISIBLE,
  INDEX `P_A-Addition_idx` (`IdAddition` ASC) VISIBLE,
  CONSTRAINT `P_A-Addition`
    FOREIGN KEY (`IdAddition`)
    REFERENCES `bpztl7fn5sdm5oaf3r6i`.`addition` (`ID`),
  CONSTRAINT `P_A-Product`
    FOREIGN KEY (`IdProduct`)
    REFERENCES `bpztl7fn5sdm5oaf3r6i`.`product` (`ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `bpztl7fn5sdm5oaf3r6i`.`size`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bpztl7fn5sdm5oaf3r6i`.`size` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Size` VARCHAR(45) NOT NULL,
  `Price` DOUBLE NOT NULL,
  `IdProduct` INT NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  INDEX `Size-Product_idx` (`IdProduct` ASC) VISIBLE,
  CONSTRAINT `Size-Product`
    FOREIGN KEY (`IdProduct`)
    REFERENCES `bpztl7fn5sdm5oaf3r6i`.`product` (`ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
