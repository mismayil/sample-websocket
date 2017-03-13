/*
 ** LOBBY MODEL
 */

'use strict';

let Sequelize = require('sequelize');
let Database = require('../db/database');

const MODEL_NAME = 'lobby';

const ATTRIBUTES = {
    userID: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        allowNull: false,
    },
    gameID: {
        type: Sequelize.INTEGER,
        field: 'game_id',
        allowNull: false
    }
};

const OPTIONS = {
    classMethods: {},
    instanceMethods: {}
};

let Lobby = Database.define(MODEL_NAME, ATTRIBUTES, OPTIONS);

module.exports = Lobby;