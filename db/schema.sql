DROP DATABASE IF EXISTS market_db;

CREATE DATABASE market_db;

USE market_db;

-- CREATE TABLE user (
--      id INT AUTO_INCREMENT PRIMARY KEY,
--      username VARCHAR(255) NOT NULL UNIQUE,
--      password VARCHAR(255) NOT NULL,
--      email VARCHAR(255) NOT NULL UNIQUE
-- );

-- CREATE TABLE vendor (
--      id INT AUTO_INCREMENT PRIMARY KEY,
--      name VARCHAR(255) NOT NULL,
--      description VARCHAR(255) NOT NULL,
--      image_URL VARCHAR(255) NOT NULL,
--      user_id INT NOT NULL,
--      FOREIGN KEY (user_id) REFERENCES user(id)
-- );

-- CREATE TABLE product (
--      id INT AUTO_INCREMENT PRIMARY KEY,
--      name VARCHAR(255) NOT NULL,
--      description VARCHAR(255) NOT NULL,
--      price INT NOT NULL,
--      stock INT NOT NULL,
--      image_URL VARCHAR(255) NOT NULL,
--      categories VARCHAR(255) NOT NULL,
--      vendor_id INT NOT NULL,
--      FOREIGN KEY (vendor_id) REFERENCES vendor(id)
-- );

-- CREATE TABLE cart (
--      id INT AUTO_INCREMENT PRIMARY KEY,
--      user_id INT NOT NULL,
--      FOREIGN KEY (user_id) REFERENCES user(id)
-- );

-- CREATE TABLE sale (
--      id INT AUTO_INCREMENT PRIMARY KEY,
--      user_id INT NOT NULL,
--      product_id INT NOT NULL,
--      vendor_id INT NOT NULL,
--      FOREIGN KEY (user_id) REFERENCES user(id),
--      FOREIGN KEY (product_id) REFERENCES product(id),
--      FOREIGN KEY (vendor_id) REFERENCES vendor(id)
-- );

-- CREATE TABLE cartItem (
--      id INT AUTO_INCREMENT PRIMARY KEY,
--      cart_id INT NOT NULL,
--      product_id INT NOT NULL,
--      quantity INT NOT NULL DEFAULT 1,
--      FOREIGN KEY (cart_id) REFERENCES cart(id),
--      FOREIGN KEY (product_id) REFERENCES product(id)
-- );