// added in required varaibles
const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");
const Query = require("./library/Query.js");
// added in middleware
const PORT = process.env.PORT || 3001;

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

const queryDb = new Query(database);
function userInterface() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "UI",
        message: "What would you like to do?",
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
      console.log(answers)
      // Use user feedback for... whatever!!
      switch (answers.UI) {
        case "view all departments":
          queryDb.viewDepartments(userInterface);
          break;
        case "view all roles":
          queryDb.viewRoles(userInterface);
          break;
        case "view all employees":
          queryDb.viewEmployees(userInterface);
          break;
        case "add a department":
          departmentInfo();
          break;
        case "add a role":
          RoleInfo();
          break;
        case "add an employee":
          employeeInfo();
          break;
        case "update an employee role":
        UpdatedEmployeeInfo();
          break;
        default:
          database.end();
      }
    });
}

function departmentInfo() {
  inquirer.prompt([
    {
      type: "input",
      message: "Rename the department ?",
      name: "department_name",
    },
  ]);
  then((action) => {
    queryDb.addDepartment(action.departmrnt_name, userInterface);
  });
}
// using asynchronus functions to change role info

async function RoleInfo() {
  const departmentChoices = await queryDb.getDepartmentChoices();
  inquirer
    .prompt([
      {
        type: "input",
        message: "What do you want to rename the new role to?",
        name: "title",
      },
      {
        type: "input",
        message: "What is the new role's calculated salary?",
        name: "salary",
      },
      {
        type: "list",
        message: "Which department is the new role part of?",
        choices: departmentChoices,
        name: "department",
      },
    ])
    .then((action) => {
      console.log(action)
      queryDb.addRole(
        action.title,
        action.salary,
        action.department,
        userInterface
      );
    });
}
// a new asynchronus function to update employees info
async function employeeInfo() {
  const roleChoices = await queryDb.getRoleChoices();
  const managerChoices = await queryDb.getEmployeeChoices();
  console.log(roleChoices)
  console.log(managerChoices)
  inquirer
    .prompt([
      {
        type: "input",
        message: "please input the new employee's first name?",
        name: "firstName",
      },
      {
        type: "input",
        message: "please input the new employee's last name?",
        name: "lastName",
      },
      {
        type: "list",
        message: "please specify the new employee's role?",
        choices: roleChoices,
        name: "role",
      },
      {
        type: "list",
        message: "please specify the new employee's manager?",
        choices: managerChoices,
        name: "manager",
      },
    ])
    .then((action) => {
      queryDb.addEmployee(
        action.firstName,
        action.lastName,
        action.role,
        action.manager,
        userInterface
      );
    });
}
// asyn function to update current employee role & info
async function UpdatedEmployeeInfo() {
  const roleChoices = await queryDb.getRoleChoices();
  const employeeChoices = await queryDb.getEmployeeChoices();
  inquirer
    .prompt([
      {
        type: "list",
        message: "Please select employee role you wish to update?",
        choices: employeeChoices,
        name: "employee",
      },
      {
        type: "list",
        message: "please select new role to assign to employee",
        choices: roleChoices,
        name: "role",
      },
    ])
    .then((action) => {
      queryDb.updateEmployee(action.employee, action.role, userInterface);
    });
}

// error message

userInterface();
