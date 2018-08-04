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
    user: "root", //Your username
    password: "yourpassword1234", //Your password
    database: "Bamazon"
});

// This variable connects the user to the MySQL database schema.sql
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);

  // This variable prompts the user with different options of what they would like to do. I used prompt here instead of the inquierer package.
  prompt.start();

  // This section displays the menu of options to the user.
  console.log('\nBamazon Shift Manager Menu');
  console.log('----------------------------');
  console.log('Select a (numeric) option.');
  console.log('1. View Products For Sale');
  console.log('2. View Low Inventory');
  console.log('3. Add To The Current Inventory');
  console.log('4. Add A New Product');

  prompt.get(['menuSelection'], function (err, result) {

    // This variable switches the case so the user has varying options.
    var menuSelection = parseInt(result.menuSelection);

    switch(menuSelection) {
      case 1:
          console.log('\nView Products For Sale...');
          // This function uses a callback.
          viewProducts(function(){});
          connection.end(); 
          // This is the end of the script/connection.
          break;
      
      case 2:
          console.log('\nView Low Inventory...');
          viewLowInventory();
          connection.end(); 
          // This is the end of the script/connection.
          break;
      
      case 3:
        console.log('\nAdd To The Current Inventory...');
        addInventory();
        break;

      case 4:
        console.log('\nAdd A New Product...');
        addNewProduct();
        break;

      default:
        console.log('Im Sorry, That Is Not A Vaild Entry. Entry Aborted :(.');
        // This is the end of the script/connection.
        connection.end(); 

    } 
    // This is the end of the switch case, which is the menu selection.
  }); 
// This is the end of the switch case menu selection prompt.
}); 
// This is the end of the connection

// This function allows the viewing of products for sale, which is completed with a callback function.
function viewProducts(callback){

  // This variable displays all of the items inside of the database.
  connection.query('SELECT * FROM Products', function(err, res){

    // This handles any errors.
    if(err) throw err;
    // This shows the user a message that the total fc inventory is below.
    console.log('The Total FC Inventory Is Listefd Below...\n'); 

    // This section sets up the table header.
    console.log('  ID  |      Product Name      |  Department Name  |   Price  | In Stock');
    console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ');

    // This section loops through the database and shows all of the items.
    for(var i = 0; i < res.length; i++){

      // This section adds padding for the table and converts the item id to a string.
      var itemID = res[i].ItemID + '';
      itemID = padText("  ID  ", itemID);
      // This variable converts all of the product names to a string.
      var productName = res[i].ProductName + ''; 
      productName = padText("      Product Name      ", productName);
      // This variable converts all of the department names into a string.
      var departmentName = res[i].DepartmentName + ''; 
      departmentName = padText("  Department Name  ", departmentName);
      // This variable converts all of the prices into a string.
      var price = '$' + res[i].Price.toFixed(2) + ''; 
      price = padText("   Price  ", price);
      // This variable concerts all o the stock quantity into a string
      var quantity = res[i].StockQuantity + ''; 
      
      // This section logs the users table entry for the itemid, the productname, the departmentname, the price, and the quanity.
      console.log(itemID + '|' + productName + '|' + departmentName + '|' + price + '|    ' + quantity);
    }
    // This is a callback function in use for case 3 to counter any asynchronous behavior.
    callback();
  });
}
// This function allows the user to view the low inventory.
function viewLowInventory(){
  // This variable displays all of the items inside of the database lower than 5 items in stock.
  connection.query('SELECT * FROM Products WHERE StockQuantity < 5', function(err, res){
  // This handles any errors.
    // Error Handler
    if(err) throw err;
    // This shows the user a message if any of the items in the inventory is less than 5.
    console.log('This Is The Inventory For Items < 5 That Are In Stock Below...\n');
    // This console.log sets up the table header for the ID, productname, departmentname, price, and instock.
    console.log('  ID  |      Product Name      |  Department Name  |   Price  | In Stock');
    console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ');
    // This section loops through the database and shows all of the items.
    for(var i = 0; i < res.length; i++){

      // This variable adds padding for the table and converts the itemid into a string.
      var itemID = res[i].ItemID + ''; 
      itemID = padText("  ID  ", itemID);
      // This variable converts product name into a string.
      var productName = res[i].ProductName + ''; 
      productName = padText("      Product Name      ", productName);
      // This variable converts the department name into a string.
      var departmentName = res[i].DepartmentName + ''; 
      departmentName = padText("  Department Name  ", departmentName);
      // This variable converts the price into a string.
      var price = '$' + res[i].Price.toFixed(2) + '';
      price = padText("   Price  ", price);
      // This variable converts stockquantity into a string, there is no need for padding here.
      var quantity = res[i].StockQuantity + ''; 

      // This logs the table entries to the console for itemID, productname, departmentname, price, and quantity.
      console.log(itemID + '|' + productName + '|' + departmentName + '|' + price + '|    ' + quantity);
    }

    console.log('\nOh Shoot! Better Get Stowing!');
  });
}
// This function adds to the inventory.
function addInventory(){
  // This function runs the view products function, which is case 1, and asks the user for input after the callback occurs.
  viewProducts(function(){
    // This variable prompts the user if they want to restock an item.
    prompt.start();
    console.log('\nWhich Item Would You Wish To Restock?');
    prompt.get(['restockItemID'], function (err, result) {
      // This variable shows the item's id that the user decided to restock.
      var restockItemID = result.restockItemID;
      console.log('You Have Chosen To Re-stock Item # ' + restockItemID + '.');
      // This section promots the user for how many more items that they would like to restock.
      console.log('\nHow many Items Will You Restock?');
      prompt.get(['restockCount'], function(err, result){
        // This variable shows the restock count selected by the customer/user.
        var restockCount = result.restockCount;
        console.log('You Have Chosen To Re-Stock ' + restockCount + ' Items.');
        // This variable converts the variable restockcount into an integer.
        restockCount = parseInt(restockCount);

        if(Number.isInteger(restockCount)){
          // This variable is a query for the current item inventory that the user/customer is going to select and from where.
          connection.query('SELECT StockQuantity FROM Products WHERE ?', [{ItemID: restockItemID}], function(err, res){
            // This checks if the item ID was valid or if an item or something was returned from MySQL.
            if(res[0] == undefined){
              
              console.log('Im Terribly Sorry... We Havent Found Any Items With Item ID "' +  restockItemID + '"');
              connection.end(); 
              // This is the end of the script/connection.
            }
            // This section shows that the item has a valid item ID, it then adds to the Bamazon Inventory with stowing quantity.
            else{
              
              var bamazonQuantity = res[0].StockQuantity;
              // This section ensures the integers are good.
              var newInventory = parseInt(bamazonQuantity) + parseInt(restockCount);
              // This section updates the database with new items.
              connection.query('UPDATE Products SET ? WHERE ?', [{StockQuantity: newInventory}, {ItemID: restockItemID}], function(err, res){
                // This handles any errors.
                if(err) throw err; 

                console.log('\nYour Inventory Has Been Updated Successfully! Great Work! :)'); 
                // This is the end of the script/connection.
                connection.end();

              });
              // This is the end of the inventory update query for the user.
            
            }

          }); 
          // This is the end of the current quantity query for the user.
        }
        else{
          console.log('Im Sorry, Only Whole Items Can Be Added. Integers Only Please! :)');
          // This is the end of the script/connection. 
          connection.end(); 
        }

      });
      // This ends prompt 2 which is the amount to add.

    }); 
    // This ends prompt 1 which is the item id.

  }); // end case 1 callback

}
// This function adds a new product to the table.
function addNewProduct(){

  // This promots the user for new item details.
  prompt.start();
  console.log('\nPlease Complete The New Product Details:');
  prompt.get(['ProductName', 'DepartmentName', 'Price', 'Quantity'], function (err, result) {
    // This section collects / parses the variable productname, departmentname, price, and quantity.
    var productName = result.ProductName;
    var departmentName = result.DepartmentName;
    var price = result.Price;
    var quantity = result.Quantity;
// This updates the database for the variables productname, departmentname, price, and stockquantity.
    connection.query('INSERT INTO Products SET ?', {
      ProductName: productName,
      DepartmentName: departmentName,
      Price: price,
      StockQuantity: quantity
    }, function(err, res){
      // This is a more refined error handler.
      if(err){
        console.log('\nIm Sorry :(. Unfortunately, The SQL Database Could Not Be Updated At This Time.\n' +
          'Please Make Sure That You Have Entered The Correct Price And Quantity As Numbers!');
        connection.end();
        // This is the end of the script/connection for entering the price and quantity.
      }
      else{
        console.log('\nYou Inventory Has Updated Successfully! Great Work! :)');
        connection.end(); 
        // This is the end of the script/connection for the inventory.
      }

    });

  });

}

