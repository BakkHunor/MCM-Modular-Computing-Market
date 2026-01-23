-- Adatbázis létrehozása
CREATE DATABASE IF NOT EXISTS mcm
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_hungarian_ci;

USE mcm;

-- Felhasználók táblája
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Termékek táblája
CREATE TABLE Products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category ENUM('hardware','gamekey','giftcard') NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Rendelések táblája
CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending','paid','shipped','completed','cancelled') DEFAULT 'pending',
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
) ENGINE=InnoDB;

-- Rendelés részletek
CREATE TABLE OrderDetails (
    detail_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT DEFAULT 1,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
) ENGINE=InnoDB;

-- Ajándékkártyák táblája
CREATE TABLE GiftCards (
    card_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    platform VARCHAR(50) NOT NULL,
    value DECIMAL(10,2) NOT NULL,
    code VARCHAR(100) NOT NULL UNIQUE,
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
) ENGINE=InnoDB;

-- Játék kulcsok táblája
CREATE TABLE GameKeys (
    key_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    game_name VARCHAR(100) NOT NULL,
    platform VARCHAR(50) NOT NULL,
    code VARCHAR(100) NOT NULL UNIQUE,
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
) ENGINE=InnoDB;