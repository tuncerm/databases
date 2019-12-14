const mysql = require('mysql');
const aSync = require('async');

const data = {
    employees: [
        { emp_no: 101, emp_name:'Pikachu', salary: 100, reports_to: null },
        { emp_no: 102, emp_name: 'Squirtle', salary: 50, reports_to: 105 },
        { emp_no: 103, emp_name: 'Balbasour', salary: 60, reports_to: 109 },
        { emp_no: 104, emp_name: 'Charmender', salary: 75, reports_to: 107 },
        { emp_no: 105, emp_name: 'Ratata', salary: 15, reports_to: 101 },
        { emp_no: 106, emp_name: 'Caterpie', salary: 23, reports_to: 102 },
        { emp_no: 107, emp_name: 'Weedle', salary: 25, reports_to: 104 },
        { emp_no: 108, emp_name: 'Pidgey', salary: 20, reports_to: 103 },
        { emp_no: 109, emp_name: 'Nidoran', salary: 10, reports_to: 106 },
        { emp_no: 110, emp_name: 'Jigglypuff', salary: 0, reports_to: 105 }
    ], 
    departments: [
        { dept_no: 101, dept_name: 'Cartoon', manager: 101 },
        { dept_no: 102, dept_name: 'Customer Service', manager: 102 },
        { dept_no: 103, dept_name: 'Anime', manager: 103 },
        { dept_no: 104, dept_name: 'Manga', manager: 104 },
        { dept_no: 105, dept_name: 'Light Novel', manager: 105 },
        { dept_no: 106, dept_name: 'Marketing', manager: 106 },
        { dept_no: 107, dept_name: 'Movies', manager: 107 },
        { dept_no: 108, dept_name: 'Advertising', manager: 108 },
        { dept_no: 109, dept_name: 'Production', manager: 109 },
        { dept_no: 110, dept_name: 'Accounting', manager: 100 },
    ],
    projects: [
        { proj_no: 'PJ101', proj_name: 'Cartoon Season 1', starting_date: '2000-01-01', ending_date: '2000-12-31' },
        { proj_no: 'PJ102', proj_name: 'Cartoon Season 2', starting_date: '2001-01-01', ending_date: '2001-12-31' },
        { proj_no: 'PJ103', proj_name: 'Cartoon Season 3', starting_date: '2003-01-01', ending_date: '2002-12-31' },
        { proj_no: 'PJ104', proj_name: 'Movie 01', starting_date: '2000-01-01', ending_date: '2000-12-31' },
        { proj_no: 'PJ105', proj_name: 'Movie 02', starting_date: '2001-01-01', ending_date: '2000-12-31' },
        { proj_no: 'PJ106', proj_name: 'Movie 03', starting_date: '2002-01-01', ending_date: '2000-12-31' },
        { proj_no: 'PJ107', proj_name: 'Movie 04', starting_date: '2003-01-01', ending_date: '2000-12-31' },
        { proj_no: 'PJ108', proj_name: 'Movie 05', starting_date: '2004-01-01', ending_date: '2000-12-31' },
        { proj_no: 'PJ109', proj_name: 'Movie 06', starting_date: '2005-01-01', ending_date: '2000-12-31' },
        { proj_no: 'PJ110', proj_name: 'Movie 07', starting_date: '2006-01-01', ending_date: '2000-12-31' },
    ]
};

const opts = {
    host     : 'localhost',
    user     : 'hyfuser',
    password : 'hyfpassword'
};

let connection = mysql.createConnection(opts);

connection.connect();
aSync.series([
    function(callback) {
        connection.query("DROP DATABASE IF EXISTS company", callback);
    },
    function(callback) {
        connection.query("CREATE DATABASE company", callback);
    }
], function (err, result) {
    connection.end();
    opts.database = 'company';    
    connection = mysql.createConnection(opts);
    connection.connect();
    aSync.parallel([
        function(callback) {
            // reports_to should be a foreign key, but I did not know if it should report to a person or a department.
            connection.query("CREATE TABLE employees(emp_no INT NOT NULL, emp_name VARCHAR(20) NOT NULL, salary INT NOT NULL, reports_to INT )", (err, result)=>{
                aSync.each(data.employees, (item, cb)=>{
                    connection.query(`INSERT INTO employees SET ? `, item, cb);  
                }, callback);
            });
        },
        function(callback) {
            // manager is probably an employee. It should be a foreign key. 
            connection.query("CREATE TABLE departments(dept_no INT NOT NULL, dept_name VARCHAR(20) NOT NULL, manager INT)", (err, result)=>{
                aSync.each(data.departments, (item, cb)=>{
                    connection.query(`INSERT INTO departments SET ? `, item, cb);  
                }, callback);
            });
        },
        function(callback) {
            // Projects should have persons running them or have departments managing them. Anyway...
            connection.query("CREATE TABLE projects(proj_no VARCHAR(15) NOT NULL, proj_name VARCHAR(20) NOT NULL, starting_date DATE, ending_date DATE)", (err, result)=>{
                aSync.each(data.projects, (item, cb)=>{
                    connection.query(`INSERT INTO projects SET ? `, item, cb);  
                }, callback);
            });
        }
    ], function(err, result){
        // Did not handle errors. Might cause problems in real situations.
        connection.end();
    });
});
