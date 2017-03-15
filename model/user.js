/*
 ** USER MODEL
 */

'use strict';

let Sequelize = require('sequelize');
let Database = require('../db/database');

const MODEL_NAME = 'user';

const ATTRIBUTES = {
    username: {
        type: Sequelize.STRING,
        field: 'username',
        allowNull: false
    },
    firstname: {
        type: Sequelize.STRING,
        field: 'firstname'
    },
    lastname: {
        type: Sequelize.STRING,
        field: 'lastname'
    }
};

const OPTIONS = {
    classMethods: {},
    instanceMethods: {}
};

let User = Database.define(MODEL_NAME, ATTRIBUTES, OPTIONS);

module.exports = User;
