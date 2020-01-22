var mongoose = require('mongoose');

var crudUserSchema = mongoose.Schema(
    {_id: mongoose.Schema.Types.ObjectId,
    first_name: String,
    last_name: String,
    age: Number},
    {versionKey: false});

// var min_age = ( { $and : [{ age : {"$gte": min_age} }]});
// exports.min_age = crudUserSchema.find({ age: { $lte: 15 }});

module.exports = mongoose.model('Crud_Users', crudUserSchema);