# **bamazon-app**

UNC Charlotte Coding Bootcamp - Homework # 12 - Node.js & MySQL

###### **Description:**

A Node based application that takes a customer input from an inventory table and returns the selections requested. The inventory gets updated dynamically as items are purchased by customer.

Technologies used:

Node.js : <https://nodejs.org/en/about/>

Dotenv: <https://www.npmjs.com/package/dotenv>

MySQL: <https://www.npmjs.com/package/mysql>

Inquirer: <https://www.npmjs.com/package/inquirer>

CLI-Table: <https://www.npmjs.com/package/cli-table>

Chalk: <https://www.npmjs.com/package/chalk>

###### **Demonstration:**

Customer sees an inventory table(cli-table) and the app prompts for a selection from the inventory (inquirer). Once the customer is done shopping, the app will display the total cost of the items and will update the database (mysql):

![](bamazon1.gif)

 

The customer also has the ability to choose more than one item from the inventory: 

![](bamazon2.gif)

 

If the customer chooses an item and there is not enough in the inventory, the app will display that there is not enough available:

![](bamazon3.gif)