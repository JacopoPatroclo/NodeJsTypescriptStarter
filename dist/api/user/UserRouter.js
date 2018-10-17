"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class User {
    constructor(controller, authUtil) {
        this.controller = controller;
        this.authUtil = authUtil;
        this.router = express_1.Router();
        this.params();
        this.routing();
    }
    params() {
        this.router.param('uuid', this.controller.uuid);
    }
    routing() {
        this.router.get('/:uuid', this.authUtil.isAuth, this.controller.get);
        this.router.post('/', this.controller.create);
    }
}
exports.default = User;
