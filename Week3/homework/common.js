const {promisify} = require('util');
const mysql = require('mysql');

const data = require('./data.json');

const options = {
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword'
}

const connection = mysql.createConnection(options);

const connect = promisify(connection.connect.bind(connection));
const execute = promisify(connection.query.bind(connection));
const end = promisify(connection.end.bind(connection));

async function prepare(){
    try{
        await execute("DROP DATABASE IF EXISTS company");
        await execute("CREATE DATABASE company");
        await run("CREATE TABLE employee(emp_no INT NOT NULL PRIMARY KEY, emp_name VARCHAR(20) NOT NULL, salary INT NOT NULL, works_at INT, reports_to INT)");
        await run("INSERT INTO employee SET ?", data.employee);
        await run("CREATE TABLE department(dept_no INT PRIMARY KEY NOT NULL, title VARCHAR(20) NOT NULL, description VARCHAR(20), address VARCHAR(100))");
        await run("INSERT INTO department SET ?", data.department);
        console.log("Preparation complete.");
    } catch(e) {
        console.error(e);
    }
}

async function run(query, array){
    await execute("USE company");
    const res = [];
    if(array && Array.isArray(array)){
        for(let i = 0; i < array.length; i++){
            res.push(await execute(query, array[i]));
        }
    } else {
        res.push(await execute(query));
    }
    console.log(res);
}

module.exports = {connect, prepare, run, end};