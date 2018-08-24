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
    console.log('Connected as Managerial ID ' + connection.threadId);
    afterConnection();
});

var afterConnection = () => {

    inquirer
        .prompt({
            name: 'actions',
            type: 'list',
            message: `\nHello Manager ${connection.threadId}, what would you like to do today?`,
            choices: [
                'View Products for Sale',
                `View Low Inventory`,
                `Add to Inventory`,
                `Add New Product`
            ]
        })
        .then(function (answer) {
            switch(answer.actions) {
                case 'View Products for Sale':
                    viewInventory();
                    break;

                case 'View Low Inventory':
                    lowInventory();
                    break;
                
                case 'Add to Inventory':
                    addInventory();
                    break;
                
                case 'Add New Product':
                    newProduct();
                    break;
            }
        })
}

var viewInventory = () => {
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
        reconnect();
    })
}

var lowInventory = () => {
    var query = `SELECT * FROM products where stock_quantity < 5`;
            connection.query(query, function (err, res) {
                console.log(`\nLow Stocks: `)
                for (i in res) {

                    if (res[i].stock_quantity < 5) {
                        console.log(`\nItem ID: ${res[i].item_id}  
                        ||  Product: ${res[i].product_name}  
                        ||  Price: ${res[i].price}  
                        ||  Quantity: ${res[i].stock_quantity}
                        ***************************************`)
                    }
                    else {
                        console.log('Inventory is well stocked!')
                        reconnect();
                    }
                }
            reconnect();
        });
}

var addInventory = () => {
    inquirer
    .prompt([
        {
            name: 'action',
            type: 'input',
            message: "Please identify the product ID",
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
            message: 'How many would you like to add?',
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
        connection.query(query, { item_id: answer.action }, function(err, res) {
            var item = res[0];
            var quantity = parseInt(item.stock_quantity);
            var newTotal = parseInt(answer.amount) + quantity;

            var updateQuery = 'UPDATE products SET stock_quantity = ? Where item_id = ?';
            connection.query(updateQuery, [newTotal, answer.action], function(err, res) {
                if (err) throw err;

                var finalQuery = 'SELECT * FROM products where ?';
                connection.query(finalQuery, { item_id: answer.action }, function(err, res) {
                    console.log(`\n${res[0].product_name} has been updated. \nNew Stock Quantity: ${res[0].stock_quantity}`);
                    reconnect();
                })
            })

        })
    });
}

var newProduct = () => {
    inquirer
        .prompt([
            {
                name: 'name',
                type: 'input',
                message: 'What is the name of the item you would like to add?'
            },
            {
                name: 'department',
                type: 'input',
                message: 'Which department is this item assigned to?'
            },
            {
                name: 'price',
                type: 'input',
                message: 'What is the price per unit of the item?'
            },
            {
                name: 'stock',
                type: 'input',
                message: 'How many units would you like to add?'
            }
        ])
        .then(function(answer) {
            var inputName = answer.name,
                inputDepartment = answer.department,
                inputPrice = answer.price,
                inputStock = answer.stock;
            
            var query = 'INSERT INTO products SET ?';
            connection.query(query, { product_name: inputName, department_name: inputDepartment, price: inputPrice, stock_quantity: inputStock }, function(err, res) {
                console.log('\nProduct has been added!');
                reconnect();
            })
        })
}

var reconnect = () => {
    inquirer
        .prompt({
            name: 'retry',
            type: 'list',
            message: 'Would you like to manage something else?',
            choices: [
                'Yes',
                'No'
            ]
        })
        .then(function (answer) {
            switch (answer.retry) {
                case 'Yes':
                    afterConnection();
                    break;
                case 'No':
                    console.log(`Good-Bye Manager ${connection.threadId}`);
                    connection.end();
            }
        })
}