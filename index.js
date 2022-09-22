const sql = require('mysql2');
const inquirer = require('inquirer');


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
                    return addIntern();
                case "View all employees'":
                    return ;
                case "Add a department":
                    return ;
                case "Add a role":
                    return ;
                case "Add an employee":
                    return ;
                case "Update an employee role":
                    return ;
                case "Close app":
                    return;
            }
        })
}

// Call function to initialize app
mainMenu();


function viewAllDepartments() {
    
}

