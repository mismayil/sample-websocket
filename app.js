/*
** Main app
*/

'use strict';

// Module dependencies
let express = require('express');
let http = require('http');
let io = require('socket.io');
let debug = require('debug')('app:server');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

let util = require('./util');
let config = require('./config');
let Event = require('./event');
let Game = require('./model/game');
let User = require('./model/user');
let Lobby = require('./model/lobby');

let app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

let port = util.normalizePort(process.env.PORT || config.PORT);

// Create an HTTP server
let server = http.createServer(app);
server.listen(port, function() {
    debug('Server listening at port %d', port);
});

// Create a socket
let socket = io(server);

socket.on('connection', function(client) {

    client.on(Event.ADD_GAME, function(req) {
        // let game = Game.create({name: req.name}).then(function (game) {
        //     client.send({id: game.id});
        // });
    });

    client.on(Event.ADD_USER, function(req) {

    });

    client.on(Event.GET_GAMES, function(req) {

    });

    client.on(Event.GET_USERS, function(req) {

    });

    client.on(Event.JOIN_GAME, function (req) {

    });
});


module.exports = app;
