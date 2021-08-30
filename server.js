// added in required varaibles
const inquirer = require('inquirer');
const mysql = require("mysql2");
const express = require("express");
const consoleTable = require('console.table')
// added in middleware
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// creating database

const database = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'Neuralink369',
    database: 'Employee_Tracker_db'
  },
  console.log(`Connection to database established!`)
)

inquirer
  .prompt([
    {
        name: "What would like to do?",
        type:"list",
        choices:["view all departments","view all roles","view all employees","add a department","add a role","add an employee","update an employee role"]

}
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });

 