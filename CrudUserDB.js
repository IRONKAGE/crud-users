console.log('This script populates some test crud-Users your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true');

var userArgs = process.argv.slice(2);

var async = require('async')
var CrudUser = require('./models/connectUsers')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var crud_Users_Mongo = mongoose.connection;
crud_Users_Mongo.on('error', console.error.bind(console, 'MongoDB connection error:'));

var crud = []

function crudUserCreate(first_name, last_name, cb){
    crudUserdetail = {first_name: first_name , last_name: last_name }
    var crudUser = new CrudUser(crudUserdetail);
    crudUser.save(function (err){
        if (err) {
            cb(err, null)
            return
        }
        console.log('New CrudUser: ' + crudUser);
        crud.push(crudUser)
        cb(null, crudUser)
    });
}

function(err, results){
    if (err){
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('BOOKInstances: '+bookinstances);
        
    }
    mongoose.connection.close();
}