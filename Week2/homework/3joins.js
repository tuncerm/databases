const {connect, run, end} = require("./common");

async function setUp(){
    try{ 
        await connect();
        console.log("1. Write a query that retrieves all `employees` and their corresponding `manager's full name`.");
        await run("SELECT e.full_name AS employee_name, m.full_name AS manager_name FROM employee e INNER JOIN employee m ON e.manager = m.employee_no");
        console.log("2. Write a query that retrieves all `employees` and their working `department` title. If no `employee` worked in a specific `department`, return the `department` too.");
        await run("SELECT e.full_name AS employees, d.title AS departments FROM employee e INNER JOIN employee_works_department ewd ON e.employee_no = ewd.employee_no RIGHT JOIN department d ON d.dept_no  = ewd.dept_no ORDER BY d.title");
        await end();
    } catch (e){
        console.error(e);
    }
}

setUp();