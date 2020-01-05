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
    await execute("DROP DATABASE IF EXISTS company");
    await execute("CREATE DATABASE company");
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
    console.dir(res);
}

module.exports = {connect, prepare, run, end};
