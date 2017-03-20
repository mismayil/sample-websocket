/*
** Database Init
*/

'use strict';

let debug = require('debug')('app:server');
let Game = require('../model/game');
let User = require('../model/user');
let Lobby = require('../model/lobby');

Game.init().then(
    User.init().then(
        Lobby.init().then(function () {
            debug('Database successfully initialized!');
        })));

