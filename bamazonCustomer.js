//Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
var chalk = require("chalk");
var Table = require("cli-table");

// Variables that will be used in the inquirer function
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

//function to display the table//
var showProducts = function (cb) {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        var table = new Table({
            head: (chalk.cyan["ID", "Product", "Department", "Price"]),
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
            displayProducts(ask);
        } else {
            console.log(chalk.magenta(`

Thanks for shopping at Bamazon!  Have a nice day!`));

            connection.end();
        }
    });
};

//function to update stock after purchase has been maded
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
        connection.query("UPDATE products SET stock_quantity = ?, product_sales = ? WHERE ?", [remainingInventory, total_cost, {
            item_id: product_id
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
