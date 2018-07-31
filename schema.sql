CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE Products(
ItemID INTEGER AUTO_INCREMENT PRIMARY KEY,
ProductName VARCHAR(30),
DepartmentName VARCHAR(30),
Price DOUBLE(10,2),
StockQuantity INTEGER);

INSERT INTO Products(ProductName, DepartmentName, Price, StockQuantity)
VALUES ("Yogurt", "grocery", 2.99, 17),
  ("Bread", "grocery", 3.99, 24),
  ("PS3", "electronics", 299.99, 5),
  ("Harmon Kardon Sub Woofers", "electronics", 579.99, 22),
  ("Iphone 8", "electronics", 399.99, 18),
  ("Trampoline", "sporting goods", 699.99, 18),
  ("Baseball", "sporting goods", 5.99, 37),
  ("Fear and Loathing In Las Vegas", "books", 16.99, 53),
  ("Lord of The Rings", "books", 14.99, 37),
  ("Where The Wild Things Are", "books", 15.99,13),
  ("Fight Club", "dvds", 17.99, 36),  
  ("Office Space", "dvds", 9.99, 24),
  ("Dark Side of the Moon", "music", 15.55, 18);

CREATE TABLE Departments(
DepartmentID INTEGER AUTO_INCREMENT PRIMARY KEY,
DepartmentName VARCHAR(30),
OverHeadCosts DOUBLE(10,2),
TotalSales DOUBLE(10,2));

INSERT INTO Departments(DepartmentName, OverHeadCosts, TotalSales)
VALUES ("grocery", 10500.00, -10000.00),
  ("electronics", 25000.00, 0.00),
  ("sporting goods", 15000.00, 0.00),
  ("books", 5000.00, 0.00),
  ("dvds", 20000.00, 0.00),
  ("music", 7500.00, 0.00);