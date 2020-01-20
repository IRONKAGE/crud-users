var http = require('http');
var app = require('./app');
var port = process.env.PORT || 15000;
var server = http.createServer(app);

server.listen(port);