/*
 ** USER MODEL
 */

'use strict';

let Sequelize = require('sequelize');
let Database = require('../db/database');

function addUser(user, success, error) {
    this.create({
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname
    }).then(success).catch(error);
}

function getUsers(success, error) {
    this.all().then(success).catch(error);
}

const MODEL_NAME = 'user';

const ATTRIBUTES = {
    username: {
        type: Sequelize.STRING,
        field: 'username',
        allowNull: false,
    },
    firstName: {
        type: Sequelize.STRING,
        field: 'first_name'
    },
    lastName: {
        type: Sequelize.STRING,
        field: 'last_name'
    }
};

const OPTIONS = {
    classMethods: {
        addUser: addUser,
        getUsers: getUsers
    },
    instanceMethods: {}
};

let User = Database.define(MODEL_NAME, ATTRIBUTES, OPTIONS);

module.exports = User;
