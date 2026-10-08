-- Run this as MySQL root:
--   sudo mysql
-- Then paste:
CREATE USER IF NOT EXISTS 'organic_aprico'@'localhost' IDENTIFIED WITH mysql_native_password BY 'oa_db_pass_2026';
CREATE DATABASE IF NOT EXISTS organic_aprico;
GRANT ALL PRIVILEGES ON organic_aprico.* TO 'organic_aprico'@'localhost';
FLUSH PRIVILEGES;

-- After that, run:
--   npx prisma db push

-- ---------------------------------------------------------------------------
-- Order numbers
-- ---------------------------------------------------------------------------
-- `Order`.`id` is an auto-incrementing integer, and the numbering must continue
-- on from the 10000 orders placed on the previous stores. `prisma db push`
-- creates the table with AUTO_INCREMENT = 1, so this seed has to be applied
-- once after the schema is pushed, on every new database (dev, staging and
-- production):
--
--   ALTER TABLE `Order` AUTO_INCREMENT = 10001;
--
-- The next order created is then 10001, followed by 10002, 10003 and so on.
-- Re-running this statement is harmless: MySQL raises the counter but never
-- lowers it, so it cannot rewind past numbers already issued.
--
-- Verify with:
--   SHOW TABLE STATUS LIKE 'Order';   -- Auto_increment should be 10001+

