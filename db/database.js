/*
** Database API
*/

'use strict';

let Sequelize = require('sequelize');
let config = require('../config');

function init() {
    return this.sync();
}

let Database = new Sequelize(config.DB_NAME, null, null, {
    host: config.HOST,
    dialect: config.DB_SYSTEM,
    storage: config.DB_FILE,
    define: {
        freezeTableName: true,
        classMethods: {
            init: init
        },
        instanceMethods: {}
    }
});

module.exports = Database;
