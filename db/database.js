/*
** DATABASE API
*/

'use strict';

let Sequelize = require("sequelize");
let path = require('path');
let config    = require('../config');

const MODEL_DIR = '../model';
const MODEL_FILES = ['game.js', 'user.js'];

let db = {};
let models = {};

let sequelize = new Sequelize(config.DB_NAME, config.USERNAME, config.PASSWORD, {
    host: config.HOST,
    dialect: config.DB_SYSTEM,
    storage: config.DB_FILE,
    define: {
        freezeTableName: true,
        classMethods: {
            associate: function () {}
        },
        instanceMethods: {}
    }
});

MODEL_FILES.forEach(function (file) {
    let model = sequelize.import(path.join(MODEL_DIR, file));
    models[model.name] = model;
});

Object.keys(models).forEach(function (modelName) {
    models[modelName].associate(models);
});

db.sequelize = sequelize;
db.models = models;

module.exports = db;
