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
let db = require('./db/database');

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

let request = util.request;
let response = util.response;
let message = util.message;

// Create AI player
let alfonso = db.models.User.build();

// Init database
db.sequelize.drop().then(function () {
    db.sequelize.sync().then(function () {
        debug('Database successfully initialized!');

        alfonso.save().then(function () {
            init();
        });
    });
});

// Init app
function init() {
    let Game = db.models.Game;
    let User = db.models.User;

    // Create a socket
    let socket = io(server);

    socket.on('connection', function(client) {

        client.on(request.ADD_GAME, function(req) {
            User.findById(req.clientId).then(function (user) {
                if (user) {
                    Game.create({
                        name: req.gameName
                    }).then(function (game) {
                        game.setGreenPlayer(user);
                        game.setRedPlayer(alfonso);
                        game.setBlackPlayer(alfonso);
                        game.setRedPlayer(alfonso);
                        game.save().then(function () {
                            client.join(game.room);
                            client.send({
                                status: response.SUCCESS,
                                gameId: game.id
                            });
                        });
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
                            userId: user.id
                        });
                    });
                }
            });
        });

        client.on(request.GET_GAME, function (req) {
            User.findById(req.clientId).then(function (user) {
                if (user) {
                    Game.findById(req.gameId).then(function (game) {
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
            User.findById(req.clientId).then(function (user) {
                if (user) {
                    User.findById(req.userId).then(function (user) {
                        if (user) {
                            client.emit(request.GET_USER, {
                                status: response.SUCCESS,
                                username: user.username,
                                firstname: user.firstname,
                                lastname: user.lastname,
                                usertype: user.usertype
                            });
                        } else {
                            client.emit(request.GET_USER, {
                                status: response.FAILURE,
                                message: message.USER_NOT_FOUND
                            });
                        }
                    });
                }
            });
        });

        client.on(request.REMOVE_GAME, function (req) {
            User.findById(req.clientId).then(function (user) {
                if (user) {
                    Game.findById(req.gameId).then(function (game) {
                        if (game) {
                            game.destroy().then(function () {
                                socket.to(game.room).emit(request.REMOVE_GAME, {
                                    status: response.SUCCESS,
                                    gameId: game.id
                                });
                            });
                        }
                    });
                }
            });
        });

        client.on(request.REMOVE_USER, function (req) {
            User.findById(req.clientId).then(function (user) {
                if (user) {
                    user.destroy().then(function () {
                        client.emit(request.REMOVE_USER, {
                            status: response.SUCCESS,
                            userId: user.id
                        });
                    });
                }
            });
        });

        client.on(request.GET_CUR_GAME, function (req) {
            User.findById(req.clientId).then(function (user) {
                if (user) {
                    client.emit(request.GET_CUR_GAME, {
                        status: response.SUCCESS,
                        gameId: user.gameId
                    });
                }
            });
        });

        client.on(request.GET_OPEN_GAMES, function (req) {
            User.findById(req.clientId).then(function (user) {
                if (user) {
                    Game.findAll({
                        where: {
                            numPlayers: {
                                $ne: 4
                            }
                        }
                    }).then(function (games) {
                        let ids = [];
                        games.forEach(function (game) {
                            ids.push(game.id);
                        });
                        client.emit(request.GET_OPEN_GAMES, {
                            status: response.SUCCESS,
                            gameIds: ids
                        });
                    });
                }
            });
        });

        client.on(request.GET_GAMES, function(req) {
            User.findById(req.clientId).then(function (user) {
                if (user) {
                    Game.findAll().then(function (games) {
                        let ids = [];
                        games.forEach(function (game) {
                            ids.push(game.id);
                        });
                        client.emit(request.GET_GAMES, {
                            status: response.SUCCESS,
                            gameIds: ids
                        });
                    });
                }
            });
        });

        client.on(request.GET_USERS, function(req) {
            User.findById(req.clientId).then(function (user) {
                if (user) {
                    User.findAll().then(function (users) {
                        let ids = [];
                        users.forEach(function (user) {
                            ids.push(user.id);
                        });
                        client.emit(request.GET_USERS, {
                            status: response.SUCCESS,
                            userIds: ids
                        });
                    });
                }
            });
        });

        client.on(request.JOIN_GAME, function (req) {
            User.findById(req.clientId).then(function (user) {
                if (user) {
                    Game.findById(req.gameId).then(function (game) {
                        if (game.greenId == alfonso.id) game.setGreenPlayer(user);
                        else if (game.redId == alfonso.id) game.setRedPlayer(user);
                        else if (game.blackId == alfonso.id) game.setBlackPlayer(user);
                        else if (game.whiteId == alfonso.id) game.setWhitePlayer(user);
                        else {
                            client.emit(request.JOIN_GAME, {
                                status: response.FAILURE,
                                message: message.GAME_NOT_OPEN
                            });
                            return;
                        }
                        user.setGame(game);
                        game.increment('numPlayers');
                        game.save().then(function () {
                            user.save().then(function () {
                                client.join(game.room);
                                socket.to(game.room).emit(request.JOIN_GAME, {
                                    status: response.SUCCESS,
                                    userId: user.id,
                                    gameId: game.id
                                });
                            });
                        });
                    });
                }
            });
        });

        client.on(request.LEAVE_GAME, function (req) {
            User.findById(req.clientId).then(function (user) {
                if (user) {
                    Game.findById(req.gameId).then(function (game) {
                        if (game.greenId == req.clientId) game.setGreenPlayer(alfonso);
                        else if (game.redId == req.clientId) game.setRedPlayer(alfonso);
                        else if (game.blackId == req.clientId) game.setBlackPlayer(alfonso);
                        else if (game.whiteId == req.clientId) game.setWhitePlayer(alfonso);
                        else {
                            client.emit(request.LEAVE_GAME, {
                                status: response.FAILURE,
                                message: message.WRONG_GAME
                            });
                            return;
                        }
                        user.setGame(null);
                        game.decrement('numPlayers');
                        game.save().then(function () {
                            user.save().then(function () {
                                client.leave(game.room);
                                socket.to(game.room).emit(request.LEAVE_GAME, {
                                    status: response.SUCCESS,
                                    userId: user.id,
                                    gameId: game.id
                                });
                            });
                        });
                    });
                }
            });
        });

        client.on(request.MAKE_MOVE, function (req) {
            User.findById(req.clientId).then(function (user) {
                if (user) {
                    Game.findById(req.gameId).then(function (game) {
                        if (game) {
                            socket.to(game.room).emit(request.MAKE_MOVE, {
                                status: response.SUCCESS,
                                pieceId: req.pieceId,
                                boardX: req.boardX,
                                boardY: req.boardY
                            });
                        }
                    });
                }
            });
        });

        client.on(request.START_GAME, function (req) {
            User.findById(req.clientId).then(function (user) {
                if (user) {
                    Game.findById(req.gameId).then(function (game) {
                        if (game) {
                            socket.to(game.room).emit(request.START_GAME, {
                                status: response.SUCCESS,
                                gameId: game.id
                            });
                        }
                    });
                }
            });
        });
    });
}

module.exports = app;
