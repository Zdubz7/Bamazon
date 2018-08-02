// This variable requires the promt npm node package.
var prompt = require('prompt');

// This variable requires the MySQL npm node package.
var mysql = require('mysql');

// This variable requires the table padding function.
var padText = require('./padTable.js');


// This variable links to the MySQL database schema.sql
var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  // This is your username.
  user: "root",
  // This is your password.
  password: "yourpassword1234",
  database: "Bamazon"
});

// This variable connects the user to the MySQL database schema.sql
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});

// This variable displays all of the different items inside of the database and also sells an item to the customer.
connection.query('SELECT * FROM Products', function (err, res) {

  // This is the error handler.
  if (err) throw err;

  // This shows a message to the current user.
  console.log('Check out our selection...\n');

  // This section sets up the table header.
  console.log('  ID  |      Product Name      |  Department Name  |   Price  | In Stock');
  console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ');

  // This section loops through the database and shows all of the items available to the user.
  for (var i = 0; i < res.length; i++) {

    // This variable converts the items to a string.
    var itemID = res[i].ItemID + '';

    // This variable adds padding to the table items.
    itemID = padText("  ID  ", itemID);

    // This variable converts the product name into a string.
    var productName = res[i].ProductName + '';
    productName = padText("      Product Name      ", productName);

    // This variable converts the department names into a string.
    var departmentName = res[i].DepartmentName + '';
    departmentName = padText("  Department Name  ", departmentName);

    // This variable converts the prices for the items into a string.
    var price = '$' + res[i].Price.toFixed(2) + '';
    price = padText("   Price  ", price);

    // This variable converts the stock quantity into a string for each stocked item.
    var quantity = res[i].StockQuantity + '';

    // This section logs all of the table entries that the user recieved.
    console.log(itemID + '|' + productName + '|' + departmentName + '|' + price + '|    ' + quantity);
  }
  // This section promots the user to buy an item after the table has been shown.
  prompt.start();

  // This section asks for an items id.
  console.log('\nWhich item do you want to buy?');
  prompt.get(['buyItemID'], function (err, result) {

    // This section shows an items ID that has been selected to the user.
    var buyItemID = result.buyItemID;
    console.log('You selected Item # ' + buyItemID + '.');

    // This section then asks for the quantity once the user has selected an item.
    console.log('\nHow many do you wish to buy?');
    prompt.get(['buyItemQuantity'], function (err, result) {

      // This section shows the quantity of an item selected by the user.
      var buyItemQuantity = result.buyItemQuantity;
      console.log('You selected to buy ' + buyItemQuantity + ' of these.');

      // This section checks if the store has enough of the product that the user wanted after the user has placed an order.
      connection.query('SELECT StockQuantity FROM Products WHERE ?', [{
        ItemID: buyItemID
      }], function (err, res) {

        // This section is an error handler.
        if (err) throw err;

        // This section checks if the ID for a specific item was returned from MySQL
        if (res[0] == undefined) {
          console.log('Sorry... We found no items with Item ID "' + buyItemID + '"');

          // This variable ends the script or connection.
          connection.end();
        }

        // This section checks the valid item ID and compares the Bamazon inventory with the user quantity.
        else {
          var bamazonQuantity = res[0].StockQuantity;

          // This section checks if there is enough of the inventory of a specific item that the user is requesting.
          if (bamazonQuantity >= buyItemQuantity) {

            // This variable updates mySQL databae with a reduced inventory and ensures that the integers are functioning for subtraction and database.
            var newInventory = parseInt(bamazonQuantity) - parseInt(buyItemQuantity);
            connection.query('UPDATE Products SET ? WHERE ?', [{
              StockQuantity: newInventory
            }, {
              ItemID: buyItemID
            }], function (err, res) {

              // This section handles errors.
              if (err) throw err;

            }); // This is the end of the inventory and updates the query.

            // This variable shows the customer what their purchase total is, which needs to query the price information from the database.
            var customerTotal;
            connection.query('SELECT Price FROM Products WHERE ?', [{
              ItemID: buyItemID
            }], function (err, res) {

              var buyItemPrice = res[0].Price;
              customerTotal = buyItemQuantity * buyItemPrice.toFixed(2);

              console.log('\nYour total is $' + customerTotal + '.');

              // This section finds the department for the item that the user would like to purchase.
              connection.query('SELECT DepartmentName FROM Products WHERE ?', [{
                ItemID: buyItemID
              }], function (err, res) {
                var itemDepartment = res[0].DepartmentName;

                // This section finds the current revenue for the department the item came from.
                connection.query('SELECT TotalSales FROM Departments WHERE ?', [{
                  DepartmentName: itemDepartment
                }], function (err, res) {
                  var totalSales = res[0].TotalSales;

                  // This section calculates the new sales revenue.
                  var totalSales = parseFloat(totalSales) + parseFloat(customerTotal);

                  // This section adds the revenue from each transaction that the user made to the total sales column in relation to department.
                  connection.query('UPDATE Departments SET ? WHERE ?', [{
                    TotalSales: totalSales
                  }, {
                    DepartmentName: itemDepartment
                  }], function (err, res) {

                    // This section handles any errors.
                    if (err) throw err;
                    console.log('Transaction Completed. Thank you!');
                    connection.end();
                    // This is the end of the script/connection.

                  }); // This is the end point of the revenue update query.

                }); // This is the end point of the current revenue query.

              }); // This is the end point of the department name query.

            }); // This is the end point of the customer purchase update query.
          }
          // This section shows when there is an insufficient amount of inventory.
          else {
            console.log('Sorry... We only have ' + bamazonQuantity + ' of those items. Order cancelled.');
            connection.end();
            // This section is the end of the script/connection.
          }
        }

      }); // This is the end point of the item quantity query.

    }); // This is the end point of prompt 2.

  }); // This is the end point of prompt 1.

}); // This is the end point of the main query.