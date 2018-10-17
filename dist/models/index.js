"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const config_1 = require("../config");
// Importo i vari model
const user_1 = require("./user");
exports.UserModel = user_1.default;
exports.sequelize = new sequelize_typescript_1.Sequelize({
    host: config_1.default.DB_URI,
    database: config_1.default.DB_NAME,
    username: config_1.default.DB_USER,
    password: config_1.default.DB_PASS,
    port: config_1.default.DB_PORT,
    dialect: 'postgres',
    operatorsAliases: false,
    logging: false
});
exports.sequelize.addModels([
    user_1.default
]);
