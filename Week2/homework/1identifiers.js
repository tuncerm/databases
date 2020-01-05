const data = require('./data.json');
const {connect, prepare, run, end} = require("./common");

async function setUp(){
    try{ 
        await connect();
        await prepare();
        await run("CREATE TABLE employee(employee_no INT NOT NULL PRIMARY KEY, full_name VARCHAR(20) NOT NULL, salary INT NOT NULL, address VARCHAR(100))");
        await run("ALTER TABLE employee ADD COLUMN manager INT");
        await run("ALTER TABLE employee ADD CONSTRAINT FK_Manager FOREIGN KEY (manager) REFERENCES employee(employee_no)");
        await run("INSERT INTO employee SET ?", data.employee);
        await end();
    } catch (e){
        console.error(e);
    }
}

setUp();