/*
 ** USER MODEL
 */

'use strict';

let Sequelize = require('sequelize');
let util = require('../util');

const MODEL_NAME = 'User';

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
    constraints: false,
    classMethods: {
        associate: associate
    },
    instanceMethods: {}
};

function associate(models) {
    models.User.belongsTo(models.Game);
}

function init(sequelize) {
    let User = sequelize.define(MODEL_NAME, ATTRIBUTES, OPTIONS);
    return User;
}

module.exports = init;
