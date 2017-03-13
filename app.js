/*
** Main app
*/

'use strict';

// Module dependencies
let express = require('express');
let http = require('http');
let io = require('socket.io');
let debug = require('debug')('app:server');

let util = require('./util');
let config = require('./config');
let Game = require('./model/game');
let User = require('./model/user');
let Lobby = require('./model/lobby');

let app = express();

app.use(express.static(__dirname + '/public'));

// Initialize databases
Game.init(function () {
    Game.getGames(function (games) {
        debug('games: %o', games);
    });
}, function (error) {
    debug('error sync');
});

User.init(function () {
    User.getUsers(function (users) {
        debug('users: %o', users);
    });
}, function (error) {
    debug('error sync');
});

Lobby.init(null, null);

let port = util.normalizePort(process.env.PORT || config.PORT);

// Create an HTTP server
let server = http.createServer(app);
server.listen(port, function() {
    debug('Server listening at port %d', port);
});

// Create a socket
let socket = io(server);

// Events
// let CREATE_GAME = 'create_game';
// let JOIN_GAME = 'join_game';
// let GET_GAMES = 'get_games';
// let GET_USERS = 'get_users';

// socket.on('connection', function(client) {
//
//     client.on(CREATE_GAME, function(req) {
//
//     });
//
//     client.on(JOIN_GAME, function(req) {
//
//     });
//
//     client.on(GET_GAMES, function(req) {
//
//     });
//
//     client.on(GET_USERS, function(req) {
//
//     });
// });


module.exports = app;
