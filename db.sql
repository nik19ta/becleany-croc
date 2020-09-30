-- создаём базы данных
CREATE SCHEMA `croc` ;

--  создаём таблицу с пользователями
CREATE TABLE `croc`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `login` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `task1` INT NULL,
  `task2` INT NULL,
  `task3` INT NULL,
  `task4` INT NULL,
  `task5` INT NULL,
  `task6` INT NULL,
  `task7` INT NULL,
  PRIMARY KEY (`id`));

-- Пример добовления пользователя с id
INSERT INTO `croc`.`users` (`id`, `login`, `password`, `task1`, `task2`, `task3`, `task4`, `task5`, `task6`) VALUES ('1', 'nik19ta', 'sekret', '1', '1', '0', '0', '0', '0');
-- Пример добовления пользователя без id
INSERT INTO `croc`.`users` (`login`, `password`, `task1`, `task2`, `task3`, `task4`, `task5`, `task6`) VALUES ('nik19ta', 'sekret', '1', '1', '0', '0', '0', '0');
