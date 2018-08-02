# Bamazon

- npm init -y installs the package.json file.
- npm i prompt installs the prompt package.
- npm i mysql installs the mysql package.

    - Run `CREATE DATABASE Bamazon;` in mySQL Workbench.
    - Be sure to select the correct database by running the `USE Bamazon;` 
    - Refer to the raw SQL commands under the _`=== First Table ===`_ comment to set up the `Products` table.
    - Refer to the raw SQL commands under the _`=== Second Table ===`_ comment to set up the `Departments` table.

    - Running `node BamazonCustomer.js` will use MySQL to pull up all the products for sale.
    - The customer can then choose a product using its ID and then enter a quantity to buy.
    - If the inventory has enough items, the order will be processed.
    - If the inventory is lacking, the order will not be processed.

    - Running `node BamazonManager.js` will display a menu and perform the specific requests.
    - The manager can choose option `1` to view the current inventory.
    - The manager can choose option `2` to see low items in inventory (less than 5 in stock).
    - The manager can choose option `3` to re-stock existing items.
    - The manager can choose option `4` to add new items for sale.
      - Notice how the inventory was adjusted from steps `3` and `4`.

    - Running `node BamazonExecutive.js` will display a menu and perform the specific requests.
    - The executive can choose option `1` to view the sales by department.
    - The executive can choose option `2` to add a new department.
     - Notice how the department list was adjusted from step `2`.
      - Also note that the manager can add a new item to the department and if a customer buys said item, it will cause total sales and profit to increase in that department.

