"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importa l'interfaccia di configurazione e il file di config
const config_1 = require("./config");
// Importo il server
const server_1 = require("./server");
// Importa i router
const api_1 = require("./api");
const UserRouter_1 = require("./api/user/UserRouter");
// Importa i controller
const UserController_1 = require("./api/user/UserController");
// Importa gli error handler
const errorHandler_1 = require("./middleware/errorHandler");
// Importa il logger
const logger_1 = require("./lib/logger");
// Importo il db manager
const models_1 = require("./models");
const AuthRouter_1 = require("./auth/AuthRouter");
const AuthController_1 = require("./auth/AuthController");
// Importo gli util
const auth_1 = require("./lib/auth");
const cryptoUtil_1 = require("./lib/cryptoUtil");
const cryptoUtil = new cryptoUtil_1.default(10);
const myLogger = new logger_1.default();
const authUtil = new auth_1.default(cryptoUtil);
(() => __awaiter(this, void 0, void 0, function* () {
    yield models_1.sequelize.sync();
}))();
const App = new server_1.default(config_1.default, new errorHandler_1.default(myLogger), new api_1.default(new UserRouter_1.default(new UserController_1.default(myLogger), authUtil)), new AuthRouter_1.default(new AuthController_1.default(myLogger, authUtil), authUtil)).app;
App.listen(config_1.default.PORT, () => {
    console.log(`Applicativo avviato sulla porta ${config_1.default.PORT} in modalità ${config_1.default.ENVIROMENT}`);
});
