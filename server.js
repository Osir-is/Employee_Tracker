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
        type: "list",
        name:"UI",
        message:"What would you like to do?",
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
      switch (answers.UI) {
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
    });
  }

  function departmentInfo(){
    inquirer.prompt([
      {
        type:'input',
        message:'Rename the department ?',
        name:'department_name',
      }
    ])
    then((action) => {
      queriesDb.addDepartment(action.departmrnt_name, userInterface);
  });
}
    // using asynchronus functions to change role info

    async function RoleInfo() {
      const departmentChoices = await queriesDb.getDepartmentChoices();
      inquirer
        .prompt([
        {
          type: 'input',
          message: "What do you want to rename the new role to?",
          name: 'title',
        },
        {
          type: 'input',
          message: "What is the new role's calculated salary?",
          name: 'salary',
        },
        {
          type: 'list',
          message: "Which department is the new role part of?",
          choices: departmentChoices,
          name: 'department',
        },
      ])
        .then((action) => {
          queriesDb.addRole(action.title, action.salary, action.department, chooseAction);
      });
    }
    // a new asynchronus function to update employees info
    async function employeeInfo() {
      const roleChoices = await queriesDb.getRoleChoices();
      const managerChoices = await queriesDb.getEmployeeChoices();
      inquirer
        .prompt([
        {
          type: 'input',
          message: "please input the new employee's first name?",
          name: 'firstName',
        },
        {
          type: 'input',
          message: "please input the new employee's last name?",
          name: 'lastName',
        },
        {
          type: 'list',
          message: "please specify the new employee's role?",
          choices: roleChoices,
          name: 'role',
        },
        {
          type: 'list',
          message: "please specify the new employee's manager?",
          choices: managerChoices,
          name: 'manager',
        },
      ])
        .then((action) => {
          queriesDb.addEmployee(
            action.firstName, 
            action.lastName, 
            action.role,
            action.manager, 
            chooseAction
          );
      });
    }
    // asyn function to update current employee role & info
    async function UpdatedEmployeeInfo() {
      const roleChoices = await queriesDb.getRoleChoices();
      const employeeChoices = await queriesDb.getEmployeeChoices();
      inquirer
        .prompt([
        {
          type: 'list',
          message: "Please select employee role you wish to update?",
          choices: employeeChoices,
          name: 'employee',
        },
        {
          type: 'list',
          message: "please select new role to assign to employee",
          choices: roleChoices,
          name: 'role',
        },
      ])
        .then((action) => {
          queriesDb.updateEmployee(
            action.employee, 
            action.role, 
            chooseAction
            );
      });
    }
userInterface();