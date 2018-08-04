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
  // This is your username
  user: "root",
  // This is your password.
  password: "yourpassword1234",
  database: "Bamazon"
});

// This variable connects the user to the MySQL database schema.sql
connection.connect(function (err) {
  if (err) throw err;
  console.log("You Are Connected As Id " + connection.threadId);

  // This variable prompts the user with different options of what they would like to do. I used prompt here instead of the inquierer package.
  prompt.start();

  // This section displays the menu of options to the user.
  console.log('\nBamazon Peak Leadership Menu');
  console.log('------------------------------');
  console.log('Select A (Numeric) Option To Switch Menus.');
  console.log('1. View Product Sales By Department :)');
  console.log('2. Create A New Department :)');

  prompt.get(['menuSelection'], function (err, result) {

    // This variable switches cases for different options in the menu.
    var menuSelection = parseInt(result.menuSelection);

    switch (menuSelection) {
      case 1:
        console.log('\nView Product Sales by Department...');
        viewSalesByDept();
        break;

      case 2:
        console.log('\nCreate A New Department...');
        addNewDept();
        break;

      default:
        console.log('Sorry, That Is Not A Vaild Character Entry. Aborting Request :( .');
        connection.end();
        // This is the end of the current script/connection.
    }
  });

});
// This is the end of the database connection.


// This function lets the customer view the products for sale by the department.
function viewSalesByDept() {

  // This variable is the query for all of the department table.
  connection.query('SELECT * FROM Departments', function (err, res) {

    // This section handles any error.
    if (err) throw err;

    // This section shows the user a message and sets up the table header.
    console.log('\n' + '  ID  |  Department Name  |  OverHead Costs |  Product Sales  |  Total Profit');
    console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -');

    // This section loops through the database and shows all of the items available.
    for (var i = 0; i < res.length; i++) {

      // This variable adds in padding for the departments and converts the department ID into a string.
      var departmentID = res[i].DepartmentID + '';
      departmentID = padText("  ID  ", departmentID);

      // This variable turns the department name into a string.
      var departmentName = res[i].DepartmentName + '';
      departmentName = padText("  Department Name  ", departmentName);

      // This section creates a calculation for the profit.
      var overHeadCost = res[i].OverHeadCosts.toFixed(2);
      var totalSales = res[i].TotalSales.toFixed(2);
      var totalProfit = (parseFloat(totalSales) - parseFloat(overHeadCost)).toFixed(2);

      // This section adds dollar sign ($) values to overheadcost, totalsales, and totalprofit.
      overHeadCost = '$' + overHeadCost;
      totalSales = '$' + totalSales;
      totalProfit = '$' + totalProfit;

      // This section adds padding for the overheadcost and total sales table.
      overHeadCost = padText("  OverHead Costs ", overHeadCost);
      totalSales = padText("  Product Sales  ", totalSales);

      // This section logs the table entry from the user for each variable.
      console.log(departmentID + '|' + departmentName + '|' + overHeadCost + '|' + totalSales + '|  ' + totalProfit);
    }

    connection.end();
    // This is the end of the script/connection.
  });

}
// This function adds a new department to the table.
function addNewDept() {

  // This section promots the user for new details about an item.
  prompt.start();
  console.log('\nPlease Complete The New Department Details:');
  prompt.get(['DepartmentName', 'OverHeadCosts', 'TotalSales'], function (err, result) {

    // This section collects/parses the variables departmentname, overheadcost, and total sales and shows the results.
    var departmentName = result.DepartmentName;
    var overHeadCost = result.OverHeadCosts;
    var totalSales = result.TotalSales;

    // This section updates the database for variables departmentname, overheadcosts, and totalsales.
    connection.query('INSERT INTO Departments SET ?', {
      DepartmentName: departmentName,
      OverHeadCosts: overHeadCost,
      TotalSales: totalSales
    }, function (err, res) {

      // This section is a refines error handler.
      if (err) {
        console.log('\nIm Sorry. Unfortunately The SQL Database Could Not Be Updated :( .\n' +
          'Please Ensure You Have Entered The Overhead And Sales As Numbers!');
        connection.end();
        // This is the end of the script/connection.
      } else {
        console.log('\nThe New Department Information Has Been Updated Successfully! Great Work! :) . ');
        connection.end();
        // This is the end of the script/connection.
      }

    });
    // This is the final end of the connection.

  });
  // This is the final end of the prompt.

}