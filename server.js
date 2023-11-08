require("dotenv").config();
const inquirer = require('inquirer');
const express = require("express");
const mysql = require("mysql2");
const PORT = process.env.PORT || 3001;
const app = express();

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    database: "employee_db",
    password: "password",
  },
  console.log(`Connected to the employee_db database.`)
);
db.connect((err) => {
  if (err);
  console.log("connected as id " + db.threadId);
});

function menuPrompt() {
  inquirer.prompt({
    type: "list",
    name: "start",
    message: "What would you like?",
    choices: [
      "View All Employees",
      "View All Departments",
      "View All Roles",
      "Add Employee",
      "Add Department",
      "Add Role",
      "Update Employee Role",
      "Exit",
    ],
  })
    .then((answer) => {
      switch (answer.start) {
        case "View All Employees":
          viewEmployees();
          break;
        case "View All Departments":
          viewDepartments();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "Update Employee Role":
          updateRole();
          break;
        case "Exit":
          db.end();
          break;
      }
    });
}

function viewDepartments() {
  db.query("SELECT * FROM department", function (err, results) {
    if (err) throw err;
    console.table(results);
    menuPrompt();
  });
}

function viewRoles() {
  db.query("SELECT * FROM role", function (err, results) {
    if (err) throw err;
    console.table(results);
    menuPrompt();
  });
}

function viewEmployees() {
  db.query("SELECT * FROM employee", function (err, results) {
    if (err) throw err;
    console.table(results);
    menuPrompt();
  });
}

function viewEmployees() {
  const sql = `
  SELECT employee.id,
  employee.first_name, 
  employee.last_name, 
  role.title, 
  department.name AS department, 
  role.salary, 
  CONCAT(manager.first_name, manager.last_name) AS manager`;
  db.query("SELECT * FROM employee", function (err, results) {
    if (err) throw err;
    console.table(results);
    menuPrompt();
  });
}
function viewDepartments() {
  db.query("SELECT * FROM department", function (err, results) {
    if (err) throw err;
    console.table(results);
    menuPrompt();
  });
}
function viewRoles() {
  db.query("SELECT * FROM role", function (err, results) {
    if (err) throw err;
    console.table(results);
    menuPrompt();
  });
}
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the first name of the employee?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the last name of the employee?",
      },
      {
        type: "input",
        name: "role_id",
        message: "What is the role ID of the employee?",
      },
    ])
    .then((answer) => {
      db.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.role_id,
          manager_id: answer.manager_id,
        },
        function (err, results) {
          if (err) throw err;
          console.log("Employee added.");
          menuPrompt();
        }
      );
    });
}
function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      name: "department",
      message: "What is the name of the department?",
    })
    .then((answer) => {
      db.query(
        "INSERT INTO department SET ?",
        { name: answer.department },
        function (err, results) {
          if (err) throw err;
          console.log("Department added.");
          menuPrompt();
        }
      );
    });
}
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the title of the role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of the role?",
      },
      {
        type: "input",
        name: "department_id",
        message: "What is the department ID of the role?",
      },
    ])
    .then((answer) => {
      db.query(
        "INSERT INTO role SET ?",
        {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.department_id,
        },
        function (err, results) {
          if (err) throw err;
          console.log("Role added.");
          menuPrompt();
        }
      );
    });
}
function updateRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employee_id",
        message: "What is the ID of the employee?",
      },
      {
        type: "input",
        name: "role_id",
        message: "What is the role ID of the employee?",
      },
    ])
    .then((answer) => {
      db.query(
        "UPDATE employee SET role_id = ? WHERE id = ?",
        [answer.role_id, answer.employee_id],
        function (err, results) {
          if (err) throw err;
          console.log("Role updated.");
          menuPrompt();
        }
      );
    });
}

menuPrompt();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
