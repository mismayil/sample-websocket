/*
** UTILITY API
*/

'use strict';

let uuid = require('node-uuid');
let moment = require('moment');
let debug = require('debug')('app:server');

let util = {
    // Normalize a port into a number, string, or false.
    normalizePort: function(val) {
      let port = parseInt(val, 10);

      if (isNaN(port)) {
          // named pipe
          return val;
      }

      if (port >= 0) {
          // port number
          return port;
      }

      return false;
    },

    getID: function () {
        return uuid.v4();
    },

    getNow: function () {
        return moment().format();
    },

    error: function (err) {
        debug('ERROR: %o', err);
    },

    color: {
        GREEN: 0,
        RED: 1,
        BLACK: 2,
        WHITE: 3
    },

    player: {
        HUMAN: 'HUMAN',
        AI: 'AI'
    },

    request: {
        ADD_GAME:       'ADD_GAME',
        ADD_USER:       'ADD_USER',
        GET_GAME:       'GET_GAME',
        GET_USER:       'GET_USER',
        GET_CUR_GAME:   'GET_CUR_GAME',
        GET_GAMES:      'GET_GAMES',
        GET_OPEN_GAMES: 'GET_OPEN_GAMES',
        GET_USERS:      'GET_USERS',
        JOIN_GAME:      'JOIN_GAME',
        LEAVE_GAME:     'LEAVE_GAME',
        MAKE_MOVE:      'MAKE_MOVE',
        START_GAME:     'START_GAME'
    },

    response: {
        SUCCESS: 'SUCCESS',
        FAILURE: 'FAILURE'
    },

    message: {
        USER_NOT_FOUND: 'User not found',
        USERNAME_TAKEN: 'Username already taken',
        GAME_NOT_FOUND: 'Game not found',
        GAME_NOT_OPEN:  'Game is not open',
        WRONG_GAME:     'Wrong game accessed'
    }
};


module.exports = util;
