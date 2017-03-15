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
    }
};


module.exports = util;
