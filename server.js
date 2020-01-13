var express = require('express');
var app = express();

var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/crud-DB';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var crud_Users_Mongo = mongoose.connection;
crud_Users_Mongo.on('error', console.error.bind(console, 'MongoDB connection error:'));

var SchemaUsers = mongoose.SchemaUsers;


var crud = [];

const port = 3000;
const host = "localhost";

app.get('/crud-users', function (request, response){
    var UserName = request.param('UserName');
    if (UserName){
        crud.forEach((item) => {
            if (item.UserName === UserName){
                response.send(item);
                return;
            };
        });
    };
    response.send(crud);
});

app.post("/crud-users", (request, response) => {
    if (err) throw err;
    var SchemaCrudUsers = new SchemaUsers({
        first_name: String,
        last_name: String
    });
    response.send(crud_users);
});

app.delete('/crud-users', function (request, response){
    response.send(crud);
});

app.listen(port, host, function(){
    console.log('Сервер запустився на хості: localhost, port: 3000');
})