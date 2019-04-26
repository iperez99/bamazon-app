DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products
(
    item_id INTEGER(11)
    AUTO_INCREMENT NOT NULL,
    product_name VARCHAR
    (255) NOT NULL,
    department_name VARCHAR
    (255) NOT NULL,
    price INTEGER
    (11) NOT NULL,
    stock_quantity INTEGER
    (11) NOT NULL,
    product_sales INTEGER DEFAULT 0,
    PRIMARY KEY
    (item_id)
);