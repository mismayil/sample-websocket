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
let Event = require('./event');
let Game = require('./model/game');
let User = require('./model/user');
let Lobby = require('./model/lobby');

let app = express();

app.use(express.static(__dirname + '/public'));

// Initialize databases
Game.sync().then(function () {
    User.sync().then(function () {
        Lobby.sync().then(function () {
            debug('success');
            let game = Game.create({name: 'haha'}).then(function (game) {
                debug('game id', game.id);
                game.destroy();
                Game.all().then(function (games) {
                    games.forEach(function (game) {
                        debug('game: %s %d',game.name, game.id);
                    })
                })
            });

            // let user = User.build({username: 'mete', firstname: 'mahammad', lastname: 'ismayil'});
            // game.save().then(function () {
            //     // user.save().then(function () {
            //     //     game.addUser(user);
            //     // });
            //
            // });

        });
    });
});

let port = util.normalizePort(process.env.PORT || config.PORT);

// Create an HTTP server
let server = http.createServer(app);
server.listen(port, function() {
    debug('Server listening at port %d', port);
});

// Create a socket
let socket = io(server);

// socket.on('connection', function(client) {
//
//     client.on(Event.ADD_GAME, function(req) {
//
//     });
//
//     client.on(Event.ADD_USER, function(req) {
//
//     });
//
//     client.on(Event.GET_GAMES, function(req) {
//
//     });
//
//     client.on(Event.GET_USERS, function(req) {
//
//     });
//        client.on(Event.JOIN_GAME, function (req) {
//
//        });
// });


module.exports = app;
