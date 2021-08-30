const inquirer = require('inquirer');
const mysql = require("mysql2");
const express = require("express");
const consoleTable = require('console.table')
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

 