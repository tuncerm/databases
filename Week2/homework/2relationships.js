const data = require('./data.json');
const {connect, run, end} = require("./common");

async function setUp(){
    try{ 
        await connect();
        await run("CREATE TABLE department(dept_no INT PRIMARY KEY NOT NULL, title VARCHAR(20) NOT NULL, description VARCHAR(20), address VARCHAR(100))");
        await run("INSERT INTO department SET ?", data.department);
        await run("CREATE TABLE employee_works_department(dept_no INT NOT NULL, employee_no INT NOT NULL)");
        await run("ALTER TABLE employee_works_department ADD CONSTRAINT FK_Department FOREIGN KEY (dept_no) REFERENCES department(dept_no), ADD CONSTRAINT FK_Employee FOREIGN KEY (employee_no) REFERENCES employee(employee_no)");
        await run("INSERT INTO employee_works_department SET ?", data.employee_works_department);
        await end();
    } catch (e){
        console.error(e);
    }
}

setUp();