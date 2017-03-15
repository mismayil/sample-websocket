/*
** GAME MODEL
*/

'use strict';

let Sequelize = require('sequelize');
let Database = require('../db/database');

const MODEL_NAME = 'game';

const ATTRIBUTES = {
    name: {
        type: Sequelize.STRING,
        field: 'name',
        allowNull: false
    }
};
const OPTIONS = {
    classMethods: {},
    instanceMethods: {}
};

let Game = Database.define(MODEL_NAME, ATTRIBUTES, OPTIONS);

module.exports = Game;
