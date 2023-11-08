const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3000;
const app = express();

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        database: 'employee_tracker',
        password: 'password'
    },
    console.log(`Connected to the employee_tracker database.`)
);
db.connect((err) => {
    if (err) throw err;
    console.log('connected as id ' + db.threadId);
});

function menuPrompt() {
    inquirer.prompt({
        type: 'list',
        name: 'start',
        message: 'What would you like?',
        choices: [
            'View All Employees',
            'View All Departments',
            'View All Roles',
            'Add Employee', 
            'Add Department', 
            'Add Role', 
            'Update Employee Role',
            'Exit'
        ]
    }).then(answer => {
        switch (answer.start) {
            case 'View All Employees':
                viewEmployees();
                break;
            case 'View All Departments':
                viewDepartments();
                break;
            case 'View All Roles':
                viewRoles();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Update Employee Role':
                updateRole();
                break;
            case 'Exit':
                db.end();
                break;
        }
    });
}
