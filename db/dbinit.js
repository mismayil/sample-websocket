/*
** Database Init
*/

'use strict';

let debug = require('debug')('app:server');
let Game = require('../model/game');
let User = require('../model/user');

let models = [Game, User];

function dbinit(models) {
    if (models.length > 0) {
        let model = models.pop();
        model.init().then(function () {
            dbinit(models);
        });
    } else {
        debug('Database successfully initialized!');
    }
}

dbinit(models);

