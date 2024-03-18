-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema minet
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema minet
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `minet` DEFAULT CHARACTER SET utf8 ;
USE `minet` ;

-- -----------------------------------------------------
-- Table `minet`.`coins`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `minet`.`coins` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `acronym` VARCHAR(10) NULL,
  `name` VARCHAR(45) NULL,
  `icon_url` VARCHAR(150) NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `minet`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `minet`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `full_name` VARCHAR(60) NULL,
  `email` VARCHAR(100) NULL,
  `password` VARCHAR(150) NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `minet`.`wallets`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `minet`.`wallets` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `coin_id` INT NULL,
  `user_id` INT NOT NULL,
  `balance` DECIMAL(18,8) NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_wallet_user_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_wallets_coin_idx` (`coin_id` ASC) VISIBLE,
  CONSTRAINT `fk_wallet_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `minet`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_wallets_coin`
    FOREIGN KEY (`coin_id`)
    REFERENCES `minet`.`coins` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `minet`.`transactions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `minet`.`transactions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `coin_amount` FLOAT NULL,
  `transaction_value` DECIMAL(18,8) NULL,
  `status` ENUM("success", "pending", "failed") NULL,
  `timestamp` TIMESTAMP(2) NULL,
  `coin_id` INT NULL,
  `from_user_id` INT NULL,
  `to_user_id` INT NULL,
  `type` ENUM("buy", "sell") NULL,
  `from_wallet` INT NULL,
  `to_wallet` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_transaction_coin_idx` (`coin_id` ASC) VISIBLE,
  INDEX `fk_transaction_from_user_idx` (`from_user_id` ASC) VISIBLE,
  INDEX `fk_transaction_to_user_idx` (`to_user_id` ASC) VISIBLE,
  INDEX `fk_transactions_from_wallet_idx` (`from_wallet` ASC) VISIBLE,
  INDEX `fk_transactions_to_wallet_idx` (`to_wallet` ASC) VISIBLE,
  CONSTRAINT `fk_transaction_coin`
    FOREIGN KEY (`coin_id`)
    REFERENCES `minet`.`coins` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_transaction_from_user`
    FOREIGN KEY (`from_user_id`)
    REFERENCES `minet`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_transaction_to_user`
    FOREIGN KEY (`to_user_id`)
    REFERENCES `minet`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_transactions_from_wallet`
    FOREIGN KEY (`from_wallet`)
    REFERENCES `minet`.`wallets` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_transactions_to_wallet`
    FOREIGN KEY (`to_wallet`)
    REFERENCES `minet`.`wallets` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `minet`.`watchlists`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `minet`.`watchlists` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `coin_id` INT NULL,
  `user_id` INT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_watchlist_coin_idx` (`coin_id` ASC) VISIBLE,
  INDEX `fk_watchlist_user_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_watchlist_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `minet`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_watchlist_coin`
    FOREIGN KEY (`coin_id`)
    REFERENCES `minet`.`coins` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `minet`.`investments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `minet`.`investments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NULL,
  `coin_id` INT NULL,
  `amount` DECIMAL(18,8) NULL,
  `date` DATE NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_investment_user_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_investments_coin_idx` (`coin_id` ASC) VISIBLE,
  CONSTRAINT `fk_investment_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `minet`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_investments_coin`
    FOREIGN KEY (`coin_id`)
    REFERENCES `minet`.`coins` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
