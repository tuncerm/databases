const {connect, run, end} = require("./common");

async function setUp(){
    try{ 
        await connect();
        console.log("1. All department numbers and the number of employees working there.");
        await run("SELECT departments, COUNT(employees) FROM (SELECT e.full_name AS employees, d.dept_no AS departments FROM employee e INNER JOIN employee_works_department ewd ON e.employee_no = ewd.employee_no RIGHT JOIN department d ON d.dept_no  = ewd.dept_no) AS depemp GROUP BY departments");
        console.log("2. Sum of the salaries of all employees.");
        await run("SELECT SUM(salary) FROM employee");
        console.log("3. Average of the salaries of all employees.");
        await run("SELECT AVG(salary) FROM employee");
        console.log("4. Sum of the salaries of the employees per department.");
        await run("SELECT SUM(sals), departments FROM (SELECT e.salary AS sals, d.title AS departments FROM employee e INNER JOIN employee_works_department ewd ON e.employee_no = ewd.employee_no RIGHT JOIN department d ON d.dept_no = ewd.dept_no) AS saldep group by departments");
        console.log("5. Minimum and maximum of the salaries per department.");
        await run("SELECT MIN(sals), MAX(sals), departments FROM (SELECT e.salary AS sals, d.title AS departments FROM employee e INNER JOIN employee_works_department ewd ON e.employee_no = ewd.employee_no RIGHT JOIN department d ON d.dept_no = ewd.dept_no) AS saldep group by departments");
        console.log("6. For each salary value, return the number of employees paid.");
        await run("SELECT salary, COUNT(salary) AS NOP FROM employee GROUP BY salary");
        await end();
    } catch (e){
        console.error(e);
    }
}

setUp();