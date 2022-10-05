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
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add new department', 'Add new role', 'Add new employee', 'Update an employee manager', 'Delete employee', 'Exit'],
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
                case "Add new department":
                    return addDepartment();
                case "Add new role":
                    return addRole();
                case "Add new employee":
                    return addEmployee();
                case "Update an employee manager":
                    return updateEmployee();
                case "Delete employee":
                    return deleteEmployee();
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
            message: "Enter the name of the department you would like to add.",
            validate: (name) => {
                if (name) {
                  return true;
                } else {
                    return "Please enter a Department name";
                }
            }   
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
            validate: (title) => {
                if (title) {
                  return true;
                } else {
                    return "Please enter a job title";
                }
            }
        },
        {
            name: 'salary',
            type: 'input',
            message: 'Enter the salary for the new role.',
            validate: (salary) => {
                if (isNaN(salary)) {
                  return "Please enter a valid salary"
                } else {
                    return true;
                }
            }
        },
        {
            name: 'department',
            type: 'input',
            message: 'Enter the department ID this role belongs to.'
        }
    ])
    .then(res => {
        const addQuery = `INSERT INTO roles (title, salary, department_id) VALUES ('${res.title}', '${res.salary}', '${res.department}')`;
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
            validate: (first_name) => {
                if (first_name) {
                  return true;
                } else {
                    return "Please enter a first name.";
                }
            }
        },
        {
            name: 'last_name',
            type: 'input',
            message: 'Enter the employees last name.',
            validate: (last_name) => {
                if (last_name) {
                  return true;
                } else {
                    return "Please enter a last name.";
                }
            }
        },
        {
            name: 'role',
            type: 'input',
            message: 'Enter the role ID this employee belongs to.',
            validate: (role) => {
                if (role) {
                  return true;
                } else {
                    return "Please enter a role ID.";
                }
            }
        },
        {
            name: 'manager',
            type: 'input',
            message: 'Enter the manager ID for this employee.',
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


//Bonus functions
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

function deleteEmployee() {
    inquirer.prompt([
        {
            name: 'employeeID',
            type: 'input',
            message: 'Enter the employee ID to delete.'
        }
    ])
    .then(res => {
        const deleteQuery = `DELETE FROM employees WHERE id = '${res.employeeID}'`;
        db.query(deleteQuery, (err) => {
            if(err) throw err;
            console.log("~Employee has been deleted~");
            viewAllEmployees();
        })
    })
}

