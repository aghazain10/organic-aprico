-- Run this as MySQL root:
--   sudo mysql
-- Then paste:
CREATE USER IF NOT EXISTS 'organic_aprico'@'localhost' IDENTIFIED WITH mysql_native_password BY 'oa_db_pass_2026';
CREATE DATABASE IF NOT EXISTS organic_aprico;
GRANT ALL PRIVILEGES ON organic_aprico.* TO 'organic_aprico'@'localhost';
FLUSH PRIVILEGES;

-- After that, run:
--   npx prisma db push
