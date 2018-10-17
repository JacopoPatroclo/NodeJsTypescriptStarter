"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class AuthRouter {
    constructor(controller, authHelper) {
        this.controller = controller;
        this.authHelper = authHelper;
        this.router = express_1.Router();
        this.params();
        this.routing();
    }
    params() { }
    routing() {
        this.router.post('/signin', this.authHelper.verifyUser, this.controller.signIn);
    }
}
exports.default = AuthRouter;
