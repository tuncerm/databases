const {connect, prepare, run, end} = require('./common.js');
const data = require('./data.json');

async function setUp() {
    await connect();
    await prepare();
    // It is not fully normalized but, this should solve a big chunk of the issue.
    await run("CREATE TABLE employee_skill(emp_no INT NOT NULL, skill VARCHAR(20) NOT NULL)");
    await run("INSERT INTO employee_skill SET ?", data.employee_skill);
    await run("SELECT * FROM company.employee JOIN company.employee_skill ON employee.emp_no = employee_skill.emp_no");
    // We could have also created a skills(skill_id, skill_name) table and an employee_has_skill(employee_no, skill_id). That would be more normalized.
    await end();
}

setUp();