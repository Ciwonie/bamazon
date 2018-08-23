var mysql = require('mysql');
var inquirer = require('inquirer');
require("dotenv").config();

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: 'bamazon'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    afterConnection();
});

var afterConnection = () => {
    var query = "SELECT item_id, product_name, price, stock_quantity FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log('\nBAMAZON Products: ')
        for (i in res) {
            console.log(`\nItem ID: ${res[i].item_id}  
            ||  Product: ${res[i].product_name}  
            ||  Price: ${res[i].price}  
            ||  Quantity: ${res[i].stock_quantity}
            ***************************************`)
        }
        purchasing();
        // connection.end();
    })
}

var purchasing = () => {
    inquirer
        .prompt([
            {
                name: 'action',
                type: 'input',
                message: "Please identify the product you would like to purchase with the product's ID",
                validate: function (value) {
                    if (isNaN(value) === false && value > 0 && value < 12) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: 'amount',
                type: 'input',
                message: 'How many would you like to purchase?',
                validate: function (value) {
                    if (isNaN(value) === false && value >= 0) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answer) {
            var query = `SELECT * FROM products where ?`;
            connection.query(query, { item_id: answer.action }, function (err, res) {
                var item = res[0];
                if (answer.amount > item.stock_quantity) {
                    reconnect();
                }
                else {
                    var totalCost = parseFloat(answer.amount * item.price).toFixed(2)
                    var remainingStock = parseInt(item.stock_quantity - answer.amount);
                    console.log(`
                    ${item.product_name} is currently in stock. 
                    You have selected ${answer.amount} to buy.
                    Total cost: $${totalCost}.
                    Remaining Stock: ${remainingStock}
                    `);
                    
                    var updateQuery = 'UPDATE products SET stock_quantity = ? Where item_id = ?';
                    connection.query(updateQuery, [remainingStock, answer.action], function(err, res) {
                        if (err) throw err;
                        console.log(`Changed ${res.changedRows} row`)
                    })
                    connection.end();
                }
            })
        })
}

// This function is called if the quantity chosen is invalid
var reconnect = () => {
    console.log('Insufficient quantity!')
    inquirer
        .prompt({
            name: 'retry',
            type: 'list',
            message: 'Would you like to order something else?',
            choices: [
                'Yes',
                'No'
            ]
        })
        .then(function (answer) {
            switch (answer.retry) {
                case 'Yes':
                    purchasing();
                    break;
                case 'No':
                    console.log("Thank you for your time, come back soon!");
                    connection.end();
            }
        })
}