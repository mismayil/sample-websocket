/*
** Main app
*/

// Module dependencies
var express = require('express');
var http = require('http');
var io = require('socket.io');
var debug = require('debug')('app:server');
var util = require('./util');

var app = express();

app.use(express.static(__dirname + '/public'));

// Set port
var port = util.normalizePort(process.env.PORT || '8080');
app.set('port', port);

// Create an HTTP server
var server = http.createServer(app);
server.listen(port,  function() {
    debug('Server listening at port %d', port);
});

// Create a socket
var socket = io(server);

socket.on('connection', function(client) {
    client.on('hello', function(msg) {
        debug(msg);
        client.emit('hello', 'Hello from server!');
    });
});


module.exports = app
