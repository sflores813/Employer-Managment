const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table")


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password:"",
    database: "employee_databaseDB"
});
//starts connection to server
connection.connect(function(err) {
    if (err) throw err;
    start();
});

//function to start task

function start() {
    inquirer.prompt(
        {
         type: "list",
         message: "Welcome, scroll below to select youre choice",
         name: "options",
         choices: [
             "Add Deparment",
             "Add Role",
             "Add Employee",
             "View Department",
             "View Roles",
             "View Employee",
             "Update Employee Role",
             "Finish",
            ]   
           }
       )
   }
             
.then(function(result) {
    switch (result.options){
        case "Add Department":
            return addDepartment();
            break;
        case "Add Role":
            return addRoll();
            break;
        case "Add Employee":
            return addEmployee();
            break;
        case "View Role":
            return Viewoll();
            break;
        case "View Employee":
            return ViewEmployee();
            break;
        case "View Department":
            return ViewDepartment();
            break;
        case "Upadate Employee Role":
            return updateRole();
            break;
        case "Finish":
            stop();
            break;
    }
})