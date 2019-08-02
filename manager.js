var mysql = require("mysql") ;
var inquirer = require("inquirer")
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'bamazon'
});

connection.connect(function (err) {
    console.log(err)
    if (err) {
        console.error("error connecting" + err.stack)
    } 

});

function managerPrompt() {
    inquirer.prompt({
                type: "list",
                name:"managerPrompts",
                choices:  ["Would you like to view products?", "View low inventory?", "Add to existing inventory?","Add new products?"],
                 message: "What task would you like to complete?"
    })
    .then(function(input) { 
        

    })

