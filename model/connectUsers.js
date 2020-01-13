var mongoose = require('mongoose');

var SchemaUsers = mongoose.SchemaUsers;

var SchemaCrudUsers = new Schema({
    _id: SchemaUsers.Types.ObjectId,
    first_name: {type: String, required: true, max: 100},
    last_name: {type: String, required: true, max: 100}
});

SchemaCrudUsers
.virtual('name')
.get(function (){
    return this.last_name + ', ' + this.first_name;
});

SchemaCrudUsers
.virtual('url')
.get(function (){
    return '/crud-User/' + this._id;
});

module.exports = mongoose.model('crud_Users_Mongo', SchemaCrudUsers);