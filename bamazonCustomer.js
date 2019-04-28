//Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
var chalk = require("chalk");
var Table = require("cli-table");

// global variables that will be used in the inquirer function
var productId;
var productName;

//MySQL connection information
require("dotenv").config();

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

//function to display the inventory in table format//

var showProducts = function (cb) {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    var table = new Table({
      head: ["ID", "Product", "Department", "Price"],
      colWidths: [5, 30, 30, 8]
    });
    for (var i = 0; i < res.length; i++) {
      table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price]);
    }
    console.log(table.toString());
    console.log(chalk.green("------------------------------------------------------"));
    cb();
  });
};

//function to use when finished shopping//

var doneShopping = function () {
  inquirer.prompt([{
    type: "list",
    name: "done",
    message: "Did you want to buy anything else?",
    choices: ["Yes", "No"]
  }]).then(function (done) {
    console.log(done.done);
    if (done.done === "Yes") {
      showProducts(askShopper);
    } else {
      console.log(chalk.magenta(`

Thanks for shopping at Bamazon!  Have a nice day!`));

      connection.end();
    }
  });
};

//function to update stock after purchase has been made

var updateProducts = function (quantity, purchased, price) {
  let total_cost = parseFloat(purchased) * parseFloat(price);
  let remainingInventory = quantity - purchased;
  if (remainingInventory < 0) {
    console.log(chalk.red(`
        
Insufficent quantity!
we currently do not have enough in stock.

`))
    doneShopping();
  } else {
    connection.query("UPDATE products SET stock_quantity = ?, product_sales = ? WHERE ? ", [remainingInventory, total_cost, {
      item_id: productId
    }], function (err, res) {
      if (err) throw err;
      console.log(chalk.green("-------------------------------------"));
      console.log("You just purchased " + purchased + " " + productName + "(s)");
      console.log("The total cost is $" + total_cost);
      console.log(chalk.green("-----------------------------------"));
      doneShopping();
    });
  }
};

//Ask end user function//

var askShopper = function () {

  inquirer.prompt([

    {
      type: "input",
      name: "item",
      message: "What would you like to buy?  Select by Item #",
    },
    {
      type: "input",
      name: "quantity",
      message: "How many would you like?",
    }

  ]).then(function (bamazon) {
    productId = bamazon.item;
    if (bamazon.quantity > 1) {
      endingString = "s.";
    } else {
      endingString = ".";
    };

    connection.query("SELECT product_name, stock_quantity, price FROM products WHERE ?", {
      item_id: bamazon.item
    }, function (err, res) {
      if (err) throw err;
      productName = res[0].product_name;
      updateProducts(res[0].stock_quantity, bamazon.quantity, res[0].price);
    });
  });
};

showProducts(askShopper);