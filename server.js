var express = require('express');
var app = express();
var crud_users = [];
const port = 3000;
const host = "localhost";

app.get('/crud-users', function (request, response){
    var crudUserName = request.param('crudUserName');
    if (crudUserName){
        crud_users.forEach((item) => {
            if (item.crudUserName === crudUserName){
                response.send(item);
                return;
            };
        });
    };
    response.send(crud_users);
});

app.post('/crud-users', function (request, response){
    var crudUserName = request.param('crudUserName');
    if (crudUserName){
        crud_users.push({
            crudUserName,
        });
    }else{
        response.res.status(500).json('о ні');
    }
    response.send(crud_users);
});

app.delete('/crud-users', function (request, response){
    var crudUserName = request.param('crudUserName');
    if (crudUserName){
        crud_users.forEach((item) => {
            if (item.crudUserName === crudUserName){
                response.send(item);
                return;
            };
        });
    };
    response.send(crud_users);
});

app.listen(port, host, function(){
    console.log('Сервер запустився на хості: localhost, port: 3000');
})