const mysql = require('mysql2');
const inquirer = require('inquirer');

//const connection = require('./db/sqlconnect'); //require connection to database

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'root1234',
      database: 'employees_db'
    },
    console.log(`Connected to the employee tracker database.`)
  );

const menuQuestions = [
    {
        type: 'list',
        name: 'menu',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employees manager', 'Delete department, role, or employee', 'Exit'],
        message: 'Please select an option from the menu.'
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
                case "View all employees":
                    return viewAllEmployees();
                case "Add a department":
                    return addDepartment();
                case "Add a role":
                    return addRole();
                case "Add an employee":
                    return addEmployee();
                case "Update an employees manager":
                    return updateEmployee();
                case "Delete department, role, or employee":
                    return deleteMenu();
                case "Exit":
                    return;
            }
        })
}

// Call function to initialize app
init();

function init() {
    db.connect(err => {
        if(err) throw err;
        mainMenu();
    })
}


function viewAllDepartments() {
    const dept = `SELECT department.id AS Department_ID, department.name AS Department FROM department`

    db.query(dept, (err,res) => {
        if(err) throw err;
        console.table(res);
        mainMenu();
    })
}

function viewAllRoles() {{
    const roles = `SELECT roles.id AS Role_ID, roles.title AS Job_Title, roles.salary AS Salary, department.name AS Department FROM roles INNER JOIN department ON roles.department_id = department.id`;

    db.query(roles, (err,res) => {
        if(err) throw err;
        console.table(res);
        mainMenu();
    })
}}

function viewAllEmployees() {
    const employees = `SELECT employees.id AS Employee_ID, employees.first_name AS First_Name, employees.last_name AS Last_Name, roles.title AS Job_Title, department.name AS Department, roles.salary AS Salary, employees.manager_id FROM employees JOIN roles ON roles.id = employees.role_id JOIN department ON roles.department_id = department.id ORDER BY employees.id`;

    db.query(employees, (err,res) => {
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
        const addQuery = `INSERT INTO department (name) VALUES ('${res.name}')`; 
        db.query(addQuery, newDept, (err) => {
            if(err) throw err;
            console.log("~New department has been added~");
            viewAllDepartments();
        })
    })
}

function addRole() {
    inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'Enter the job title you would like to add.',
        },
        {
            name: 'salary',
            type: 'input',
            message: 'Enter the salary for the new role.',
        },
        {
            name: 'department',
            type: 'input',
            message: 'Enter the department ID this role belongs to.'
        }
    ])
    .then(res => {
        const addQuery = `INSERT INTO roles (title, salary, department) VALUES ('${res.title}', '${res.salary}', '${res.department}')`;
        db.query(addQuery, (err) => {
            if(err) throw err;
            console.log("~New role has been added~");
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
            message: 'Enter the manager ID for this employee (press enter to skip).',
        }
    ])
    .then(res => {
        const addQuery = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${res.first_name}', '${res.last_name}', '${res.role}', '${res.manager}')`;
        db.query(addQuery, (err) => {
            if(err) throw err;
            console.log("~New employee has been added~");
            viewAllEmployees();
        })
    })
}

function updateEmployee() {
    inquirer.prompt([
        {
            name: 'employeeID',
            type: 'input',
            message: 'Enter the employee ID to update.',
        },
        {
            name: 'managerID',
            type: 'input',
            message: 'Enter the new manager ID for this employee.'
        }
    ])
    .then(res => {
        const updateQuery = `UPDATE employees SET manager_id = '${res.managerID}' WHERE id = '${res.employeeID}'`;
        db.query(updateQuery, (err) => {
            if(err) throw err;
            console.log("~Employee manager has been updated~");
            viewAllEmployees();
        })
    })
}
