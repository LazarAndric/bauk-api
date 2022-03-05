
-- -----------------------------------------------------
-- Schema bauk_ciz_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bauk_ciz_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `bauk_ciz_db` ;

-- -----------------------------------------------------
-- Table `bauk_ciz_db`.`addition`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bauk_ciz_db`.`addition` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  `Price` DOUBLE NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE);


-- -----------------------------------------------------
-- Table `bauk_ciz_db`.`order_status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bauk_ciz_db`.`order_status` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE);


-- -----------------------------------------------------
-- Table `bauk_ciz_db`.`order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bauk_ciz_db`.`order` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `IdOrderStatus` INT NOT NULL,
  `Price` DOUBLE NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  INDEX `Order-StatusOrder_idx` (`IdOrderStatus` ASC) VISIBLE,
  CONSTRAINT `Order-StatusOrder`
    FOREIGN KEY (`IdOrderStatus`)
    REFERENCES `bauk_ciz_db`.`order_status` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


-- -----------------------------------------------------
-- Table `bauk_ciz_db`.`picture`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bauk_ciz_db`.`picture` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  `File_Path` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE);


-- -----------------------------------------------------
-- Table `bauk_ciz_db`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bauk_ciz_db`.`product` (
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
    REFERENCES `bauk_ciz_db`.`picture` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


-- -----------------------------------------------------
-- Table `bauk_ciz_db`.`item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bauk_ciz_db`.`item` (
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
    REFERENCES `bauk_ciz_db`.`order` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `Item-Product`
    FOREIGN KEY (`IdProduct`)
    REFERENCES `bauk_ciz_db`.`product` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


-- -----------------------------------------------------
-- Table `bauk_ciz_db`.`additions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bauk_ciz_db`.`additions` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `IdItem` INT NOT NULL,
  `IdAddition` INT NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  INDEX `Additions-item_idx` (`IdItem` ASC) VISIBLE,
  INDEX `Additions-Addition_idx` (`IdAddition` ASC) VISIBLE,
  CONSTRAINT `Additions-Addition`
    FOREIGN KEY (`IdAddition`)
    REFERENCES `bauk_ciz_db`.`addition` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `Additions-item`
    FOREIGN KEY (`IdItem`)
    REFERENCES `bauk_ciz_db`.`item` (`ID`));


-- -----------------------------------------------------
-- Table `bauk_ciz_db`.`place`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bauk_ciz_db`.`place` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `PlaceName` VARCHAR(45) NOT NULL,
  `AreaCode` VARCHAR(45) NOT NULL,
  `Active` TINYINT NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE);


-- -----------------------------------------------------
-- Table `bauk_ciz_db`.`role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bauk_ciz_db`.`role` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `RoleName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE);


-- -----------------------------------------------------
-- Table `bauk_ciz_db`.`status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bauk_ciz_db`.`status` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Status` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE);


-- -----------------------------------------------------
-- Table `bauk_ciz_db`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bauk_ciz_db`.`user` (
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
    REFERENCES `bauk_ciz_db`.`role` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `User-Status`
    FOREIGN KEY (`IdStatus`)
    REFERENCES `bauk_ciz_db`.`status` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


-- -----------------------------------------------------
-- Table `bauk_ciz_db`.`adress`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bauk_ciz_db`.`adress` (
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
    REFERENCES `bauk_ciz_db`.`place` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `Adress-User`
    FOREIGN KEY (`IdUser`)
    REFERENCES `bauk_ciz_db`.`user` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


-- -----------------------------------------------------
-- Table `bauk_ciz_db`.`auth`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bauk_ciz_db`.`auth` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `IdUser` VARCHAR(45) NOT NULL,
  `RefreshToken` VARCHAR(200) NOT NULL,
  `TempToken` VARCHAR(200) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `IdUser_UNIQUE` (`IdUser` ASC) VISIBLE,
  UNIQUE INDEX `RefreshToken_UNIQUE` (`RefreshToken` ASC) VISIBLE,
  UNIQUE INDEX `TempToken_UNIQUE` (`TempToken` ASC) VISIBLE,
  CONSTRAINT `Auth-User`
    FOREIGN KEY (`IdUser`)
    REFERENCES `bauk_ciz_db`.`user` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


-- -----------------------------------------------------
-- Table `bauk_ciz_db`.`chat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bauk_ciz_db`.`chat` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `IdUser` VARCHAR(45) NOT NULL,
  `IdFirebase` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  INDEX `Chat-User_idx` (`IdUser` ASC) VISIBLE,
  CONSTRAINT `Chat-User`
    FOREIGN KEY (`IdUser`)
    REFERENCES `bauk_ciz_db`.`user` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

-- -----------------------------------------------------
-- Table `bauk_ciz_db`.`mail_code`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bauk_ciz_db`.`mail_code` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `IdUser` VARCHAR(45) NOT NULL,
  `Code` VARCHAR(5) NOT NULL,
  `ExpireDate` DATETIME NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  INDEX `M_C-User_idx` (`IdUser` ASC) VISIBLE,
  CONSTRAINT `M_C-User`
    FOREIGN KEY (`IdUser`)
    REFERENCES `bauk_ciz_db`.`user` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


-- -----------------------------------------------------
-- Table `bauk_ciz_db`.`order_adress`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bauk_ciz_db`.`order_adress` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `IdOrder` INT NOT NULL,
  `IdAdress` INT NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  INDEX `O_A_idx` (`IdOrder` ASC) VISIBLE,
  INDEX `O_A_idx1` (`IdAdress` ASC) VISIBLE,
  CONSTRAINT `O_A-Adress`
    FOREIGN KEY (`IdAdress`)
    REFERENCES `bauk_ciz_db`.`adress` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `O_A-Order`
    FOREIGN KEY (`IdOrder`)
    REFERENCES `bauk_ciz_db`.`order` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


-- -----------------------------------------------------
-- Table `bauk_ciz_db`.`order_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bauk_ciz_db`.`order_user` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `IdUser` VARCHAR(45) NOT NULL,
  `IdOrder` INT NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  UNIQUE INDEX `IdUser_UNIQUE` (`IdUser` ASC) VISIBLE,
  UNIQUE INDEX `IdOrder_UNIQUE` (`IdOrder` ASC) VISIBLE,
  CONSTRAINT `O_U-Order`
    FOREIGN KEY (`IdOrder`)
    REFERENCES `bauk_ciz_db`.`order` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `O_U-User`
    FOREIGN KEY (`IdUser`)
    REFERENCES `bauk_ciz_db`.`user` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


-- -----------------------------------------------------
-- Table `bauk_ciz_db`.`visit`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bauk_ciz_db`.`visit` (
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
    REFERENCES `bauk_ciz_db`.`place` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


-- -----------------------------------------------------
-- Table `bauk_ciz_db`.`orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bauk_ciz_db`.`orders` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `IdVisit` INT NOT NULL,
  `IdOrder` INT NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  INDEX `O_V-Order_idx` (`IdOrder` ASC) VISIBLE,
  INDEX `O_V-Visit_idx` (`IdVisit` ASC) VISIBLE,
  CONSTRAINT `O_V-Order`
    FOREIGN KEY (`IdOrder`)
    REFERENCES `bauk_ciz_db`.`order` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `O_V-Visit`
    FOREIGN KEY (`IdVisit`)
    REFERENCES `bauk_ciz_db`.`visit` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


-- -----------------------------------------------------
-- Table `bauk_ciz_db`.`password`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bauk_ciz_db`.`password` (
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
    REFERENCES `bauk_ciz_db`.`user` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


-- -----------------------------------------------------
-- Table `bauk_ciz_db`.`product_addition`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bauk_ciz_db`.`product_addition` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `IdProduct` INT NOT NULL,
  `IdAddition` INT NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  INDEX `P_A-Product_idx` (`IdProduct` ASC) VISIBLE,
  INDEX `P_A-Addition_idx` (`IdAddition` ASC) VISIBLE,
  CONSTRAINT `P_A-Addition`
    FOREIGN KEY (`IdAddition`)
    REFERENCES `bauk_ciz_db`.`addition` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `P_A-Product`
    FOREIGN KEY (`IdProduct`)
    REFERENCES `bauk_ciz_db`.`product` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);


-- -----------------------------------------------------
-- Table `bauk_ciz_db`.`size`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bauk_ciz_db`.`size` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Size` VARCHAR(45) NOT NULL,
  `Price` DOUBLE NOT NULL,
  `IdProduct` INT NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  INDEX `Size-Product_idx` (`IdProduct` ASC) VISIBLE,
  CONSTRAINT `Size-Product`
    FOREIGN KEY (`IdProduct`)
    REFERENCES `bauk_ciz_db`.`product` (`ID`));
