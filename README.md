# Bamazon

- npm init -y |  (installs the package.json file.)
- npm i prompt |  (installs the prompt package.)
- npm i mysql | (installs the mysql package.)
- The host is localhost
- The password is yourpassword1234 to connect to the database
- The user is root
- The port is 8889
- The database is Bamazon

    - Run `CREATE DATABASE Bamazon;` in mySQL Workbench.
    - Make sure that you select the correct database by running the `USE Bamazon;`

    - Running `node BamazonCustomer.js` will use MySQL to pull up all the products for sale.
    - First, the user will be prompted to pick an item. Use the ITEM ID NUMBER to select a product, then press enter when you have chosen a number.
    - Next, enter the value of the item you want to buy, then press enter.
    - If you enter a number higher than the value that is "In Stock" the order will not be processed.
    - After you enter the number you want, your total will be calculated and the transaction is completed.

    - Running `node BamazonManager.js` will display a menu, CHOOSE A NUMBER 1-4 TO COMPLETE THE REQUEST
    - `1` If you enter 1 you will be able to view the products for sale.
    - `2` If you enter 2 you will be able to view the items with a stock less than 5, none have a stock less than 5.
    - `3` If you enter 3 you will be able to add to the inventory.
    - `4` If you enter 4 you will be able to add a new product.

    - Running `node BamazonExecutive.js` will display a menu, CHOOSE A NUMBER EITHER 1 OR 2 TO COMPLETE THE REQUEST.
    - `1` Pressing 1 on your keyboard and pressing enter will allow the user to view the Product Sales By Department.
    - `2` Pressing 2 on your keyboard and pressing enter will allow the user to create A New Department for the chart.
    - If a customer buys a NEWLY ADDED ITEM that the manager just added to the list, it will cause the total sales and profit to increase in that department.



