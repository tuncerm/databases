const mysql = require('mysql');

const opts = {
    host     : 'localhost',
    user     : 'hyfuser',
    password : 'hyfpassword',
    database : 'new_world'
};

const connection = mysql.createConnection(opts);

connection.connect();

function queryNPrint(title, query, part){
    connection.query(query, (err, data)=>{
        console.log(title);
        data.forEach(element => {
            console.log(element[part]);
        });
    });
}

queryNPrint("1. What are the names of countries with population greater than 8 million?", "SELECT Name from country WHERE Population > 8000000", "Name");
queryNPrint("2. What are the names of countries that have “land” in their names?", "SELECT Name from country WHERE Name LIKE '%land%'", "Name");
queryNPrint("3. What are the names of the cities with population in between 500,000 and 1 million?", "SELECT Name from city WHERE Population > 500000 AND Population < 1000000", "Name");
queryNPrint("4. What's the name of all the countries on the continent ‘Europe’?", "SELECT Name from country WHERE Continent LIKE 'Europe'", "Name");
queryNPrint("5. List all the countries in the descending order of their surface areas.", "SELECT Name from Country ORDER BY -SurfaceArea", "Name");
queryNPrint("6. What are the names of all the cities in the Netherlands?", "SELECT City.Name AS Name from City, Country WHERE Country.Name = 'Netherlands' AND City.CountryCode = Country.Code", "Name");
queryNPrint("7. What is the population of Rotterdam?", "SELECT Population FROM city WHERE Name = 'Rotterdam'", "Population");
queryNPrint("8. What's the top 10 countries by Surface Area?", "SELECT Name from Country ORDER BY -SurfaceArea Limit 10", "Name");
queryNPrint("9. What's the top 10 most populated cities?", "SELECT Name from city ORDER BY -Population Limit 10", "Name");
queryNPrint("10. What is the population number of the world?", "SELECT SUM(Population) AS SUM FROM Country", "SUM");

connection.end();