/*
** GAME MODEL
*/

'use strict';

let Sequelize = require('sequelize');
let Database = require('../db/database');
let User = require('./user');
let util = require('../util');

const MODEL_NAME = 'game';

const ATTRIBUTES = {
    name: {
        type: Sequelize.STRING,
        field: 'name',
        allowNull: false
    },
    room: {
        type: Sequelize.UUID,
        field: 'room'
    },
    turn: {
        type: Sequelize.INTEGER,
        field: 'turn',
        defaultValue: util.color.GREEN
    },
    board: {
        type: Sequelize.STRING,
        field: 'board'
    }
};
const OPTIONS = {
    classMethods: {},
    instanceMethods: {}
};

let Game = Database.define(MODEL_NAME, ATTRIBUTES, OPTIONS);

User.hasOne(Game, {as: 'greenPlayer', foreignKey: 'greenId'});
User.hasOne(Game, {as: 'redPlayer', foreignKey: 'redId'});
User.hasOne(Game, {as: 'blackPlayer', foreignKey: 'blackId'});
User.hasOne(Game, {as: 'whitePlayer', foreignKey: 'whiteId'});

module.exports = Game;
