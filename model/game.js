/*
** GAME MODEL
*/

'use strict';

let debug = require('debug')('app:server');
let Sequelize = require('sequelize');
let util = require('../util');

const MODEL_NAME = 'Game';

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
    },
    numPlayers: {
        type: Sequelize.INTEGER,
        field: 'numPlayers',
        defaultValue: 1
    }
};

const OPTIONS = {
    classMethods: {
        associate: associate
    },
    instanceMethods: {}
};

function associate(models) {
    models.Game.belongsTo(models.User, {as: 'GreenPlayer', foreignKey: 'greenId'});
    models.Game.belongsTo(models.User, {as: 'RedPlayer', foreignKey: 'redId'});
    models.Game.belongsTo(models.User, {as: 'BlackPlayer', foreignKey: 'blackId'});
    models.Game.belongsTo(models.User, {as: 'WhitePlayer', foreignKey: 'whiteId'});
}

function init(sequelize) {
    let Game = sequelize.define(MODEL_NAME, ATTRIBUTES, OPTIONS);
    return Game;
}

module.exports = init;
