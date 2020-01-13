var express = require('express');
var app = express();
var crud_users = [];

const port = 3000;
const host = "localhost";

var MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var MongoUrl = "mongodb://localhost:27017";
const dbName = 'crudDB';

MongoClient.connect(MongoUrl, function(err, client){
    assert.equal(null, err);
    console.log("ДБ створена!");
    const db = client.db(dbName);
    db.collection('users').find().toArray(function (err, result) {
        if (err) throw err
        console.log(result)
    })
});

app.get('/crud-users', function (request, response){
    response.send(MongoClient);
});

app.post("/crud-users", (request, response) => {
    response.send(crud_users);
});

app.patch("/crud-users", (request, response) => {
    response.send(crud_users);
});

app.delete('/crud-users', function (request, response){
    response.send(crud_users);
});

app.listen(port, host, function(){
    console.log('Сервер запустився на хості: localhost, port: 3000');
})