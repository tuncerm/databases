// 1. Give an example of a value that can be passed as `name` that would take advantage of SQL-injection (for example, to insert new fake data in the database)

// The original query should not work if the name is not a number. If it does and if it accepts multiple queries,

"123; CREATE TABLE pika(Chu VARCHAR(50)); -- "        // Should create a table  
"123; INSERT INTO pika(Chu) VALUES('HELLO'); -- "   // Should insert a row;

// 2. Rewrite the function so that it is no longer vulnerable to SQL injection
function getPopulation(cityOrCountry, name, cb) {
  // assuming that connection to the database is established and stored as conn
  conn.query(
    `SELECT Population FROM ? WHERE Name = ?`, [cityOrCountry, name],   // Should solve the issue.
    function(err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result[0].name);
    }
  );
}