const mysql = require('mysql2');
const inquirer = require('inquirer');

const connection = require('./db/sqlconnect'); //require connection to database


const menuQuestions = [
    {
        type: 'list',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Close app'],
        message: 'What would you like to do?'
    }
];


// Function for menu questions 
function mainMenu() {
    inquirer.prompt(menuQuestions)
        .then((res) => {
            switch(res.menu){
                case "View all departments":
                    return viewAllDepartments();
                case "View all roles":
                    return viewAllRoles();
                case "View all employees'":
                    return viewAllEmployees();
                case "Add a department":
                    return addDepartment();
                case "Add a role":
                    return addRole();
                case "Add an employee":
                    return addEmployee();
                case "Update an employee role":
                    return updateEmployee();
                case "Close app":
                    return;
            }
        })
}

// Call function to initialize app
init();

function init() {
    connection.connect(err => {
        if(err) throw err;
        mainMenu();
    })
}


function viewAllDepartments() {
    const dept = `SELECT department.id AS ID, department.name AS Department FROM department`

    connection.query(dept, (err,res) => {
        if(err) throw err;
        console.table(res);
        mainMenu();
    })
}

function viewAllRoles() {{
    const roles = `SELECT role.id AS ID, role.title AS Job_Title, role.salary AS Salary, department.name AS Department FROM role INNER JOIN department ON role.department_id = department.id`;

    connection.query(roles, (err,res) => {
        if(err) throw err;
        console.table(res);
        mainMenu();
    })
}}

function viewAllEmployees() {
    const employees = `SELECT employee.id AS ID, employee.first_name AS First_Name, employee.last_name AS Last_Name, role.title AS Job_Title, department.name AS Department, role.salary AS Salary, employee.manager_id FROM employee JOIN role ON role.id = employee.role_id JOIN department ON role.department_id = department.id ORDER BY employee.id`;

    connection.query(employees, (err,res) => {
        if(err) throw err;
        console.table(res);
        mainMenu();
    })
}


function addDepartment() {
    inquirer.prompt([
        {
            name: 'name',
            type: 'input',
            message: "Enter the name of the department you would like to add."
        }
    ])
    .then(res => {
        let newDept = res.name;
        const addQuery = `INSERT INTO department SET ?`; 
        connection.query(addQuery, newDept, (err) => {
            if(err) throw err;
            console.log("Added new department!");
            viewAllDepartments();
        })
    })
}

function addRole() {
    inquirer.prompt([
        {
            name: 'role',
            type: 'input',
            message: 'Enter the role you would like to add.',
        },
        {
            name: 'salary',
            type: 'input',
            message: 'Enter the salary for the new role.',
        },
        {
            name: 'department',
            type: 'input',
            message: 'Enter the department ID this role belong to.'
        }
    ])
    .then(res => {
        const addQuery = `SELECT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${res.first}', '${res.last}', '${res.role}', '${res.manager}')`;
        connection.query(addQuery, (err) => {
            if(err) throw err;
            console.log("Added new role!");
            viewAllRoles();
        })
    })
}

function addEmployee() {
    inquirer.prompt([
        {
            name: 'first_name',
            type: 'input',
            message: 'Enter the employees first name.',
        },
        {
            name: 'last_name',
            type: 'input',
            message: 'Enter the employees last name.',
        },
        {
            name: 'role',
            type: 'input',
            message: 'Enter the role ID this employee belongs to.',
        },
        {
            name: 'manager',
            type: 'input',
            message: 'Enter the manager ID this employee is under.',
        }
    ])
    .then(res => {
        const addQuery = `SELECT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${res.first}', '${res.last}', '${res.role}', '${res.manager}')`;
        connection.query(addQuery, (err) => {
            if(err) throw err;
            console.log("Added new role!");
            viewAllRoles();
        })
    })
}
