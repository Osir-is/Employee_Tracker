// added in required varaibles
const inquirer = require("inquirer");
const mysql = require("mysql2");
const express = require("express");
const consoleTable = require("console.table");
const Query = require("mysql2/typings/mysql/lib/protocol/sequences/Query");
// added in middleware
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// creating database

const database = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Neuralink369",
    database: "Employee_Tracker_db",
  },
  console.log(`Connection to database established!`)
);

const queriesDb = new Queries(database)
function userInterface() {
  inquirer
    .prompt([
      {
        name: "What would like to do?",
        type: "list",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee role",
          "Quit Application",
        ],
      },
    ])
    .then((answers) => {
      // Use user feedback for... whatever!!
      switch (answers.action) {
        case "View all departments": 
          queries.viewDepartments(userInterface);
          break;
        case "View all roles":
          queries.viewRoles(userInterface);
          break;
        case "View all employees":
          queries.viewEmployees(userInterface);
          break;
        case "Add a department":
          getDepartmentInfo();
          break;
        case "Add a role":
          getRoleInfo();
          break;
        case "Add an employee":
          getEmployeeInfo();
          break;
        case "Update an employee role":
          getUpdatedEmployeeInfo();
          break;
        default: 
          database.end();
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
}
