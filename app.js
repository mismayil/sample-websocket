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
let Game = require('./model/game');
let User = require('./model/user');

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

let request = util.request;
let response = util.response;
let message = util.message;

socket.on('connection', function(client) {

    client.on(request.ADD_GAME, function(req) {
        User.findById(req.userid).then(function (user) {
            if (user) {
                Game.create({
                    name: req.name
                }).then(function (game) {
                    game.addUser(user);
                    client.join(game.room);
                    client.send({
                        status: response.SUCCESS,
                        id: game.id
                    });
                });
            } else {
                client.emit(request.ADD_GAME, {
                    status: response.FAILURE,
                    message: message.USER_NOT_FOUND
                });
            }
        });
    });

    client.on(request.ADD_USER, function(req) {
        User.findOne({
            where: {
                username: req.username
            }
        }).then(function (user) {
            if (user) {
                client.emit(request.ADD_USER, {
                    status: response.FAILURE,
                    message: message.USERNAME_TAKEN
                });
            } else {
                User.create({
                    username: req.username,
                    firstname: req.firstname,
                    lastname: req.lastname,
                    usertype: util.player.HUMAN
                }).then(function (user) {
                    client.emit(request.ADD_USER, {
                        status: response.SUCCESS,
                        id: user.id
                    });
                })
            }
        })
    });
    
    client.on(request.GET_GAME, function (req) {
        User.findById(req.userid).then(function (user) {
            if (user) {
                Game.findById(req.gameid).then(function (game) {
                    if (game) {
                        client.emit(request.GET_GAME, {
                            status: response.SUCCESS,
                            name: game.name,
                            greenId: game.greenId,
                            redId: game.redId,
                            blackId: game.blackId,
                            whiteId: game.whiteId,
                            turn: game.turn,
                            board: game.board
                        });
                    } else {
                        client.emit(request.GET_GAME, {
                            status: response.FAILURE,
                            message: message.GAME_NOT_FOUND
                        });
                    }
                });
            }
        });
    });

    client.on(request.GET_USER, function (req) {

    });

    client.on(request.GET_CUR_GAME, function (req) {

    });

    client.on(request.GET_OPEN_GAMES, function (req) {

    });

    client.on(request.GET_GAMES, function(req) {

    });

    client.on(request.GET_USERS, function(req) {

    });

    client.on(request.JOIN_GAME, function (req) {

    });

    client.on(request.LEAVE_GAME, function (req) {

    });

    client.on(request.MAKE_MOVE, function (req) {

    });

    client.on(request.START_GAME, function (req) {

    });
});


module.exports = app;
