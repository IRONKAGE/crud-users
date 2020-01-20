var mongoose =  require('mongoose');
var MONGO_URI = 'mongodb://localhost:27017/inverita_users_new';

mongoose.connect(MONGO_URI, { useNewUrlParser: true })