var express = require('express')
var app = express()
var MongoClient = require('mongodb').MongoClient;

const port = 3000;
const host = "localhost";

MongoClient.connect('mongodb://localhost:27017/crud_users')

app.get('/crud-users', function (request, response){
    response.send(crud_users);
});

app.post("/crud-users", (request, response) => {
    if (err) throw err;
    var userData = {
        username: request.body.username
    };
});

app.delete('/crud-users', function (request, response){
    response.send(crud_users);
});

app.listen(port, host, function(){
    console.log('Сервер запустився на хості: localhost, port: 3000');
})