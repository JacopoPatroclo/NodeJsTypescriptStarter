"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class Api {
    constructor(userRouter) {
        this.userRouter = userRouter;
        this.router = express_1.Router();
        this.routing();
    }
    routing() {
        this.router.use('/user', this.userRouter.router);
    }
}
exports.default = Api;
