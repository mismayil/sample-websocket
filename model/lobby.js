/*
 ** LOBBY MODEL
 */

'use strict';

let Sequelize = require('sequelize');
let Database = require('../db/database');
let Game = require('./game');
let User = require('./user');

const MODEL_NAME = 'lobby';

const ATTRIBUTES = {};

const OPTIONS = {
    classMethods: {},
    instanceMethods: {}
};

let Lobby = Database.define(MODEL_NAME, ATTRIBUTES, OPTIONS);
Game.belongsToMany(User, {through: Lobby});
User.belongsToMany(Game, {through: Lobby});

module.exports = Lobby;