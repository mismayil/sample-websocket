/*
 ** USER MODEL
 */

'use strict';

let Sequelize = require('sequelize');
let Database = require('../db/database');
let util = require('../util');

const MODEL_NAME = 'user';

const ATTRIBUTES = {
    username: {
        type: Sequelize.STRING,
        field: 'username',
        allowNull: false,
        defaultValue: 'alfonso'
    },
    firstname: {
        type: Sequelize.STRING,
        field: 'firstname',
        defaultValue: 'Alfonso'
    },
    lastname: {
        type: Sequelize.STRING,
        field: 'lastname',
        defaultValue: 'X'
    },
    usertype: {
        type: Sequelize.STRING,
        field: 'usertype',
        defaultValue: util.player.AI
    }
};

const OPTIONS = {
    classMethods: {},
    instanceMethods: {}
};

let User = Database.define(MODEL_NAME, ATTRIBUTES, OPTIONS);

module.exports = User;
