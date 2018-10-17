"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
class Server {
    constructor(configuration, errorHandler, apiRouter, authRouter) {
        this.configuration = configuration;
        this.errorHandler = errorHandler;
        this.apiRouter = apiRouter;
        this.authRouter = authRouter;
        this.app = express();
        this.config();
        this.route();
        this.errors();
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(logger('dev'));
    }
    route() {
        this.app.use('/api/v1', this.apiRouter.router);
        this.app.use('/auth', this.authRouter.router);
    }
    errors() {
        this.app.use(this.errorHandler.handler);
    }
}
exports.default = Server;
