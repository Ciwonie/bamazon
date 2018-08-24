# Bamazon 
A Node.js and MySQL Project

# Project source can be downloaded from [Github](https://github.com/Ciwonie/bamazon.git)

## Author
Jonathan E. Cirone

# What it is
This program was designed to practice node.js and MySQL with a backend database that is interactable with node.

## How To
- ``` git clone https://github.com/Ciwonie/bamazon.git ```
- Use your terminal to access the file's root, then ``` npm init ``` to initialize the npm packages.
- Load up a MySQL interface, such as *MySQL Workbench*. Then copy the contents of ```bamazon.sql``` into a active server.
- Next, it will be important to input root and password data into both javascript files. For example:
```
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: process.env.USER,    <-------------Here
    password: process.env.PASSWORD,  <---------- and here
    database: 'bamazon'
});
```
If you want to continue using process.env.USER/PASSWORD you will need to create a .env file in your root. Then within the .env enter your
MySQL username and password
Format it like such:
```
USER=YOUR-USERNAME
PASSWORD=YOUR-PASSWORD

```
-Once your .env is setup, you should be able to connect to the database and interface with the code using the following commands:
```
node bamazonCustomer.js
node bamazonManager.js
```

# Enjoy!


### Screenshot Examples

