const express = require('express');
const mongoose = require('mongoose');
const City = require('./city.model');

const db = 'database_connection_string';

mongoose.Promise = Promise;
mongoose.connect(db, {
    keepAlive: true,
    useNewUrlParser: true,
    useCreateIndex: true
}, (err)=>{
    console.log(err);
});

const app = express();

app.post('/', (req, res)=>{
    City.create({"Name":"Trabzon", "CountryCode":"TR"}, (err, data)=>{
        res.send(err||data);
    });
});

app.put('/', (req, res)=>{
    City.updateOne({"Name":"Trabzon", "CountryCode":"TR"}, {$set:{"Population":500000}}, (err, data)=>{
        res.send(err||data);
    });
});

app.get('/', (req, res)=>{
    City.findOne({"Name":"Trabzon", "CountryCode":"TR"}, (err, data)=>{
        res.send(err||data);
    });
});

app.delete('/', (req, res)=>{
    City.removeOne({"Name":"Trabzon", "CountryCode":"TR"}, (err)=>{
        res.send(err);
    });
});

app.listen(3000);