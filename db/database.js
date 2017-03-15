/*
** Database API
*/

'use strict';

let Sequelize = require('sequelize');
let config = require('../config');

let Database = new Sequelize(config.DATABASE_NAME, null, null, {
    host: 'localhost',
    dialect: 'sqlite',
    storage: config.DATABASE_FILE,
    define: {
        underscored: true,
        freezeTableName: true,
        classMethods: {},
        instanceMethods: {}
    }
});

module.exports = Database;
