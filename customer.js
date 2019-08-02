var inquirer = require("inquirer");
var mysql = require("mysql");
//  require ("console.table") 

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'bamazon'
});

//   console.log (connection)
connection.connect(function (err) {
    console.log(err)
    if (err) {
        console.error("error connecting" + err.stack)
    }

    productDisplay();

});

function productDisplay() {
    connection.query("SELECT * FROM bamazon.products", function (err, resonse) {
        if (err) throw err
        console.table(resonse)
        customerPrompt(resonse)
    });




};

function customerPrompt() {
    inquirer.prompt([{
                name: "product",
                message: "Please enter the ID number of the item you would like to purchase.",
                type: "input",

            },
            {
                name: "amount",
                message: "How many units would you like to purchase?",
                type: "input",

            }
        ])
        .then(function (data) {
            let id = data.product
            let amount = data.amount
            purchase(id, amount);

        })


};


function purchase(item,quantity) {
    connection.query(`SELECT * FROM bamazon.products WHERE item_id  = ${item}`, function (err, resonse) {
        if (err) throw err.stack;
        console.log(resonse);
        if(resonse[0].stock_quantity >= quantity) {
            var cartTotal = resonse[0].price * quantity
            var left = resonse[0].stock_quantity - quantity
            
            console.log(`Congrats, you have purchased ${quantity} ${resonse[0].product_name} \n Your car total is $${cartTotal} ` )

            updateDB(item,left)
        }
        else if (resonse[0].stock_quantity < quantity ) {0
            console.log(`We only have ${resonse[0].stock_quantity} of ${resonse[0].product_name}`)
            customerPrompt()
            
        }
        
        // console.table(resonse)
        // customerPrompt(resonse) 




    });




};

function updateDB(id,quantity){
    connection.query(`UPDATE products SET  stock_quantity = ${quantity} WHERE item_id  = ${id}`, function(err,resonse){
        if (err) throw err.stack;
        console.log("Products updated");
        productDisplay()
    })

}
