const consoleTable = require('console.table');

class Query {
    constructor(db) {
        this.db = db;
    }

    viewDepartments(func) {   
        this.db.query('SELECT * FROM department;', function (err, result) {
            console.log(`\n`);
            console.table(result);
            func();
        }); 
    }

    viewRoles(func) {
        this.db.query('SELECT title, salary, department.name AS department FROM role JOIN department ON role.department_id = department.id;', function (err, result) {
            console.log(`\n`);
            console.table(result);
            func();
        }); 
    }

    viewEmployees(func) {
        this.db.query('SELECT employee.id, first_name, last_name, role.title AS title, role.salary AS salary, manager_id FROM employee JOIN role ON employee.role_id = role.id;', function (err, result) {
            console.log(`\n`);
            console.table(result);
            func();
        }); 
    }

    addDepartment(name, func) {
        this.db.query(`INSERT INTO department(name) VALUES ("${name}");`, function (err, result) {
            if (err) {
                console.error(err)
            } else {
                console.log(`Database updated with new department.`);
            }
            func();
        }); 
    }

    addRole(title, salary, department, func) {
        this.db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${title}", ${salary}, ${department});`, function (err, result) {
            if (err) {
                console.error(err)
            } else {
                console.log(`Database updated with new role.`)
            }
            func();
        }); 
    }

    addEmployee(firstName, lastName, role, manager, func) {
        this.db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", ${role}, ${manager});`, function (err, result) {
            if (err) {
                console.error(err)
            } else {
                console.log(`Database updated with new employee.`)
            }
            func();
        }); 
    }

    updateEmployee(id, role, func) {
        this.db.query(`UPDATE employee SET role_id = ${role} WHERE id = ${id};`, function (err, result) {
            if (err) {
                console.error(err)
            } else {
                console.log(`Employee records updated.`)
            }
            func();
        }); 
    }

    // an array of choices which allows values to be saved
    async getDepartmentChoices() {
        const [data] = await this.db.promise()
            .query('SELECT id, name FROM department;');
     const departmentChoices = data.map(result => {return{name: result.name, value:result.id}})
     return departmentChoices;
    }


    async getRoleChoices(){
        const [data] = await this.db.promise()
        .query('SELECT id, title FROM role;');
        const roleChoices =data.map(result => {return{name: result.title, value:result.id}})
    return roleChoices;
    }

    async getEmployeeChoices(){
        const [data] = await this.db.promise()
            .query('SELECT * FROM employee WHERE manager_id IS NULL;');
            console.log(data)
            const managerChoices = data.map(result => {return{name: `${result.first_name}  ${result.last_name}`, value: result.id}})
            return managerChoices;
    }



}
module.exports = Query;