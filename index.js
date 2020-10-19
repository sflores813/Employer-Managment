const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table")

// -- start connections
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employee_databaseDB"
});

connection.connect(function(err) {
    if (err) throw err;
    start();
});
//-- function to bring up prompts
function start(){
    inquirer.prompt(
        {
type: "list",
message: "Select a task from below!",
name: "options",
choices: [
    "Add Department",
    "Add Role",
    "Add Employee",
    "View Departments",
    "View Roles",
    "View Employees",
    "Update Employee Role",
    "finish",
        ]
    })

.then(function(result) {
    switch (result.options){
        case "Add Department":
            return addDepartment();
            break;
        case "Add Role":
            return addRole();
            break;
        case "Add Employee":
            return addEmployee();
            break;
        case "View Departments":
            return viewDepartments();
            break;
        case "View Roles":
            return viewRoles();
            break;
        case "View Employees":
            return viewEmployees();
            break;
        case "Update Employee Role":
            return updateRole();
            break;
            case "finish":
                stop();
                break;

    };
});
};
//-- function to add department data
function addDepartment(){
    inquirer.prompt([{
        type: "input",
        name: "department name",
        message: "What is the name of the department?",
    }])
    .then(function(res){
        connection.query('INSERT INTO department (name) VALUES (?)', (res.department), function(err){
            if (err) throw err;
        })
    start();
    })
};

//-- function to add role data
function addRole() {
    inquirer.prompt([{
        type: "input",
        name: "title",
        message: "What is the title of the role?",
    }, {
        type: "number",
        name: "salary",
        message: "What is the salary to be expected?",
    }, {
        type: "number",
        name: "department_id",
        message: "What is the departments ID?",
    }]).then(function(res) {
        connection.query("INSERT INTO role (title, salary, department_id) values (?, ?, ?)", [res.title, res.salary, res.department_id], function(err, data) {
            if (err) throw err;
             console.table(data);
        })
        start();
    })

};
//-- function to add  to add employee data
function addEmployee() {
    // prompt for info
    inquirer.prompt([{
        type: "input",
          name: "firstName",
          message: "What is the first name of the employee you would like to edit?"
        },
        {
            type: "input",
          name: "lastName",
          message: "What is the last name of the employee you would like to edit?"
        },
        {
            type: "number",
          name: "roleID",
          message: "What is the roleID number?",
        },
        {
            type: "number",
          name: "managerID",
          message: "What is the employee's manager ID?",
        },
      ])
      .then(function (answer) {
        //-- function to insert dat into table
        connection.query(
          "INSERT INTO employee SET ?", {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: answer.roleID,
            manager_id: answer.managerID
          },
          function (err) {
            if (err) throw err;
            console.table(`${answer.firstName} ${answer.lastName} it worked!`);
            start();
          }
        );
      });
  }
  //-- function to view departments
    function viewDepartments() {
        connection.query("SELECT * FROM department", function(err, res) {
            console.table(res);
            if (err) throw err;
            start();
        });
    };
    //-- function to view roles
    function viewRoles() {
        connection.query("SELECT * FROM role", function(err, res) {
            console.table(res);
            if (err) throw err;
            start();
        });
    };
    //-- function to view employees
    function viewEmployees() {
        connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id",
            function(err, res) {
                console.table(res);
                if (err) throw err;
                start();
            });
    };
    //-- function to update Roles
    function updateRole() {
        inquirer.prompt([
          {
            type: "input",
            name: "firstname",
            message: "What is the first name of the employee you would like to update?",
          },
          {
            type: "input",
            name: "lastname",
            message: "What is the last name of the employee you would like to update?",
          },
          {
            type: "input",
            name: "UpdateInfo",
            message: "What would you like to update?",
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
      //-- function to stop connection
    function stop() {
        connection.end();
        process.exit();
    }