const {connect, run, end} =  require('./common');

async function flatify(dept_no, emp_no){
    try{
        await connect();
        await run('BEGIN;');
        await run('UPDATE employee SET reports_to = ? WHERE works_at = ?;', [[emp_no, dept_no]]);
        await run('UPDATE employee SET reports_to = NULL WHERE emp_no = ?;', [[emp_no]]);
        await run('COMMIT;');
        await end();
    } catch (e){
        console.log(e);
    }
}

flatify(103, 101);