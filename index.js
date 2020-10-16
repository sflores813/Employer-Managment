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
    };
});
};

// function to add a department
    function addDepartment(){
        inquirer.prompt([{
            type: "input",
            message: "What is the department name?",
            name: "department",
        }])
        .then(function(res){
            connection.query('INSERT INTO department (name) Values (?)', (res,departmet), function(err){
                if (err) throw err;
            })
            start();
        })
    };

    // function to add role data
    function addRole() {
        inquirer.prompt([{
            type: " input",
            name: "title",
            message: "What is the employee's role?:",
        }, {
            type: "number",
            name: "salary"
            message: "What is the employees salary?",
        },
            type:    
        }])
    }

    //function to add employee data
    funtion addEmployee() {
        inquirer.prompt([{
        name:"firstname",
        type: "input",
        message: "What is the Employees name?",
        }, {
        name:"lastname",
        type: "input",
        message: "What is the Employees last name?",
        }, {
        name: "role",
        type:"input",
        message:"Whats is the employee role?"    
        }, {
        name: "ID",
        type:"number",
        message:"Whats is the employee ID number?"    
        }, {
        name: "Employee Manager",
        type:"input",
        message:"Who is the employee's manager?"    
        },
     ])
     .then(function (answer) {
        //inserts the entered employee into data base
        connection.query(
            "INSERT INTO employee SET ?", {
                first_name: answer.firstname,
                last_name: answer.last_name,
                role: answer.role,
                ID: answer.ID,
                Employee_Manager: answer.Employee_Manager
            },
            function (err) {
                if (err) throw err;
                console.table(`${answer.firstName} ${answer.last_name} added successfully`)
                start();
            }
        );
     });
    }
        


    // function to View role

function viewRoles() {
    connection.query("SELECT * FROM role" , function(err,res) {
        console.table(res);
        if (err) throw err;
        start();
    });
};

    //function to update update roles
    function updateRole() {
        inquirer.prompt([
            {
                type:"input",
                message: "What is the first name of the employee you would like to update?",
                name:"first name",
            },
            { 
            type: "input",
            message:"What is the last name of the employee you would like to update?",
            },
            {
                type:"input",
                message:"What you like to update?",
                name:"employee update"
            }
        ])
        .then(function (answer) {
            const query = "UPDATE employee SET role_id = " + answer.UpdateInfo + " WHERE first_name = '" + answer.firstName + "' and last_name='" + answer.lastName + "'";
      
            connection.query(query, function (err, res) {
              if (err) throw err;
            })
            start();
        })
    }
    // function to View employee

    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id",")
    function(err, res) {
        console.table(res);
        if(err) throw err;
        start();
    });



    // function to View department

function ViewDepartment() {
    connection.query("SELECT * FROM department", function(err, res){
        console.table(res),
        if(err); throw err;
        start();
    });
};


    // function to Update employee



    // function to finish
    function stop() {
        connection.end();
        process.exit();
    }



    