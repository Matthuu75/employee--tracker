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
    start();
});