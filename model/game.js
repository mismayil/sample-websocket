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
        field: 'room',
        defaultValue: Sequelize.UUIDV4
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

Game.belongsTo(User, {as: 'GreenPlayer', foreignKey: 'greenId'});
Game.belongsTo(User, {as: 'RedPlayer', foreignKey: 'redId'});
Game.belongsTo(User, {as: 'BlackPlayer', foreignKey: 'blackId'});
Game.belongsTo(User, {as: 'WhitePlayer', foreignKey: 'whiteId'});
User.belongsTo(Game);

module.exports = Game;
