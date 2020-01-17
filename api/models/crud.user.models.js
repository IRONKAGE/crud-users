var mongoose = require('mongoose');

var crudUserSchema = mongoose.Schema([{
    _id: mongoose.Schema.Types.ObjectId,
    first_name: String,
    last_name: String
}]);

module.exports = mongoose.model('Crud_Users', crudUserSchema);