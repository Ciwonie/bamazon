DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL(11,2) NULL,
    stock_quantity INT(10),
    flavor_text VARCHAR(1000) NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity, flavor_text)
VALUES ("Heart of Azeroth", "Lok'Tar", 0, 5190000, "A living symble of hope, borne by the champions of a dying planet. The fate of Azeroth will be shared by all her children... with an active WoW subscription.");

INSERT INTO products (product_name, department_name, price, stock_quantity, flavor_text)
VALUES ("Hover Board", "Future", 1989.00, 2015, "Hey, The Big 'M'! How's it hanging, McFly?");

INSERT INTO products (product_name, department_name, price, stock_quantity, flavor_text)
VALUES ("Neuralyzer", "Classified", 9999.99, 2700, "When you need to forget about all that sugar.");

INSERT INTO products (product_name, department_name, price, stock_quantity, flavor_text)
VALUES ("Babel Fish", "Galactic", 3.10, 120, "Meanwhile, the poor Babel fish, by effectively removing all barriers to communication between different races and cultures, has caused more and bloodier wars than anything else in the history of creation.");

INSERT INTO products (product_name, department_name, price, stock_quantity, flavor_text)
VALUES ("Tricorder", "Galactic", 1.00, 2364, "Live Long and Prosper, with a Tricorder");

INSERT INTO products (product_name, department_name, price, stock_quantity, flavor_text)
VALUES ("Stargate", "Galactic", 999999999.99, 1, "It took us 15 years and three supercomputers to MacGyver a system for the gate on Earth. You only get one.");

INSERT INTO products (product_name, department_name, price, stock_quantity, flavor_text)
VALUES ("Pokeball", "Kanto", 200.00, 99, "When it's time to be the very best.");

INSERT INTO products (product_name, department_name, price, stock_quantity, flavor_text)
VALUES ("Invisibility Cloak", "Gringotts", 525.23, 3, "Use it well.");

INSERT INTO products (product_name, department_name, price, stock_quantity, flavor_text)
VALUES ("Dapper Dan Pomade", "Not Your Fathers", 3.43, 55, "If you have to be up at there crossroads at midnight, to sell your soul to the devil, do it in style.");

INSERT INTO products (product_name, department_name, price, stock_quantity, flavor_text)
VALUES ("Rick's Portal Gun", "Galactic", 4500, 12, "Break the cycle, Morty! Focus on Science.");

INSERT INTO products (product_name, department_name, price, stock_quantity, flavor_text)
VALUES ("Dunder Mifflin Paper", "Recycled Trees", 24.99, 10000, "I. DECLARE. BANKRUPTCY!");

SELECT * FROM products;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '110960'
