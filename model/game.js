/*
** GAME MODEL
*/

'use strict';

let Sequelize = require('sequelize');
let Database = require('../db/database');

function addGame(name, success, error) {
    this.create({
        name: name
    }).then(success).catch(error);
}

function getGames(success, error) {
    this.all().then(success).catch(error);
}

const MODEL_NAME = 'game';
const ATTRIBUTES = {
    name: {
        type: Sequelize.STRING,
        field: 'name',
        allowNull: false
    }
};
const OPTIONS = {
    classMethods: {
        addGame: addGame,
        getGames: getGames
    },
    instanceMethods: {}
};

let Game = Database.define(MODEL_NAME, ATTRIBUTES, OPTIONS);

module.exports = Game;
