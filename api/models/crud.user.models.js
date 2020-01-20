var mongoose = require('mongoose');

var crudUserSchema = mongoose.Schema(
    {_id: mongoose.Schema.Types.ObjectId,
    first_name: String,
    last_name: String,
    age: Number},
    {versionKey: false});

module.exports = mongoose.model('Crud_Users', crudUserSchema);