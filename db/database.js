/*
** Database API
*/

'use strict';

let Sequelize = require('sequelize');
let config = require('../config');

function init(success, error) {
    this.sync().then(success).catch(error);
}

let Database = new Sequelize(config.DATABASE_NAME, null, null, {
    host: 'localhost',
    dialect: 'sqlite',
    storage: config.DATABASE_FILE,
    define: {
        underscored: true,
        freezeTableName: true,
        classMethods: {
            init: init
        },
        instanceMethods: {}
    }
});

module.exports = Database;
