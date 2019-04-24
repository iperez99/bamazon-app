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
