"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthController {
    constructor(logger, authHelper) {
        this.logger = logger;
        this.authHelper = authHelper;
        this.signIn = (req, res, next) => {
            const token = this.authHelper.signToken(req.user.uuid);
            res.json({ token });
        };
    }
}
exports.default = AuthController;
